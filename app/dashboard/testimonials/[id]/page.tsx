
import React from "react";
import TestimonialEditor from "../TestimonialEditor";
import { db } from "../../../../lib/db";
import { testimonials } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Handle "new" route
    if (id === "new") {
        return <TestimonialEditor />;
    }

    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);

    if (!testimonial) {
        return notFound();
    }

    return (
        <TestimonialEditor
            isEditMode
            initialData={{
                id: testimonial.id,
                quote: testimonial.quote,
                author: testimonial.author,
                role: testimonial.role || "",
                rating: testimonial.rating || 5
            }}
        />
    );
}
