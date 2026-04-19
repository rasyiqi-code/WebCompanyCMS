"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Save, ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCurrency } from "@/hooks/use-currency";

export default function ProductEditor({ productId, initialData }: { productId?: string, initialData?: any }) {
    const router = useRouter();
    const { symbol, currency } = useCurrency();
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState(initialData?.name || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [price, setPrice] = useState(initialData?.price || "");
    const [stock, setStock] = useState(initialData?.stock || 0);
    const [description, setDescription] = useState(initialData?.description || "");
    const [images, setImages] = useState<string[]>(initialData?.images || []);

    // New Image Input State
    const [newImageUrl, setNewImageUrl] = useState("");

    // Auto-generate slug and format price for IDR if needed
    useEffect(() => {
        if (!initialData?.slug && name) {
            const autoSlug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setSlug(autoSlug);
        }

        // Clean up price for IDR upon load or currency change
        if (currency === "IDR" && price && price.toString().includes(".")) {
            const numericPrice = parseFloat(price.toString());
            if (!isNaN(numericPrice)) {
                setPrice(Math.round(numericPrice).toString());
            }
        }
    }, [name, initialData, currency, price]);

    const addImage = () => {
        if (newImageUrl.trim()) {
            setImages([...images, newImageUrl.trim()]);
            setNewImageUrl("");
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: initialData?.id,
                    name,
                    slug,
                    price,
                    stock,
                    description,
                    images
                })
            });

            if (!res.ok) throw new Error("Failed to save product");

            router.refresh();
            router.push("/dashboard/products");
        } catch (error) {
            console.error(error);
            alert("Failed to save product");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full animate-in fade-in duration-700 pb-10 px-4 space-y-6">
            <div className="flex items-center justify-between border-b border-[#2f2f2f] py-3">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/products" className="w-8 h-8 rounded hover:bg-white/5 flex items-center justify-center text-white hover:text-white transition-colors">
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            {productId ? name || "Untitled Product" : "Untitled Product"}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold hover:bg-[#1a99cc] transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-white uppercase tracking-widest opacity-50 ml-1">Product Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-0 py-1 bg-transparent border-b border-[#2f2f2f] focus:border-white transition-colors outline-none text-xl font-bold text-white placeholder:text-[#373737]"
                                placeholder="Product Name"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-white uppercase tracking-widest opacity-50 ml-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full min-h-[100px] px-0 py-1 bg-transparent border-none focus:ring-0 outline-none text-sm text-white placeholder:text-[#373737] resize-none"
                                placeholder="Add description..."
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[#2f2f2f]">
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-widest opacity-50 flex items-center mb-4">
                            Media
                        </h4>

                        <div className="flex gap-2 mb-4 max-w-lg">
                            <input
                                type="text"
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                                placeholder="Paste image link..."
                                className="flex-1 bg-white/[0.03] border border-[#2f2f2f] rounded px-3 py-1.5 text-sm text-white outline-none focus:border-gray-500 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={addImage}
                                className="px-4 py-1.5 bg-white/5 border border-[#2f2f2f] rounded text-xs font-medium hover:bg-white/10 transition-colors"
                            >
                                Add
                            </button>
                        </div>

                        {images.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative group rounded-md overflow-hidden border border-[#2f2f2f] aspect-square bg-white/[0.02]">
                                        <Image src={img} alt={`Product ${idx}`} fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="w-8 h-8 flex items-center justify-center bg-red-500/20 text-red-500 rounded hover:bg-red-500/40 transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center border border-dashed border-[#2f2f2f] rounded-lg">
                                <p className="text-white text-xs font-medium">No images uploaded yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-[11px] font-bold text-white uppercase tracking-widest opacity-50">Inventory</h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-white">Price ({symbol})</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white font-bold text-sm tracking-tighter">{symbol}</span>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-[#2f2f2f] rounded text-sm text-white focus:border-gray-500 transition-colors outline-none"
                                        placeholder="0"
                                        step={currency === "IDR" ? "1" : "0.01"}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-white">In Stock</label>
                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(Number(e.target.value))}
                                    className="w-full px-3 py-1.5 bg-white/5 border border-[#2f2f2f] rounded text-sm text-white focus:border-gray-500 transition-colors outline-none"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[#2f2f2f] space-y-4">
                        <h3 className="text-[11px] font-bold text-white uppercase tracking-widest opacity-50">Organization</h3>
                        <div className="space-y-2">
                            <label className="text-[11px] font-semibold text-white">URL Slug</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-3 py-1.5 bg-white/5 border border-[#2f2f2f] rounded text-[11px] font-mono text-white focus:border-gray-500 transition-colors outline-none"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
