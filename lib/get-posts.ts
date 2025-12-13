import { db } from "./db";
import { posts } from "../db/schema";
import { eq, desc } from "drizzle-orm";

export const getPosts = async () => {
    const allPosts = await db.select()
        .from(posts)
        .where(eq(posts.published, true))
        .orderBy(desc(posts.createdAt));

    return allPosts;
};
