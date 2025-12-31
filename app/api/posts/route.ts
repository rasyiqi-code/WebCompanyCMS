import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export async function GET(req: Request) {
    try {
        const allPosts = await db.post.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ posts: allPosts });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    try {
        const body = await req.json();
        const { title, slug, content, status, imageUrl, postId } = body;

        // Basic validation
        if (!title || !slug) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let post;

        // If postId provided, Update. Else Create.
        if (postId) {
            post = await db.post.update({
                where: { id: postId },
                data: {
                    title,
                    slug,
                    content: content || {},
                    imageUrl,
                    published: status === "published",
                    updatedAt: new Date()
                }
            });
        } else {
            // Create new

            // Find admin to assign as author if session is missing (MVP fallback)
            const defaultAdmin = await db.user.findFirst({
                where: { role: 'admin' }
            });
            let authorId = (session?.user as any)?.id || defaultAdmin?.id;

            if (!authorId) {
                // Create a temp admin if none exists (Auto-seed fallback)
                const newAdmin = await db.user.create({
                    data: {
                        name: "Admin User",
                        email: "admin@example.com",
                        role: "admin",
                        image: `https://ui-avatars.com/api/?name=Admin+User&background=random`
                    }
                });

                // Let's use the new admin
                post = await db.post.create({
                    data: {
                        title,
                        slug,
                        content: content || {},
                        imageUrl,
                        published: status === "published",
                        authorId: newAdmin.id,
                        updatedAt: new Date()
                    }
                });

                return NextResponse.json({ success: true, post });
            }

            post = await db.post.create({
                data: {
                    title,
                    slug,
                    content: content || {},
                    imageUrl,
                    published: status === "published",
                    authorId: String(authorId),
                    updatedAt: new Date()
                }
            });
        }

        return NextResponse.json({ success: true, post });

    } catch (error) {
        console.error("Error saving post:", error);
        return NextResponse.json({ error: `Failed to save post: ${(error as Error).message}` }, { status: 500 });
    }
}
