
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { hooks } from "../../../lib/hooks";

export async function GET() {
    try {
        const pages = await db.credBuildPage.findMany({
            orderBy: { updatedAt: 'desc' },
            include: {
                metaData: true,
                seoMeta: true,
            }
        });
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

        await db.credBuildPage.delete({
            where: { path: path }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, path, title, description, imageUrl, body: contentBody, isPublished, useBuilder, metaData } = body;

        if (!path) return NextResponse.json({ error: "Missing path" }, { status: 400 });

        // Upsert logic
        if (id) {
            // Get existing to check for promotion
            const existing = await db.credBuildPage.findUnique({ where: { id } });
            
            let finalData = body.data;
            
            // Auto-migrate content if promoting from Standard to Visual and data is empty
            if (existing && !existing.useBuilder && useBuilder && (!finalData || Object.keys(finalData).length === 0)) {
                finalData = {
                    content: [
                        {
                            type: "RichText",
                            props: {
                                id: "migrated-content",
                                content: contentBody || ""
                            }
                        }
                    ],
                    root: { props: { title } }
                };
            }

            // Update existing by ID
            await db.credBuildPage.update({
                where: { id: id },
                data: {
                    path,
                    title,
                    description,
                    imageUrl,
                    body: contentBody,
                    isPublished,
                    useBuilder,
                    data: finalData ?? existing?.data ?? {},
                    updatedAt: new Date()
                }
            });
        } else {
            // Check if path exists (conflict check for new pages)
            const existing = await db.credBuildPage.findUnique({
                where: { path: path }
            });
            if (existing) {
                return NextResponse.json({ error: "Path already exists" }, { status: 409 });
            }

            await db.credBuildPage.create({
                data: {
                    path,
                    title,
                    description,
                    imageUrl,
                    body: contentBody,
                    isPublished: isPublished ?? true,
                    useBuilder: useBuilder ?? true,
                    data: {},
                }
            });
        }

        // Handle MetaData Synchronization
        if (id && metaData && Array.isArray(metaData)) {
            // Simple sync: delete existing for this page and recreate
            // (In a more complex app, we might want to update by ID to keep history)
            await db.metaData.deleteMany({
                where: { pageId: id }
            });

            if (metaData.length > 0) {
                await db.metaData.createMany({
                    data: metaData.map((m: any) => ({
                        key: m.key,
                        value: m.value,
                        type: m.type || "text",
                        pageId: id,
                    }))
                });
            }
        }

        const page = await db.credBuildPage.findFirst({
            where: { path: path }
        });

        if (page) {
            hooks.doAction("page_saved", page);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}
