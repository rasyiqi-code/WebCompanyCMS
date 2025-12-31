import React from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Globe } from "lucide-react";
import { db } from "../../../lib/db";

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
    const allPosts = await db.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            author: {
                select: { name: true }
            }
        }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
                    <p className="text-gray-500 mt-1">Manage your blog content.</p>
                </div>
                <Link
                    href="/dashboard/posts/new"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    <Plus size={18} className="mr-2" />
                    New Post
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Title</th>
                            <th className="px-6 py-4 font-semibold">Author</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {allPosts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No posts found. Create your first one!
                                </td>
                            </tr>
                        ) : (
                            allPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{post.title}</p>
                                        <p className="text-xs text-gray-400 font-mono mt-1">/{post.slug}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {post.author?.name || "Unknown"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {post.published ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                Draft
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button className="text-gray-400 hover:text-blue-600 transition-colors" title="View">
                                            <Globe size={18} />
                                        </button>
                                        <Link href={`/dashboard/posts/${post.id}`} className="text-gray-400 hover:text-indigo-600 transition-colors inline-block" title="Edit">
                                            <Edit size={18} />
                                        </Link>
                                        <button className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
