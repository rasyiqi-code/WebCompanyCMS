
"use client";

import React from "react";
import Link from "next/link";
import { Edit, Trash2, CheckCircle } from "lucide-react";
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
                router.refresh(); // Reload server component data
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error("Failed to delete", error);
            alert("Failed to delete from server");
        }
    };

    return (
        <div className={`bg-white border rounded-xl shadow-sm hover:shadow-md transition flex flex-col h-full ${!testimonial.isApproved ? 'border-yellow-300 bg-yellow-50/50' : 'border-gray-100'}`}>
            <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    {!testimonial.isApproved ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                            PENDING REVIEW
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            VISIBLE
                        </span>
                    )}

                    <div className="flex gap-1">
                        {!testimonial.isApproved && (
                            <button
                                onClick={handleApprove}
                                className="p-1.5 bg-white border border-green-200 text-green-600 rounded-lg hover:bg-green-50 transition shadow-sm"
                                title="Approve"
                            >
                                <CheckCircle size={16} />
                            </button>
                        )}
                        <Link
                            href={`/dashboard/testimonials/${testimonial.id}`}
                            className="p-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition shadow-sm"
                            title="Edit"
                        >
                            <Edit size={16} />
                        </Link>
                        <button
                            onClick={() => handleDelete(testimonial.id)}
                            className="p-1.5 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition shadow-sm"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex-grow">
                    <p className="text-gray-600 italic mb-6 line-clamp-4 relative">
                        <span className="text-gray-300 absolute -top-2 -left-2 text-2xl font-serif">"</span>
                        <span className="relative z-10">{testimonial.quote}</span>
                    </p>
                </div>

                <div className="pt-4 border-t border-gray-100/50 mt-auto flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {testimonial.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm">{testimonial.author}</h3>
                        <p className="text-xs text-gray-500">{testimonial.role || "Member"}</p>
                    </div>
                </div>
            </div>
        </div>
    );

}
