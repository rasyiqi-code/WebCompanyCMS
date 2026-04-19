
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
    Trash2, Copy, Upload, Image as ImageIcon, Loader2, Plus, 
    Folder, FolderPlus, ChevronRight, ArrowLeft 
} from "lucide-react";
import { 
    PageHeader, 
    CardSkeleton,
    EmptyState
} from "@/components/dashboard/ui/DataTable";

type MediaItem = {
    id: string;
    filename: string;
    url: string;
    mimeType: string;
    size: number;
    createdAt: string;
    folderId?: string | null;
};

type MediaFolder = {
    id: string;
    name: string;
    parentId?: string | null;
    _count?: {
        items: number;
        children: number;
    };
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function MediaPage() {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [folders, setFolders] = useState<MediaFolder[]>([]);
    const [currentFolderId, setCurrentFolderId] = useState<string>("root");
    const [path, setPath] = useState<MediaFolder[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    useEffect(() => {
        fetchContent();
    }, [currentFolderId]);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const folderParam = currentFolderId === "root" ? "root" : currentFolderId;
            
            // Fetch Folders
            const foldersRes = await fetch(`/api/media/folders?parentId=${currentFolderId === "root" ? "" : currentFolderId}`);
            const foldersData = await foldersRes.json();
            setFolders(foldersData);

            // Fetch Items
            const itemsRes = await fetch(`/api/media?folderId=${folderParam}`);
            const itemsData = await itemsRes.json();
            setItems(itemsData);

            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch media content", error);
            setLoading(false);
        }
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
        if (currentFolderId !== "root") {
            formData.append("folderId", currentFolderId);
        }

        try {
            const res = await fetch("/api/media", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const error = await res.text();
                throw new Error(error || "Upload failed");
            }

            fetchContent();
        } catch (error: any) {
            alert(error.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleCreateFolder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFolderName.trim()) return;

        try {
            const res = await fetch("/api/media/folders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newFolderName,
                    parentId: currentFolderId === "root" ? null : currentFolderId
                }),
            });

            if (res.ok) {
                setNewFolderName("");
                setIsCreatingFolder(false);
                fetchContent();
            }
        } catch (error) {
            alert("Failed to create folder");
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!confirm("Delete this image?")) return;
        setDeletingId(id);

        try {
            await fetch(`/api/media?id=${id}`, { method: "DELETE" });
            fetchContent();
        } catch (error) {
            alert("Failed to delete image");
        } finally {
            setDeletingId(null);
        }
    };

    const handleDeleteFolder = async (id: string) => {
        if (!confirm("Delete this folder? It must be empty.")) return;
        try {
            const res = await fetch(`/api/media/folders?id=${id}`, { method: "DELETE" });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to delete");
            }
            fetchContent();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const navigateToFolder = (folder: MediaFolder) => {
        setPath([...path, folder]);
        setCurrentFolderId(folder.id);
    };

    const navigateBack = () => {
        const newPath = [...path];
        newPath.pop();
        setPath(newPath);
        const parent = newPath[newPath.length - 1];
        setCurrentFolderId(parent ? parent.id : "root");
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        alert("URL Copied!");
    };

    return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4">
            <PageHeader 
                title="Media Library 2.0" 
                subtitle="Organize your assets in folders for better content management."
            >
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsCreatingFolder(true)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-white rounded hover:bg-white/10 transition-colors font-bold text-xs"
                    >
                        <FolderPlus size={14} /> New Folder
                    </button>
                    <label className={`
                        inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-[#2eaadc] text-white rounded cursor-pointer hover:bg-[#1a99cc] transition-colors font-bold text-xs
                        ${uploading ? "opacity-50 cursor-not-allowed" : ""}
                    `}>
                        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                        {uploading ? "Uploading..." : "Upload Media"}
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                </div>
            </PageHeader>

            {/* Breadcrumbs / Navigation */}
            <div className="flex items-center gap-2 mb-6 py-2 px-1 border-b border-[#2f2f2f]/50">
                <button 
                    onClick={() => { setPath([]); setCurrentFolderId("root"); }}
                    className={`text-xs font-bold uppercase tracking-widest hover:text-[#2eaadc] transition-colors ${currentFolderId === "root" ? "text-[#2eaadc]" : "text-gray-500"}`}
                >
                    Library
                </button>
                {path.map((p, i) => (
                    <React.Fragment key={p.id}>
                        <ChevronRight size={12} className="text-gray-700" />
                        <button 
                            onClick={() => {
                                const newPath = path.slice(0, i + 1);
                                setPath(newPath);
                                setCurrentFolderId(p.id);
                            }}
                            className={`text-xs font-bold uppercase tracking-widest hover:text-[#2eaadc] transition-colors ${currentFolderId === p.id ? "text-[#2eaadc]" : "text-gray-500"}`}
                        >
                            {p.name}
                        </button>
                    </React.Fragment>
                ))}
            </div>

            {isCreatingFolder && (
                <form onSubmit={handleCreateFolder} className="mb-8 p-4 bg-[#202020] border border-[#2eaadc]/30 rounded-xl flex gap-3 animate-in slide-in-from-top-2 duration-300">
                    <input 
                        autoFocus
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="Folder Name"
                        className="flex-1 bg-black/20 border border-white/10 rounded px-3 py-1.5 text-xs text-white outline-none focus:border-[#2eaadc]/50"
                    />
                    <button type="submit" className="px-4 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold">Create</button>
                    <button type="button" onClick={() => setIsCreatingFolder(false)} className="px-4 py-1.5 bg-white/5 text-white rounded text-xs font-bold">Cancel</button>
                </form>
            )}

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            ) : (folders.length === 0 && items.length === 0) ? (
                <EmptyState 
                    icon={currentFolderId === "root" ? <ImageIcon size={32} /> : <Folder size={32} />} 
                    message={currentFolderId === "root" ? "Media library is empty." : "This folder is currently empty."} 
                />
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {/* Folders */}
                    {folders.map((folder) => (
                        <div 
                            key={folder.id} 
                            onDoubleClick={() => navigateToFolder(folder)}
                            className="group relative bg-[#202020] rounded-xl border border-[#2f2f2f] hover:border-[#2eaadc]/50 transition-all cursor-pointer p-4 overflow-hidden"
                        >
                            <div className="flex flex-col items-center gap-3 py-2">
                                <div className="w-12 h-12 bg-[#2eaadc]/10 rounded-full flex items-center justify-center text-[#2eaadc] group-hover:scale-110 transition-transform">
                                    <Folder size={24} fill="currentColor" fillOpacity={0.2} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-white truncate max-w-[120px]">{folder.name}</p>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tight mt-0.5">
                                        {folder._count?.items || 0} Files
                                    </p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder.id); }}
                                className="absolute top-2 right-2 p-1 text-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}

                    {/* Media Items */}
                    {items.map((item) => (
                        <div key={item.id} className="group relative bg-[#202020] rounded border border-[#2f2f2f] overflow-hidden transition-all">
                            <div className="aspect-square bg-white/[0.02] relative overflow-hidden">
                                <Image
                                    src={item.url}
                                    alt={item.filename}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => copyToClipboard(item.url)}
                                        className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                                        title="Copy URL"
                                    >
                                        <Copy size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="w-8 h-8 flex items-center justify-center bg-red-500/80 hover:bg-red-500 text-white rounded transition-colors"
                                        title="Delete"
                                        disabled={deletingId === item.id}
                                    >
                                        {deletingId === item.id ? (
                                            <Loader2 size={14} className="animate-spin" />
                                        ) : (
                                            <Trash2 size={14} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-[11px] font-medium text-white truncate" title={item.filename}>
                                    {item.filename}
                                </p>
                                <p className="text-[9px] text-white font-medium">
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
