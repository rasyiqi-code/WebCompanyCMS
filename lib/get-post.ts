import { db } from "./db";
import { posts } from "../db/schema";
import { eq } from "drizzle-orm";

export const getPost = async (slug: string) => {
    const [post] = await db.select()
        .from(posts)
        .where(eq(posts.slug, slug))
        .limit(1);

    return post || null;
};
