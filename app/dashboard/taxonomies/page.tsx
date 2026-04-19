
import React from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Tag, Layers } from "lucide-react";
import { db } from "../../../lib/db";
import { 
    PageHeader, 
    TableContainer, 
    THead, 
    TBody, 
    TR, 
    TH, 
    TD, 
    ActionButton,
    EmptyState
} from "@/components/dashboard/ui/DataTable";

export const dynamic = 'force-dynamic';

export default async function TaxonomiesPage() {
    const taxonomies = await db.taxonomy.findMany({
        include: {
            _count: {
                select: { terms: true }
            }
        },
        orderBy: { name: 'asc' }
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-20 px-4">
            <PageHeader 
                title="Taxonomies" 
                subtitle="Organize your content with Categories, Tags, and custom classifications."
            >
                <Link
                    href="/dashboard/taxonomies/new"
                    className="px-4 py-1.5 bg-[#2eaadc] text-white rounded-lg text-xs font-bold hover:bg-[#1a99cc] transition-colors flex items-center gap-2"
                >
                    <Plus size={14} /> New Taxonomy
                </Link>
            </PageHeader>

            <TableContainer>
                <THead>
                    <TR>
                        <TH>Name</TH>
                        <TH>Slug</TH>
                        <TH>Terms Count</TH>
                        <TH align="right">Actions</TH>
                    </TR>
                </THead>
                <TBody>
                    {taxonomies.length === 0 ? (
                        <TR>
                            <TD colSpan={4} className="p-0 border-none">
                                <EmptyState 
                                    icon={<Layers size={32} />} 
                                    message="No taxonomies defined yet. Start by creating 'Category' or 'Tag'." 
                                />
                            </TD>
                        </TR>
                    ) : (
                        taxonomies.map((tax) => (
                            <TR key={tax.id}>
                                <TD>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-md bg-[#2eaadc]/10 border border-[#2eaadc]/20 flex items-center justify-center text-[#2eaadc]">
                                            <Tag size={14} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white tracking-tight">{tax.name}</div>
                                            <div className="text-[10px] text-gray-400 font-medium">{tax.description || "No description"}</div>
                                        </div>
                                    </div>
                                </TD>
                                <TD className="text-xs font-mono text-gray-400">
                                    {tax.slug}
                                </TD>
                                <TD className="text-sm text-white font-bold">
                                    {tax._count.terms} terms
                                </TD>
                                <TD align="right">
                                    <div className="flex justify-end gap-3 items-center">
                                        <Link 
                                            href={`/dashboard/taxonomies/${tax.id}/terms`} 
                                            className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-white hover:bg-white/10 transition-all"
                                        >
                                            Manage Terms
                                        </Link>
                                        <Link href={`/dashboard/taxonomies/${tax.id}`} className="p-1 text-white hover:text-[#2eaadc] transition-colors">
                                            <Edit size={14} />
                                        </Link>
                                        <ActionButton variant="danger">
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
