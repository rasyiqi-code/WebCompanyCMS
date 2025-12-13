"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

type Page = {
    id: string;
    path: string;
    title?: string;
    isPublished: boolean;
    updatedAt: string;
};

export default function PagesDashboard() {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadPages();
    }, []);

    const loadPages = () => {
        // We can reuse the Puck API route or create a specific one for listing.
        // Usually Puck has /api/puck, but let's check what we have.
        // We might need a dedicated listing endpoint: /api/pages
        fetch("/api/pages")
            .then(res => res.json())
            .then(data => {
                setPages(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const deletePage = async (path: string) => {
        if (!confirm(`Are you sure you want to delete ${path}?`)) return;

        try {
            const res = await fetch("/api/pages", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path })
            });

            if (res.ok) {
                loadPages();
            } else {
                alert("Failed to delete page");
            }
        } catch (e) {
            alert("Error deleting page");
        }
    };

    const createPage = () => {
        const path = prompt("Enter new page path (e.g., /about):");
        if (!path) return;

        const cleanPath = path.startsWith("/") ? path : `/${path}`;

        // Navigate to editor with new path - Puck handles creation on save
        // But for better UX we might want to pre-create or just go there.
        // Navigate to standard editor
        router.push(`/dashboard/pages/editor?path=${cleanPath}`);
    };

    if (loading) return <div className="p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage static content pages.</p>
                </div>
                <button
                    onClick={createPage}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                    <Plus size={18} className="mr-2" /> Create New Page
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Path</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pages.map((page) => (
                            <tr key={page.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{page.title || "Untitled"}</div>
                                    <div className="text-sm text-gray-500 font-mono">{page.path}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${page.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                        {page.isPublished ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(page.updatedAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-3">
                                        <Link href={`/dashboard/pages/editor?path=${page.path}`} className="text-indigo-600 hover:text-indigo-900" title="Edit Content">
                                            <Edit size={18} />
                                        </Link>
                                        <a href={`/page${page.path}`} target="_blank" className="text-gray-400 hover:text-gray-600" title="View Page">
                                            <ExternalLink size={18} />
                                        </a>
                                        <button onClick={() => deletePage(page.path)} className="text-red-400 hover:text-red-600" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {pages.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-500 italic">
                                    No pages found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
