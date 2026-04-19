
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, Trash2, Plus, Image as ImageIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import { 
    PageHeader, 
    CardSkeleton,
    FormSection,
    FormInput,
    FormTextArea,
    EmptyState
} from "@/components/dashboard/ui/DataTable";

type GalleryItem = {
    id: string;
    title: string;
    url: string;
    description: string;
    createdAt: string;
};

export default function GalleryDashboard() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        fetch("/api/gallery")
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
        fetchItems();
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        await fetch("/api/gallery", {
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
                title="Gallery" 
                subtitle="Manage your library of images and media assets."
            >
                <button
                    onClick={() => setIsCreating(true)}
                    className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold hover:bg-[#1a99cc] transition-colors"
                >
                    Add Media
                </button>
            </PageHeader>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            ) : isCreating && (
                <div className="mb-8">
                    <FormSection 
                        title="Upload New Asset" 
                        description="Expand your digital repertoire by linking new media assets to the central gallery."
                    >
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormInput label="Title" name="title" required placeholder="Asset name" />
                                <FormInput label="Asset URL" name="url" required placeholder="https://..." className="font-mono" />
                            </div>
                            <FormTextArea label="Description" name="description" placeholder="Brief description..." rows={2} />
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setIsCreating(false)} className="px-3 py-1.5 text-white hover:text-white text-xs font-bold transition-colors">Cancel</button>
                                <button type="submit" className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold hover:bg-[#1a99cc] transition-colors">Save Asset</button>
                            </div>
                        </form>
                    </FormSection>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {items.map(item => (
                    <div key={item.id} className="group relative bg-[#202020] rounded border border-[#2f2f2f] overflow-hidden transition-all">
                        <div className="aspect-square bg-white/[0.02] relative">
                            <Image src={item.url} alt={item.title || "Gallery image"} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="w-8 h-8 flex items-center justify-center bg-red-500/80 hover:bg-red-500 text-white rounded transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="p-3">
                            <p className="font-medium text-white truncate text-xs tracking-tight">{item.title || "Unnamed Asset"}</p>
                            <p className="text-[9px] text-white font-medium truncate uppercase tracking-widest">{item.description || "No description"}</p>
                        </div>
                    </div>
                ))}
            </div>
            {items.length === 0 && !loading && (
                <EmptyState 
                    icon={<ImageIcon size={32} />} 
                    message="Your gallery is currently empty. Start curating your digital repertoire." 
                />
            )}
        </div>
    );
}
