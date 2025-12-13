import { db } from "./db";
import { posts } from "../db/schema";
import { eq } from "drizzle-orm";

import { users } from "../db/schema";

export const getPost = async (slug: string) => {
    const rows = await db.select({
        post: posts,
        authorName: users.name,
    })
        .from(posts)
        .leftJoin(users, eq(posts.authorId, users.id))
        .where(eq(posts.slug, slug))
        .limit(1);

    if (!rows.length) return null;

    const { post, authorName } = rows[0];
    return {
        ...post,
        authorName
    };
};
