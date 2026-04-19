import { db } from "./db";

export const getPost = async (slug: string) => {
    try {
        const post = await db.post.findUnique({
            where: { slug: slug },
            include: {
                author: {
                    select: { name: true }
                }
            }
        });

        if (!post) return null;

        return {
            ...post,
            authorName: post.author?.name
        };
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
};
