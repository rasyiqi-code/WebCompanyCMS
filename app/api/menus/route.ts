
import { NextResponse } from "next/server";
import { getMenu, updateMenu } from "../../../lib/menus";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "main";

    try {
        const menu = await getMenu(slug);
        return NextResponse.json(menu);
    } catch (error) {
        console.error("Error fetching menu:", error);
        return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { slug, items } = body;

        if (!slug || !items) {
            return NextResponse.json({ error: "Missing slug or items" }, { status: 400 });
        }

        const updated = await updateMenu(slug, items);
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating menu:", error);
        return NextResponse.json({ error: "Failed to update menu" }, { status: 500 });
    }
}
