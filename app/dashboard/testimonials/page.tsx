import React from "react";
import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";
import { db } from "../../../lib/db";
import { testimonials } from "../../../db/schema";
import { desc } from "drizzle-orm";
import TestimonialCard from "./TestimonialCard";

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
    const allTestimonials = await db.select()
        .from(testimonials)
        .orderBy(desc(testimonials.createdAt));

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
                    <p className="text-gray-500 mt-1">Manage what people say about you.</p>
                </div>
                <Link
                    href="/dashboard/testimonials/new"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    Add Testimonial
                </Link>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
                <ExternalLink className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                <div>
                    <h3 className="font-semibold text-blue-900">Public Submission Link</h3>
                    <p className="text-blue-700 text-sm mb-2">Share this link with your clients to collect testimonials:</p>
                    <a
                        href="/submit-testimonial"
                        target="_blank"
                        className="text-blue-600 font-medium hover:underline break-all"
                    >
                        {process.env.NEXT_PUBLIC_APP_URL || "https://univedpress.id"}/submit-testimonial
                    </a>
                </div>
            </div>

            {
                allTestimonials.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                        <p className="text-gray-400 mb-4">No testimonials yet.</p>
                        <Link href="/dashboard/testimonials/new" className="text-blue-600 font-medium hover:underline">
                            Create your first one
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {allTestimonials.map((item) => (
                            <TestimonialCard key={item.id} testimonial={item} />
                        ))}
                    </div>
                )
            }
        </div >
    );
}
