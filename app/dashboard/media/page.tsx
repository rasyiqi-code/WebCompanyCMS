"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Copy, Upload, Image as ImageIcon, Loader2 } from "lucide-react";

type MediaItem = {
    id: string;
    filename: string;
    url: string;
    mimeType: string;
    size: number;
    createdAt: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function MediaPage() {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = () => {
        fetch("/api/media")
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        const file = e.target.files[0];

        if (file.size > MAX_FILE_SIZE) {
            alert("File too large. Max size is 5MB.");
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/media", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const error = await res.text();
                throw new Error(error || "Upload failed");
            }

            fetchMedia();
        } catch (error: any) {
            alert(error.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this image?")) return;
        setDeletingId(id);

        try {
            await fetch(`/api/media?id=${id}`, { method: "DELETE" });
            fetchMedia();
        } catch (error) {
            alert("Failed to delete image");
        } finally {
            setDeletingId(null);
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        alert("URL Copied!");
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
                    <p className="text-gray-500 mt-1">Manage your images and assets</p>
                </div>
                <div>
                    <label className={`
                        flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors
                        ${uploading ? "opacity-50 cursor-not-allowed" : ""}
                    `}>
                        {uploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                        {uploading ? "Uploading..." : "Upload Image"}
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading library...</div>
            ) : items.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No media found</h3>
                    <p className="text-gray-500">Upload your first image to get started</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                            <div className="aspect-square bg-gray-100 relative">
                                <img
                                    src={item.url}
                                    alt={item.filename}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => copyToClipboard(item.url)}
                                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                                        title="Copy URL"
                                    >
                                        <Copy size={16} className="text-gray-700" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                                        title="Delete"
                                        disabled={deletingId === item.id}
                                    >
                                        {deletingId === item.id ? (
                                            <Loader2 size={16} className="animate-spin text-red-600" />
                                        ) : (
                                            <Trash2 size={16} className="text-red-600" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-medium text-gray-900 truncate" title={item.filename}>
                                    {item.filename}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {(item.size / 1024).toFixed(1)} KB
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
