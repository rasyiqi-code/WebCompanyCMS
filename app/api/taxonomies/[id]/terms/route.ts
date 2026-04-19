
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const terms = await db.term.findMany({
            where: { taxonomyId: id },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(terms);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch terms" }, { status: 500 });
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await req.json();
        const { name, slug, description, parentId } = body;

        if (!name || !slug) {
            return NextResponse.json({ error: "Name and Slug are required" }, { status: 400 });
        }

        const term = await db.term.create({
            data: {
                name,
                slug,
                description,
                taxonomyId: id,
                parentId: parentId || null
            }
        });

        return NextResponse.json(term);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Term with this slug already exists in this taxonomy" }, { status: 409 });
        }
        return NextResponse.json({ error: "Failed to create term" }, { status: 500 });
    }
}
