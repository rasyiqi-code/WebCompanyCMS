"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, GripVertical, Save, Settings } from "lucide-react";
import { 
    PageHeader,
    Skeleton,
    TableSkeleton,
    CustomSelect
} from "@/components/dashboard/ui/DataTable";

type MenuItem = {
    label: string;
    url: string;
    target: string;
    order: number;
};

export default function MenusPage() {
    // For now, only 'main' menu is supported in UI as MVP
    const [menuSlug, setMenuSlug] = useState("main");
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [publishedPages, setPublishedPages] = useState<any[]>([]);

    useEffect(() => {
        // Fetch published pages
        fetch('/api/pages')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setPublishedPages(data.filter((p: any) => p.isPublished));
                }
            })
            .catch(console.error);

        // Fetch menu items
        setLoading(true);
        fetch(`/api/menus?slug=${menuSlug}`)
            .then(res => res.json())
            .then(data => {
                const sorted = (data.items || []).sort((a: any, b: any) => a.order - b.order);
                setItems(sorted.map((i: any) => ({
                    label: i.label,
                    url: i.url,
                    target: i.target || "_self",
                    order: i.order
                })));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
    }, [menuSlug]);


    const addPageItem = (pagePath: string) => {
        if (!pagePath) return;

        const page = publishedPages.find(p => p.path === pagePath);
        if (page) {
            // URL should be the direct page path (e.g., /about)
            const url = `${page.path}`;
            setItems([...items, { label: page.title || "Page", url, target: "_self", order: items.length }]);
        }
    };

    const addItem = () => {
        setItems([...items, { label: "New Link", url: "/", target: "_self", order: items.length }]);
    };

    const updateItem = (index: number, field: keyof MenuItem, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const itemsToSave = items.map((item, idx) => ({ ...item, order: idx }));
            const res = await fetch("/api/menus", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug: menuSlug, items: itemsToSave }),
            });

            if (!res.ok) throw new Error("Failed to save");
            alert("Menu saved!");
        } catch (e) {
            alert("Error saving menu");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8">
            <PageHeader title="Menus" subtitle="Design and structure your site's operational flow." />
            <div className="p-4 bg-[#202020] rounded border border-[#2f2f2f]">
                <Skeleton className="h-10 w-full mb-4" />
                <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8">
            <PageHeader 
                title="Menus" 
                subtitle="Design and structure your site's operational flow."
            >
                <div className="flex items-center gap-2">
                    <CustomSelect
                        options={[
                            { label: "Main Navigation", value: "main" },
                            { label: "Footer Links", value: "footer" }
                        ]}
                        value={menuSlug}
                        onChange={(val) => setMenuSlug(val)}
                        className="min-w-[160px]"
                    />
                </div>
            </PageHeader>

            {/* Quick Add Section */}
            <div className="p-4 bg-[#202020] rounded border border-[#2f2f2f] flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">Quick Add</h3>
                    <p className="text-white text-xs">Instantly bind a published page to this menu.</p>
                </div>
                <CustomSelect
                    placeholder="Select Page..."
                    options={publishedPages.map(page => ({ label: page.title, value: page.path }))}
                    onChange={addPageItem}
                    value=""
                    variant="primary"
                    className="w-full md:w-64"
                />
            </div>

            <div className="bg-[#202020] rounded border border-[#2f2f2f] overflow-hidden">
                <div className="p-3 bg-white/5 border-b border-[#2f2f2f] grid grid-cols-12 gap-4 text-[10px] text-white uppercase tracking-widest px-6">
                    <div className="col-span-1"></div>
                    <div className="col-span-4 font-medium">Display Label</div>
                    <div className="col-span-5 font-medium">Target URL</div>
                    <div className="col-span-2 text-right font-medium">Ops</div>
                </div>

                <div className="divide-y divide-[#2f2f2f]">
                    {items.map((item, idx) => (
                        <div key={idx} className="p-2 grid grid-cols-12 gap-4 items-center hover:bg-white/5 transition-all group">
                            <div className="col-span-1 flex justify-center text-gray-700 cursor-move group-hover:text-white transition-colors">
                                <GripVertical size={14} />
                            </div>
                            <div className="col-span-4">
                                <input
                                    className="w-full px-2 py-1 bg-transparent border border-transparent focus:bg-[#191919] focus:border-[#2f2f2f] rounded outline-none text-white text-xs font-bold transition-all placeholder:text-gray-700"
                                    value={item.label}
                                    onChange={(e) => updateItem(idx, 'label', e.target.value)}
                                    placeholder="Label"
                                />
                            </div>
                            <div className="col-span-5">
                                <input
                                    className="w-full px-2 py-1 bg-transparent border border-transparent focus:bg-[#191919] focus:border-[#2f2f2f] rounded outline-none text-white font-mono text-xs transition-all placeholder:text-gray-700"
                                    value={item.url}
                                    onChange={(e) => updateItem(idx, 'url', e.target.value)}
                                    placeholder="/"
                                />
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <button
                                    onClick={() => removeItem(idx)}
                                    className="p-1 px-2 text-white hover:text-red-400 hover:bg-red-500/5 rounded transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="p-12 text-center text-white italic text-xs">Your menu is empty.</div>
                    )}
                </div>

                <div className="p-4 bg-white/2 border-t border-[#2f2f2f] flex flex-col md:flex-row justify-between items-center gap-4">
                    <button
                        onClick={addItem}
                        className="flex items-center text-xs font-bold text-white hover:text-white transition-colors group"
                    >
                        <Plus size={14} className="mr-2" />
                        Add item
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center justify-center px-6 py-2 bg-[#2eaadc] text-white rounded hover:bg-[#1a99cc] disabled:opacity-50 text-xs font-bold transition-colors"
                    >
                        {saving ? <Loader2 className="animate-spin mr-2" size={14} /> : <Save className="mr-2" size={14} />}
                        Save Menu
                    </button>
                </div>
            </div>
        </div>
    );
}
