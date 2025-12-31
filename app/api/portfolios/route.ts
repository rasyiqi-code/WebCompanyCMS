import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const items = await db.portfolioItem.findMany({
            orderBy: { createdAt: 'desc' }
        });
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

        const newItem = await db.portfolioItem.create({
            data: {
                title,
                category,
                imageUrl,
                link,
                description
            }
        });

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

        await db.portfolioItem.delete({
            where: { id: id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
