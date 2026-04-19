
"use client";

import React from "react";
import Link from "next/link";
import { Edit, Trash2, CheckCircle, Quote } from "lucide-react";
import { useRouter } from "next/navigation";

type TestimonialProps = {
    id: string;
    quote: string;
    author: string;
    role?: string | null;
    isApproved?: boolean | null;
};

export default function TestimonialCard({ testimonial }: { testimonial: TestimonialProps }) {
    const router = useRouter();

    const handleApprove = async () => {
        try {
            const res = await fetch("/api/testimonials", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: testimonial.id, isApproved: true })
            });
            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to approve");
            }
        } catch (error) {
            console.error(error);
            alert("Error approving");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            const res = await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error("Failed to delete", error);
            alert("Failed to delete from server");
        }
    };

    return (
        <div className={`bg-[#202020] border border-[#2f2f2f] rounded p-4 flex flex-col h-full transition-colors group relative ${!testimonial.isApproved ? 'bg-orange-500/5' : ''}`}>
            <div className="flex justify-between items-start mb-4">
                {!testimonial.isApproved ? (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-500/5 text-orange-400 uppercase tracking-widest border border-orange-500/10">
                        Pending
                    </span>
                ) : (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/5 text-emerald-500 uppercase tracking-widest border border-emerald-500/10">
                        Visible
                    </span>
                )}

                <div className="flex gap-2">
                    {!testimonial.isApproved && (
                        <button
                            onClick={handleApprove}
                            className="p-1 text-white hover:text-emerald-500 transition-colors"
                            title="Approve"
                        >
                            <CheckCircle size={14} />
                        </button>
                    )}
                    <Link
                        href={`/dashboard/testimonials/${testimonial.id}`}
                        className="p-1 text-white hover:text-white transition-colors"
                        title="Edit"
                    >
                        <Edit size={14} />
                    </Link>
                    <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="p-1 text-white hover:text-red-500 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            <div className="flex-grow">
                <p className="text-white text-sm leading-relaxed italic">
                    &quot;{testimonial.quote}&quot;
                </p>
            </div>

            <div className="pt-4 border-t border-[#2f2f2f] mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white font-bold text-xs border border-[#2f2f2f]">
                    {testimonial.author.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h3 className="font-bold text-white text-xs">{testimonial.author}</h3>
                    <p className="text-[10px] text-white font-medium">{testimonial.role || "Client"}</p>
                </div>
            </div>
        </div>
    );
}
