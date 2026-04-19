
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET() {
    try {
        const taxonomies = await db.taxonomy.findMany({
            include: {
                _count: {
                    select: { terms: true }
                }
            },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(taxonomies);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch taxonomies" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, slug, description } = body;

        if (!name || !slug) {
            return NextResponse.json({ error: "Name and Slug are required" }, { status: 400 });
        }

        const taxonomy = await db.taxonomy.create({
            data: { name, slug, description }
        });

        return NextResponse.json(taxonomy);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Taxonomy with this slug already exists" }, { status: 409 });
        }
        return NextResponse.json({ error: "Failed to create taxonomy" }, { status: 500 });
    }
}
