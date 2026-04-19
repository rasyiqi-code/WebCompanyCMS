
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ChevronLeft, Tag, Layers, Loader2 } from "lucide-react";
import Link from "next/link";
import { PageHeader, FormSection, FormInput, FormTextArea } from "@/components/dashboard/ui/DataTable";

export default function NewTaxonomyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/taxonomies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create taxonomy");
            }

            router.push("/dashboard/taxonomies");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-20 px-4">
            <div className="flex items-center gap-2 mb-2">
                <Link href="/dashboard/taxonomies" className="text-gray-400 hover:text-white transition-colors">
                    <ChevronLeft size={16} />
                </Link>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Back to Taxonomies</span>
            </div>

            <PageHeader 
                title="Create New Taxonomy" 
                subtitle="Define a new way to group your content (e.g. Category, Tag, Brand)."
            />

            <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                            {error}
                        </div>
                    )}

                    <FormSection title="Taxonomy Details" description="Define the primary identifiers and narrative for this classification group.">
                        <div className="space-y-4">
                            <FormInput
                                label="Display Name"
                                required
                                value={form.name}
                                onChange={(e) => {
                                    const name = e.target.value;
                                    setForm({
                                        ...form,
                                        name,
                                        slug: form.slug || name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                                    });
                                }}
                                placeholder="e.g. Category"
                            />

                            <FormInput
                                label="URL Slug"
                                required
                                value={form.slug}
                                onChange={(e) => setForm({...form, slug: e.target.value})}
                                placeholder="category"
                                className="font-mono"
                            />

                            <FormTextArea
                                label="Description"
                                value={form.description}
                                onChange={(e) => setForm({...form, description: e.target.value})}
                                placeholder="What is this taxonomy used for?"
                                rows={4}
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center justify-center px-8 py-2 bg-[#2eaadc] text-white rounded-lg hover:bg-[#1a99cc] disabled:opacity-50 text-xs font-bold transition-all shadow-lg shadow-[#2eaadc]/10"
                            >
                                {loading ? <Loader2 className="animate-spin mr-2" size={14} /> : <Save className="mr-2" size={14} />}
                                Initialize Taxonomy
                            </button>
                        </div>
                    </FormSection>
                </form>
            </div>
        </div>
    );
}
