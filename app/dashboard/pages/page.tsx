"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
    Loader2, 
    Plus, 
    Edit, 
    Trash2, 
    ExternalLink, 
    Layout, 
    LayoutPanelLeft, 
    FileText,
    Eye,
    Settings
} from "lucide-react";
import { useRouter } from "next/navigation";
import { 
    PageHeader,
    TableContainer,
    THead,
    TBody,
    TR,
    TH,
    TD, 
    StatusBadge, 
    ActionButton,
    TableSkeleton
} from "@/components/dashboard/ui/DataTable";

type Page = {
    id: string;
    path: string;
    title?: string;
    description?: string;
    isPublished: boolean;
    updatedAt: string;
    body?: string;
    data?: any;
    useBuilder: boolean;
};

export default function PagesDashboard() {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadPages();
    }, []);

    const loadPages = () => {
        setLoading(true);
        fetch("/api/pages")
            .then(res => res.json())
            .then(data => {
                setPages(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const getVisualBuilderPath = (path: string) => {
        return path === "/" ? "/credbuild" : `/credbuild${path}`;
    };

    const getStandardEditorPath = (path: string) => {
        return `/dashboard/pages/editor?path=${path}`;
    };

    const deletePage = async (path: string) => {
        if (!confirm(`Are you sure you want to delete ${path}?`)) return;

        try {
            const res = await fetch("/api/pages", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path })
            });

            if (res.ok) {
                loadPages();
            } else {
                alert("Failed to delete page");
            }
        } catch (e) {
            alert("Error deleting page");
        }
    };

    if (loading) return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4">
            <PageHeader 
                title="Pages" 
                subtitle="Design and structure your site's architecture with visual or standard editors."
            />
            <TableSkeleton cols={5} rows={5} />
        </div>
    );

    return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4">
            <PageHeader 
                title="Pages" 
                subtitle="Design and structure your site's architecture with visual or standard editors."
            >
                <div className="relative group">
                    <button className="flex items-center px-4 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold hover:bg-[#1a99cc] transition-all shadow-lg shadow-[#2eaadc]/10">
                        <Plus size={14} className="mr-2" />
                        Create Page
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#202020] border border-[#2f2f2f] rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                        <Link href="/dashboard/pages/editor" className="flex items-center px-4 py-3 text-xs font-bold text-white hover:bg-white/5 border-b border-[#2f2f2f] transition-colors">
                            <FileText size={14} className="mr-3 text-gray-500" /> Standard Editor
                        </Link>
                        <Link href="/credbuild" className="flex items-center px-4 py-3 text-xs font-bold text-white hover:bg-white/5 transition-colors">
                            <LayoutPanelLeft size={14} className="mr-3 text-[#2eaadc]" /> Visual Builder
                        </Link>
                    </div>
                </div>
            </PageHeader>

            <TableContainer>
                <THead>
                    <TR>
                        <TH>Interface</TH>
                        <TH>Page Identity</TH>
                        <TH>Path</TH>
                        <TH align="center">Visibility</TH>
                        <TH align="right">Actions</TH>
                    </TR>
                </THead>
                <TBody>
                    {pages.length === 0 ? (
                        <TR>
                            <TD colSpan={5} align="center" className="py-20 text-white text-xs italic">
                                No pages found in the architecture.
                            </TD>
                        </TR>
                    ) : (
                        pages.map((page) => (
                            <TR key={page.id}>
                                <TD>
                                    <div className="flex items-center">
                                        {page.useBuilder ? (
                                            <div title="Visual Builder Mode">
                                                <LayoutPanelLeft size={16} className="text-[#2eaadc]" />
                                            </div>
                                        ) : (
                                            <div title="Standard Mode">
                                                <FileText size={16} className="text-gray-500" />
                                            </div>
                                        )}
                                        <div className="ml-3">
                                            <StatusBadge 
                                                type={page.useBuilder ? "primary" : "neutral"} 
                                                label={page.useBuilder ? "Visual" : "Shell"} 
                                            />
                                        </div>
                                    </div>
                                </TD>
                                <TD>
                                    <div className="text-xs font-bold text-white tracking-tight">{page.title || "Untitled Page"}</div>
                                    <div className="text-[10px] text-gray-400 mt-0.5 max-w-[200px] truncate">{page.description || "No SEO description set"}</div>
                                </TD>
                                <TD>
                                    <code className="text-[10px] font-mono text-[#2eaadc] bg-[#2eaadc]/5 px-1.5 py-0.5 rounded border border-[#2eaadc]/10 italic">
                                        {page.path}
                                    </code>
                                </TD>
                                <TD align="center">
                                    <StatusBadge 
                                        type={page.isPublished ? "success" : "neutral"} 
                                        label={page.isPublished ? "Live" : "Draft"} 
                                    />
                                </TD>
                                <TD align="right">
                                    <div className="flex justify-end gap-3 items-center">
                                        <Link href={page.path} target="_blank" className="p-1 text-white hover:text-[#2eaadc] transition-colors" title="View Public Page">
                                            <ExternalLink size={14} />
                                        </Link>
                                        <Link href={getStandardEditorPath(page.path)} className="p-1 text-white hover:text-white transition-colors" title={page.useBuilder ? "Metadata Editor" : "Standard Editor"}>
                                            <Edit size={14} />
                                        </Link>
                                        {page.useBuilder && (
                                            <Link href={getVisualBuilderPath(page.path)} className="p-1 text-[#2eaadc] hover:text-[#2eaadc] transition-colors" title="Open Visual Builder">
                                                <LayoutPanelLeft size={14} />
                                            </Link>
                                        )}
                                        <ActionButton variant="danger" title="Delete Page" onClick={() => deletePage(page.path)}>
                                            <Trash2 size={14} />
                                        </ActionButton>
                                    </div>
                                </TD>
                            </TR>
                        ))
                    )}
                </TBody>
            </TableContainer>

            {/* Hint Section */}
            <div className="mt-8 flex items-center gap-3 px-6 py-4 bg-white/[0.02] border border-[#2f2f2f] rounded-xl text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                <Settings size={14} className="text-[#2eaadc]" />
                <span>Tip: Hover over operation icons to identify specialized editor modes.</span>
            </div>
        </div>
    );
}
