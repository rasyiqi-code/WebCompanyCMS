import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploadToR2, deleteFromR2 } from "@/lib/r2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import sharp from "sharp";
import path from "path";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const items = await db.mediaItem.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(items);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !['admin', 'editor'].includes(session.user.role)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return new NextResponse("File required", { status: 400 });
        }

        // Validation
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

        if (file.size > MAX_SIZE) {
            return new NextResponse("File too large (max 5MB)", { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return new NextResponse("Invalid file type. Only images are allowed.", { status: 400 });
        }

        let buffer: Buffer = Buffer.from(await file.arrayBuffer());
        let filename = file.name;
        let mimeType = file.type;
        let size = file.size;

        // Optimization: Convert ANY image (except SVG/GIF/WEBP) to WebP
        const shouldConvert = file.type.startsWith('image/') &&
            !['image/svg+xml', 'image/gif', 'image/webp'].includes(file.type);

        if (shouldConvert) {
            try {
                // Ensure we have a valid buffer
                if (buffer.length === 0) {
                    throw new Error("Buffer is empty");
                }

                buffer = await sharp(buffer)
                    .webp({ quality: 80 })
                    .toBuffer();

                const parse = path.parse(file.name);
                filename = `${parse.name}.webp`;
                mimeType = 'image/webp';
                size = buffer.length;
            } catch (sharpError) {
                console.error("Sharp optimization failed:", sharpError);
                // Fallback to original file
            }
        }

        const url = await uploadToR2(buffer, filename, mimeType);

        const newItem = await db.mediaItem.create({
            data: {
                filename: filename,
                url: url,
                mimeType: mimeType,
                size: size,
            }
        });

        return NextResponse.json(newItem);
    } catch (error) {
        console.error("Upload Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !['admin', 'editor'].includes(session.user.role)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return new NextResponse("ID required", { status: 400 });

        const item = await db.mediaItem.findUnique({
            where: { id: id }
        });

        if (!item) {
            return new NextResponse("Item not found", { status: 404 });
        }

        await deleteFromR2(item.url);

        await db.mediaItem.delete({
            where: { id: id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
