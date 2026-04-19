"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import TiptapEditor from "@/components/TiptapEditor";

// Tiptap is now fully implemented.

export default function PostEditor({ postId, initialData }: { postId?: string, initialData?: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState(initialData?.title || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
    const [content, setContent] = useState(JSON.stringify(initialData?.content) || ""); // Storing as string for Editor State
    const [status, setStatus] = useState(initialData?.published ? "published" : "draft");

    // Auto-generate slug from title if slug is not manually edited
    React.useEffect(() => {
        if (!initialData?.slug && title) {
            const autoSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setSlug(autoSlug);
        }
    }, [title, initialData]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Parse content string back to object if possible, to avoid double-stringification
            // if the API expects an object.
            let parsedContent = content;
            try {
                parsedContent = JSON.parse(content);
            } catch (e) {
                // If it's already a string or invalid JSON, keep it as is.
                // But normally Tiptap onChange gives us a JSON string.
            }

            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    slug,
                    content: parsedContent,
                    status,
                    imageUrl,
                    postId: initialData?.id
                })
            });

            if (!res.ok) throw new Error("Failed to save");

            router.refresh();
            router.push("/dashboard/posts");
        } catch (error) {
            console.error(error);
            alert("Failed to save post");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full animate-in fade-in duration-700 pb-20 px-4">
            <div className="flex items-center justify-between mb-8 border-b border-[#2f2f2f] pb-4">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/posts" className="w-8 h-8 rounded hover:bg-white/5 flex items-center justify-center text-white hover:text-white transition-colors">
                        <ArrowLeft size={16} />
                    </Link>
                    <h1 className="text-xl font-bold text-white tracking-tight">
                        {postId ? title || "Untitled post" : "Untitled post"}
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold hover:bg-[#1a99cc] transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-0 py-1 bg-transparent border-none focus:ring-0 outline-none text-2xl font-bold text-white placeholder:text-[#373737]"
                            placeholder="Post Title"
                            required
                        />
                    </div>

                    <div className="min-h-[400px] border-t border-[#2f2f2f] pt-4">
                        <TiptapEditor
                            content={content}
                            onChange={setContent}
                        />
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-[11px] font-bold text-white uppercase tracking-widest opacity-50">Settings</h3>
                        
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-white">Slug</label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="w-full px-2 py-1.5 bg-white/5 border border-[#2f2f2f] rounded text-[11px] font-mono text-white outline-none focus:border-gray-500 transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-white">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-2 py-1.5 bg-[#202020] border border-[#2f2f2f] rounded text-xs text-white outline-none focus:border-gray-500 transition-colors"
                                >
                                    <option value="DRAFT">Draft</option>
                                    <option value="PUBLISHED">Published</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[#2f2f2f]">
                        <h3 className="text-[11px] font-bold text-white uppercase tracking-widest opacity-50 mb-4">Cover Image</h3>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Image URL..."
                                className="w-full px-2 py-1.5 bg-white/5 border border-[#2f2f2f] rounded text-[11px] text-white outline-none focus:border-gray-500 transition-colors"
                            />
                            <div className="relative aspect-video bg-white/[0.02] border border-[#2f2f2f] rounded overflow-hidden">
                                {imageUrl ? (
                                    <Image src={imageUrl} alt="Cover" fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-700 font-bold uppercase tracking-widest">
                                        No Image
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
