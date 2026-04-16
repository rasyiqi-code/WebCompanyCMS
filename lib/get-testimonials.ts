import { db } from "./db";

export async function getTestimonials() {
    try {
        const testimonials = await db.testimonial.findMany({
            where: {
                isApproved: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return testimonials;
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
}
