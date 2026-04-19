
import { NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string; termId: string }> }
) {
    const { termId } = await params;
    try {
        await db.term.delete({
            where: { id: termId }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete term" }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string; termId: string }> }
) {
    const { termId } = await params;
    try {
        const body = await req.json();
        const { name, slug, description, parentId } = body;

        const term = await db.term.update({
            where: { id: termId },
            data: {
                name,
                slug,
                description,
                parentId: parentId || null
            }
        });

        return NextResponse.json(term);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Term with this slug already exists" }, { status: 409 });
        }
        return NextResponse.json({ error: "Failed to update term" }, { status: 500 });
    }
}
