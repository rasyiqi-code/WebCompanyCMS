
"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Plus, Briefcase } from "lucide-react";

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

    if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Portfolio Management</h1>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <Plus size={18} /> Add Project
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm mb-6">
                    <h3 className="font-bold mb-4">Add New Project</h3>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required name="title" placeholder="Project Title" className="w-full px-3 py-2 border rounded-lg" />
                            <input required name="category" placeholder="Category (e.g. Web Design)" className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required name="imageUrl" placeholder="Image URL (http://...)" className="w-full px-3 py-2 border rounded-lg" />
                            <input name="link" placeholder="Project Link (http://...)" className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <textarea name="description" placeholder="Short Description" className="w-full px-3 py-2 border rounded-lg" rows={3} />
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {items.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-4 items-center">
                        <img src={item.imageUrl} alt={item.title} className="w-24 h-16 object-cover rounded bg-gray-100" />
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{item.title}</h3>
                            <div className="flex gap-2 text-sm text-gray-500">
                                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">{item.category}</span>
                                {item.link && <a href={item.link} target="_blank" className="hover:underline">View Link ↗</a>}
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {items.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-500">No projects yet</p>
                </div>
            )}
        </div>
    );
}
