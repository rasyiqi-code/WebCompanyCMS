
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";

interface TestimonialEditorProps {
    initialData?: {
        id?: string;
        quote: string;
        author: string;
        role?: string;
        rating: number;
        isApproved?: boolean;
    };
    isEditMode?: boolean;
}

export default function TestimonialEditor({ initialData, isEditMode = false }: TestimonialEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: initialData?.id || "",
        author: initialData?.author || "",
        role: initialData?.role || "",
        quote: initialData?.quote || "",
        rating: initialData?.rating || 5,
        isApproved: initialData?.isApproved ?? true // Default to true for admin creations
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const method = isEditMode ? "PUT" : "POST";
            const res = await fetch("/api/testimonials", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push("/dashboard/testimonials");
                router.refresh();
            } else {
                alert("Failed to save");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/testimonials?id=${formData.id}`, { method: "DELETE" });
            if (res.ok) {
                router.push("/dashboard/testimonials");
                router.refresh();
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <Link href="/dashboard/testimonials" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6">
                <ArrowLeft size={18} className="mr-2" /> Back to Testimonials
            </Link>

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? "Edit Testimonial" : "Add New Testimonial"}
                </h1>
                {isEditMode && (
                    <button
                        onClick={handleDelete}
                        type="button"
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                        title="Delete Testimonial"
                    >
                        <Trash2 size={20} />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                    <input
                        required
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role / Title</label>
                    <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. CEO of Company"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                    <textarea
                        required
                        value={formData.quote}
                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
                        placeholder="What did they say?"
                    />
                </div>

                <div>
                    <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.isApproved}
                            onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-900 font-medium">Approved (Visible on public site)</span>
                    </label>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                    >
                        {loading ? "Saving..." : <><Save size={20} className="mr-2" /> Save Testimonial</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
