
"use client";

import React from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type TestimonialProps = {
    id: string;
    quote: string;
    author: string;
    role?: string | null;
};

export default function TestimonialCard({ testimonial }: { testimonial: TestimonialProps }) {
    const router = useRouter();

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
        <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Link
                    href={`/dashboard/testimonials/${testimonial.id}`}
                    className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-blue-600"
                    title="Edit"
                >
                    <Edit size={16} />
                </Link>
                <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-red-100 hover:text-red-600"
                    title="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <p className="text-gray-600 italic mb-4 line-clamp-3">"{testimonial.quote}"</p>
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="font-bold text-gray-900">{testimonial.author}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );
}
