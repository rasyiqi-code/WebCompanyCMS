import React from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Globe } from "lucide-react";
import { db } from "../../../lib/db";
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
    EmptyState
} from "@/components/dashboard/ui/DataTable";

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
    const allPosts = await db.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            author: {
                select: { name: true }
            }
        }
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-20 px-4">
            <PageHeader 
                title="Blog Posts" 
                subtitle="Draft, publish and manage your site content."
            >
                <Link
                    href="/dashboard/posts/new"
                    className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold hover:bg-[#1a99cc] transition-colors"
                >
                    New Article
                </Link>
            </PageHeader>

            <TableContainer>
                <THead>
                    <TR>
                        <TH>Title</TH>
                        <TH>Status</TH>
                        <TH>Date</TH>
                        <TH align="right">Actions</TH>
                    </TR>
                </THead>
                <TBody>
                    {allPosts.length === 0 ? (
                        <TR>
                            <TD colSpan={4} className="p-0 border-none">
                                <EmptyState 
                                    icon={<Globe size={32} />} 
                                    message="No articles found. Ready to draft your first masterpiece?" 
                                />
                            </TD>
                        </TR>
                    ) : (
                        allPosts.map((post) => (
                            <TR key={post.id}>
                                <TD>
                                    <div className="text-sm font-bold text-white tracking-tight">{post.title}</div>
                                    <div className="text-[10px] text-gray-400 mt-0.5 font-mono">/{post.slug}</div>
                                </TD>
                                <TD>
                                    <StatusBadge 
                                        type={post.published ? "success" : "neutral"} 
                                        label={post.published ? "Live" : "Draft"} 
                                    />
                                </TD>
                                <TD className="text-xs text-white">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </TD>
                                <TD align="right">
                                    <div className="flex justify-end gap-3 items-center">
                                        <Link href={`/dashboard/posts/${post.id}`} className="p-1 text-white hover:text-[#2eaadc] transition-colors" title="Edit Article">
                                            <Edit size={14} />
                                        </Link>
                                        <ActionButton variant="danger" title="Delete Article">
                                            <Trash2 size={14} />
                                        </ActionButton>
                                    </div>
                                </TD>
                            </TR>
                        ))
                    )}
                </TBody>
            </TableContainer>
        </div>
    );
}
