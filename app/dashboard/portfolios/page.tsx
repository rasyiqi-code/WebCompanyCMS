
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Trash2, Plus, Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";
import { 
    PageHeader, 
    CardSkeleton,
    FormSection,
    FormInput,
    FormTextArea,
    EmptyState
} from "@/components/dashboard/ui/DataTable";

type PortfolioItem = {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    link: string;
    description: string;
};

export default function PortfolioDashboard() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        fetch("/api/portfolios")
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        await fetch(`/api/portfolios?id=${id}`, { method: "DELETE" });
        fetchItems();
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        await fetch("/api/portfolios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        setIsCreating(false);
        fetchItems();
    };


    return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4">
            <PageHeader 
                title="Portfolio" 
                subtitle="Manage and display your creative projects."
            >
                <button
                    onClick={() => setIsCreating(true)}
                    className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold hover:bg-[#1a99cc] transition-colors"
                >
                    New Project
                </button>
            </PageHeader>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            ) : isCreating && (
                <div className="mb-8">
                    <FormSection 
                        title="Project Portfolio" 
                        description="Chronicle your engineering or creative endeavors by detailing project specifics and external references."
                    >
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput label="Project Name" name="title" required placeholder="Name" />
                                <FormInput label="Category" name="category" required placeholder="e.g. Development" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput label="Image URL" name="imageUrl" required placeholder="HTTPS source" className="font-mono" />
                                <FormInput label="External Reference" name="link" placeholder="External URL" className="font-mono" />
                            </div>
                            <FormTextArea label="Narrative Description" name="description" placeholder="Project summary..." rows={2} />
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setIsCreating(false)} className="px-3 py-1.5 text-white hover:text-white text-xs font-bold transition-colors">Cancel</button>
                                <button type="submit" className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold hover:bg-[#1a99cc] transition-colors">Save Project</button>
                            </div>
                        </form>
                    </FormSection>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map(item => (
                    <div key={item.id} className="bg-[#202020] p-3 rounded border border-[#2f2f2f] flex flex-col gap-3 transition-colors group">
                        <div className="relative w-full h-40 rounded overflow-hidden border border-[#2f2f2f] bg-white/5">
                            <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="font-bold text-white text-sm tracking-tight">{item.title}</h3>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-1 text-white hover:text-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            <p className="text-white text-[11px] leading-relaxed line-clamp-2 uppercase tracking-tight">{item.description}</p>
                            <div className="flex items-center justify-between pt-1">
                                <span className="px-1.5 py-0.5 rounded bg-white/5 text-white text-[9px] font-bold uppercase tracking-widest border border-[#2f2f2f]">
                                    {item.category}
                                </span>
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noreferrer" className="text-white hover:text-white transition-colors">
                                        <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {items.length === 0 && !loading && (
                <EmptyState 
                    icon={<Briefcase size={32} />} 
                    message="Your portfolio is currently empty. Start showcasing your engineering excellence." 
                />
            )}
        </div>
    );
}
