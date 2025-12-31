import React from "react";
import { db } from "../../../../lib/db";
import PostEditor from "../PostEditor";

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    // If 'new', render empty editor
    if (id === "new") {
        return <PostEditor />;
    }

    const post = await db.post.findUnique({
        where: { id: id }
    });

    if (!post) {
        return <div className="p-8 text-center text-red-500">Post not found</div>;
    }

    return <PostEditor postId={post.id} initialData={post} />;
}
