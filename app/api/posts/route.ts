import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { posts, users } from "../../../db/schema";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        // const limit = searchParams.get('limit'); // Optional enhancement

        const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

        return NextResponse.json({ posts: allPosts });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // For MVP, if no session, we might skip check or return 401. 
    // Given we haven't fully set up the login flow UI yet, let's allow it but warn.
    // if (!session) { ... }

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
            [post] = await db.update(posts)
                .set({
                    title,
                    slug,
                    content,
                    imageUrl,
                    published: status === "published",
                    updatedAt: new Date()
                })
                .where(eq(posts.id, postId))
                .returning();
        } else {
            // Create new

            // Find admin to assign as author if session is missing (MVP fallback)
            const [defaultAdmin] = await db.select().from(users).where(eq(users.role, 'admin')).limit(1);
            let authorId = (session?.user as any)?.id || defaultAdmin?.id;

            if (!authorId) {
                // Create a temp admin if none exists (Auto-seed fallback)
                const [newAdmin] = await db.insert(users).values({
                    name: "Admin User",
                    email: "admin@example.com",
                    role: "admin",
                    image: `https://ui-avatars.com/api/?name=Admin+User&background=random`
                }).returning();

                // Let's use the new admin
                [post] = await db.insert(posts).values({
                    title,
                    slug,
                    content,
                    imageUrl,
                    published: status === "published",
                    authorId: newAdmin.id,
                    updatedAt: new Date()
                }).returning();

                return NextResponse.json({ success: true, post });
            }

            [post] = await db.insert(posts).values({
                title,
                slug,
                content,
                imageUrl,
                published: status === "published",
                authorId: String(authorId),
                updatedAt: new Date()
            }).returning();
        }

        return NextResponse.json({ success: true, post });

    } catch (error) {
        console.error("Error saving post:", error);
        return NextResponse.json({ error: `Failed to save post: ${(error as Error).message}` }, { status: 500 });
    }
}
