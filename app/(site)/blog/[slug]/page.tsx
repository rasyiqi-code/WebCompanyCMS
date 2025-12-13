import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPost } from "../../../../lib/get-post";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt || `Read ${post.title}`,
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post || !post.published) {
        // Optionally allow authors to preview drafts if logged in (skipped for MVP)
        return notFound();
    }

    // Handle content rendering
    // The content might be a JSON string (from early Tiptap/Puck versions) or plain text/HTML
    let contentHtml = "";
    try {
        // If it looks like JSON, we might need to parse it or just dump it for now.
        // For this MVP, let's assume it could be a simple string or stringified JSON.
        if (typeof post.content === 'string') {
            // specific check for JSON-like string
            if (post.content.trim().startsWith('{') || post.content.trim().startsWith('[')) {
                // It's likely JSON. For now, just display a placeholder or raw text
                // In a real app, you'd render Tiptap JSON here.
                const parsed = JSON.parse(post.content);
                // simplistic render if it has a 'content' array (tiptap) or similar
                contentHtml = `<pre class="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded">${JSON.stringify(parsed, null, 2)}</pre>`;
            } else {
                contentHtml = post.content;
            }
        } else {
            // If it's already an object (drizzle json type)
            contentHtml = `<pre class="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded">${JSON.stringify(post.content, null, 2)}</pre>`;
        }
    } catch (e) {
        contentHtml = String(post.content);
    }


    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.imageUrl ? [post.imageUrl] : undefined,
        "datePublished": post.createdAt,
        "dateModified": post.updatedAt,
        "author": {
            "@type": "Person",
            "name": post.authorName || "Admin"
        }
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-3xl mx-auto px-6 pt-12">
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-8"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>

                <header className="mb-10">
                    {post.imageUrl && (
                        <div className="w-full h-64 md:h-96 relative mb-8 rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center text-gray-500 text-sm">
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        {post.excerpt && (
                            <span className="ml-4 border-l border-gray-300 pl-4 text-gray-600 italic">
                                {post.excerpt}
                            </span>
                        )}
                    </div>
                </header>

                <article className="prose prose-lg prose-blue max-w-none">
                    {/* 
              Security Note: deeply sanitizing HTML is important in production.
              For MVP internal usage, `dangerouslySetInnerHTML` is acceptable if we trust the source.
            */}
                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                </article>
            </div>
        </div>
    );
}
