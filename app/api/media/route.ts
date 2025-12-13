
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaItems } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { uploadToR2 } from "@/lib/r2";

export async function GET() {
    try {
        const items = await db.select().from(mediaItems).orderBy(desc(mediaItems.createdAt));
        return NextResponse.json(items);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return new NextResponse("File required", { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const url = await uploadToR2(buffer, file.name, file.type);

        const [newItem] = await db.insert(mediaItems).values({
            filename: file.name,
            url: url,
            mimeType: file.type,
            size: file.size,
        }).returning();

        return NextResponse.json(newItem);
    } catch (error) {
        console.error("Upload Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return new NextResponse("ID required", { status: 400 });

        // Ideally we should also delete from R2, but for now we just delete DB record
        await db.delete(mediaItems).where(eq(mediaItems.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
