
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { puckPages } from "../../../db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
    try {
        const pages = await db.select().from(puckPages).orderBy(desc(puckPages.updatedAt));
        return NextResponse.json(pages);
    } catch (error) {
        console.error("Error fetching pages:", error);
        return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { path } = body;

        if (!path) return NextResponse.json({ error: "Missing path" }, { status: 400 });

        await db.delete(puckPages).where(eq(puckPages.path, path));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, path, title, body: contentBody, isPublished } = body;

        if (!path) return NextResponse.json({ error: "Missing path" }, { status: 400 });

        // Upsert logic
        if (id) {
            // Update existing by ID
            await db.update(puckPages)
                .set({
                    path,
                    title,
                    body: contentBody,
                    isPublished,
                    updatedAt: new Date()
                })
                .where(eq(puckPages.id, id));
        } else {
            // Check if path exists (conflict check for new pages)
            const existing = await db.select().from(puckPages).where(eq(puckPages.path, path)).limit(1);
            if (existing.length > 0) {
                return NextResponse.json({ error: "Path already exists" }, { status: 409 });
            }

            await db.insert(puckPages).values({
                path,
                title,
                body: contentBody,
                isPublished: isPublished ?? true,
                data: {},
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}
