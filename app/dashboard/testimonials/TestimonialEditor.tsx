
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, Loader2 } from "lucide-react";
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
        <div className="w-full py-10 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <Link href="/dashboard/testimonials" className="inline-flex items-center gap-2 text-white hover:text-white mb-8 group transition-all font-bold text-xs uppercase tracking-widest">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all">
                    <ArrowLeft size={16} />
                </div>
                Back to Testimonials
            </Link>

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        {isEditMode ? "Edit Testimonial" : "Create Testimonial"}
                    </h1>
                    <p className="text-white font-medium mt-1 text-xs">
                        {isEditMode ? `Managing testimonial from ${formData.author}` : "Add a new customer endorsement to your collection."}
                    </p>
                </div>
                {isEditMode && (
                    <button
                        onClick={handleDelete}
                        type="button"
                        className="w-12 h-12 flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500/20 transition-all hover:scale-110 active:scale-95"
                        title="Purge Sentiment"
                    >
                        <Trash2 size={20} />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="bg-[#0a0a0a] rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-blue-500/50"></div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1 text-indigo-400">Author Name</label>
                            <input
                                required
                                type="text"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none text-white transition-all font-bold"
                                placeholder="e.g. Architect-Zero-One"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1 text-indigo-400">Role / Company</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none text-white transition-all font-medium"
                                placeholder="e.g. Chief of Digital Manifest"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1 text-indigo-400">Testimonial Quote</label>
                        <textarea
                            required
                            value={formData.quote}
                            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none text-white transition-all h-40 resize-none font-medium leading-relaxed"
                            placeholder="State the observed value..."
                        />
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <label className="flex items-center space-x-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 cursor-pointer transition-all group/toggle">
                            <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${formData.isApproved ? 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.3)]' : 'bg-white/10 border border-white/5'}`}>
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${formData.isApproved ? 'left-7' : 'left-1'}`} />
                            </div>
                            <input
                                type="checkbox"
                                checked={formData.isApproved}
                                onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                                className="hidden"
                            />
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-sm tracking-tight">Visibility</span>
                                <span className="text-[10px] text-white font-bold uppercase tracking-widest mt-0.5">Show this testimonial on the website</span>
                            </div>
                        </label>
                    </div>

                    <div className="pt-6 flex justify-end items-center gap-6 border-t border-white/5">
                        {loading && (
                            <div className="flex items-center gap-3 text-indigo-400 font-bold text-[10px] uppercase tracking-widest animate-pulse">
                                <Loader2 size={16} className="animate-spin" /> Saving...
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-500 transition-all font-bold text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                        >
                            {!loading && <Save size={16} className="mr-3" />}
                            {loading ? "Saving..." : "Save Testimonial"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
