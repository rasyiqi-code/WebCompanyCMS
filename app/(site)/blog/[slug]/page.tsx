import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPost } from "../../../../lib/get-post";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TiptapRenderer from "@/components/TiptapRenderer";

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

    // Content rendering is now handled by TiptapRenderer which supports both JSON and legacy HTML


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
                    <TiptapRenderer content={post.content as string} />
                </article>
            </div>
        </div>
    );
}
