
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const parentId = searchParams.get("parentId") || null;

        const folders = await db.mediaFolder.findMany({
            where: {
                parentId: parentId
            },
            include: {
                _count: {
                    select: { items: true, children: true }
                }
            },
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(folders);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch folders" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, parentId } = body;

        if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

        const folder = await db.mediaFolder.create({
            data: {
                name,
                parentId: parentId || null
            }
        });

        return NextResponse.json(folder);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create folder" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

        // Check if folder has items
        const folder = await db.mediaFolder.findUnique({
            where: { id },
            include: { _count: { select: { items: true, children: true } } }
        });

        if (folder && (folder._count.items > 0 || folder._count.children > 0)) {
            return NextResponse.json({ error: "Cannot delete non-empty folder" }, { status: 400 });
        }

        await db.mediaFolder.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete folder" }, { status: 500 });
    }
}
