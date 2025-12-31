import { db } from "./db";

export const getPosts = async () => {
    const allPosts = await db.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    });

    return allPosts;
};
