import { db } from "./db";

export const getPosts = async () => {
    try {
        const allPosts = await db.post.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' }
        });

        return allPosts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};
