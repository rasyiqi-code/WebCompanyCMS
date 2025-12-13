"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, GripVertical, Save } from "lucide-react";

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


    const addPageItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const pagePath = e.target.value;
        if (!pagePath) return;

        const page = publishedPages.find(p => p.path === pagePath);
        if (page) {
            // URL should be /page/foo for standard pages
            const url = `/page${page.path}`;
            setItems([...items, { label: page.title || "Page", url, target: "_self", order: items.length }]);
        }
        e.target.value = "";
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

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Menus Management</h1>
                <div className="flex gap-2">
                    <select
                        className="px-3 py-2 border rounded-md"
                        value={menuSlug}
                        onChange={(e) => setMenuSlug(e.target.value)}
                    >
                        <option value="main">Main Menu</option>
                        <option value="footer">Footer Menu</option>
                    </select>
                </div>
            </div>

            {/* Quick Add Section */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-blue-900">Quick Add Page</h3>
                    <p className="text-xs text-blue-700">Select a published page to add to this menu.</p>
                </div>
                <select
                    className="px-3 py-2 border border-blue-200 rounded-md text-sm min-w-[200px] outline-none focus:border-blue-500"
                    onChange={addPageItem}
                    defaultValue=""
                >
                    <option value="" disabled>Select a Page...</option>
                    {publishedPages.map(page => (
                        <option key={page.id} value={page.path}>
                            {page.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200 font-medium grid grid-cols-12 gap-4 text-sm text-gray-500">
                    <div className="col-span-1"></div>
                    <div className="col-span-4">Label</div>
                    <div className="col-span-5">URL</div>
                    <div className="col-span-2">Actions</div>
                </div>

                <div className="divide-y divide-gray-100">
                    {items.map((item, idx) => (
                        <div key={idx} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 group">
                            <div className="col-span-1 flex justify-center text-gray-400 cursor-move">
                                <GripVertical size={16} />
                            </div>
                            <div className="col-span-4">
                                <input
                                    className="w-full px-2 py-1 border border-transparent hover:border-gray-300 rounded focus:border-blue-500 outline-none"
                                    value={item.label}
                                    onChange={(e) => updateItem(idx, 'label', e.target.value)}
                                    placeholder="Link Label"
                                />
                            </div>
                            <div className="col-span-5">
                                <input
                                    className="w-full px-2 py-1 border border-transparent hover:border-gray-300 rounded focus:border-blue-500 outline-none text-gray-600 font-mono text-sm"
                                    value={item.url}
                                    onChange={(e) => updateItem(idx, 'url', e.target.value)}
                                    placeholder="/path"
                                />
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <button
                                    onClick={() => removeItem(idx)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="p-8 text-center text-gray-500 italic">No menu items yet.</div>
                    )}
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                    <button
                        onClick={addItem}
                        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        <Plus size={16} className="mr-1" /> Add Custom Link
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
                    >
                        {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
                        Save Menu
                    </button>
                </div>
            </div>
        </div>
    );
}
