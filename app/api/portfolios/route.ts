
import { db } from "@/lib/db";
import { portfolioItems } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

export async function GET(req: Request) {
    try {
        const items = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
        return NextResponse.json(items);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, category, imageUrl, link, description } = body;

        if (!title || !category || !imageUrl) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const [newItem] = await db.insert(portfolioItems).values({
            title,
            category,
            imageUrl,
            link,
            description
        }).returning();

        return NextResponse.json(newItem);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return new NextResponse("ID required", { status: 400 });

        await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
