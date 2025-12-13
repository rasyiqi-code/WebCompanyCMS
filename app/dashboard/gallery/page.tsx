
"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Plus, Image as ImageIcon } from "lucide-react";

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

    if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <Plus size={18} /> Add Image
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm mb-6">
                    <h3 className="font-bold mb-4">Add New Image</h3>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="title" placeholder="Image Title" className="w-full px-3 py-2 border rounded-lg" />
                            <input required name="url" placeholder="Image URL (http://...)" className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <input name="description" placeholder="Description (optional)" className="w-full px-3 py-2 border rounded-lg" />
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {items.map(item => (
                    <div key={item.id} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md">
                        <div className="aspect-square bg-gray-100 relative">
                            <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="p-3">
                            <p className="font-medium truncate">{item.title || "Untitled"}</p>
                            <p className="text-xs text-gray-500 truncate">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-500">No images yet</p>
                </div>
            )}
        </div>
    );
}
