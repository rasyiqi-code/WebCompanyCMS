import React from "react";
import Link from "next/link";
import { Plus, ExternalLink, MessageSquare } from "lucide-react";
import { db } from "../../../lib/db";
import TestimonialCard from "./TestimonialCard";
import { 
    PageHeader,
    EmptyState
} from "@/components/dashboard/ui/DataTable";

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
    const allTestimonials = await db.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4">
            <PageHeader 
                title="Testimonials" 
                subtitle="Curate and showcase client voices and success stories."
            >
                <Link
                    href="/dashboard/testimonials/new"
                    className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold hover:bg-[#1a99cc] transition-colors"
                >
                    New Entry
                </Link>
            </PageHeader>

            <div className="bg-[#202020] border border-[#2f2f2f] rounded p-4 mb-8 flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center flex-shrink-0 border border-[#2f2f2f]">
                    <ExternalLink className="text-white" size={14} />
                </div>
                <div>
                    <h3 className="font-bold text-white text-sm mb-1 tracking-tight">Public Submission Link</h3>
                    <p className="text-white text-xs mb-3">Copy this link for your clients to submit their testimonials:</p>
                    <div className="inline-flex items-center px-2 py-1 bg-white/5 rounded border border-[#2f2f2f] text-white font-mono text-[10px]">
                        {process.env.NEXT_PUBLIC_APP_URL || "https://univedpress.id"}/submit-testimonial
                    </div>
                </div>
            </div>

            {
                allTestimonials.length === 0 ? (
                    <EmptyState 
                        icon={<MessageSquare size={32} />} 
                        message="No client voices detected. Ready to curate your first success story?" 
                    />
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {allTestimonials.map((item) => (
                            <TestimonialCard key={item.id} testimonial={item} />
                        ))}
                    </div>
                )
            }
        </div >
    );
}
