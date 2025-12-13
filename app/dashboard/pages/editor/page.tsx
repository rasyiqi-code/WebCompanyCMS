"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

function PageEditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isEditing = searchParams.has("path");
    const initialPath = searchParams.get("path") || "";

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        path: "",
        title: "",
        body: "",
        isPublished: true
    });

    useEffect(() => {
        if (isEditing && initialPath) {
            fetch(`/api/pages`)
                .then(res => res.json())
                .then(data => {
                    const page = data.find((p: any) => p.path === initialPath);
                    if (page) {
                        setFormData({
                            id: page.id,
                            path: page.path,
                            title: page.title || "",
                            body: page.body || "",
                            isPublished: page.isPublished
                        });
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [isEditing, initialPath]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData(prev => {
            const newData = { ...prev, [e.target.name]: value };

            // Auto-fill path from title if creating new and path is empty
            if (!isEditing && e.target.name === 'title' && !prev.path) {
                const slug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                newData.path = `/${slug}`;
            }
            return newData;
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch("/api/pages", {
                method: "POST", // Using POST for upsert logic in our API
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to save");
            }

            alert("Page saved successfully!");
            router.push("/dashboard/pages");
        } catch (error: any) {
            console.error(error);
            alert(`Error saving page: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard/pages" className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditing ? `Edit Page: ${formData.title || formData.path}` : "Create New Page"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                        <input
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. About Us"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Path</label>
                        <input
                            name="path"
                            required
                            value={formData.path}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. /about"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Must start with /. The final URL will be <strong>/page{formData.path}</strong>
                        </p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content (HTML)</label>
                    <textarea
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        rows={15}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                        placeholder="<h1>Page Title</h1><p>Your content here...</p>"
                    />
                    <p className="text-xs text-gray-500 mt-1">You can write raw HTML or plain text here.</p>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isPublished"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label htmlFor="isPublished" className="text-sm font-medium text-gray-900">Publish this page</label>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                    >
                        {saving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
                        Save Page
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function PageEditor() {
    return (
        <Suspense fallback={<div className="p-10"><Loader2 className="animate-spin" /></div>}>
            <PageEditorContent />
        </Suspense>
    );
}
