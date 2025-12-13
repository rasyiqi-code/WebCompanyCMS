import React from "react";
import { db } from "../../../../lib/db";
import { posts } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import PostEditor from "../PostEditor";

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    // If 'new', render empty editor
    if (id === "new") {
        return <PostEditor />;
    }

    const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);

    if (!post) {
        return <div className="p-8 text-center text-red-500">Post not found</div>;
    }

    return <PostEditor postId={post.id} initialData={post} />;
}
