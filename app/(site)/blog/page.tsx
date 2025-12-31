import { getPosts } from "../../../lib/get-posts";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Read the latest articles, tutorials, and updates from the Builder team.",
};

export default async function BlogIndexPage() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
                            Our Blog
                        </h1>
                        <p className="text-xl text-gray-500">
                            Insights, thoughts, and announcements from the team.
                        </p>
                    </div>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
                        <p className="mt-2 text-gray-500">Check back later for new content.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                                {/* Image */}
                                {post.imageUrl ? (
                                    <div className="h-48 w-full overflow-hidden bg-gray-100">
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-48 w-full bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
                                        <span className="text-indigo-200">
                                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                        </span>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                        <div className="flex items-center">
                                            <Calendar size={14} className="mr-1.5" />
                                            <time dateTime={post.createdAt.toISOString()}>
                                                {new Date(post.createdAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </Link>
                                    </h3>

                                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow">
                                        {post.excerpt || "No excerpt available."}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors group"
                                        >
                                            Read Article
                                            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
