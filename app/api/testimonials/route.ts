
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { testimonials } from "../../../db/schema";
import { desc, eq } from "drizzle-orm";
import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
    try {
        const allTestimonials = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
        return NextResponse.json({ success: true, testimonials: allTestimonials });
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        console.log("DEBUG: Testimonials API Session:", JSON.stringify(session, null, 2));

        // Check if user is admin or editor - for now simple check
        // if (!session?.user) {
        //    console.log("DEBUG: Unauthorized access attempt. Session is null or user missing.");
        //    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        // }

        const body = await request.json();
        const { quote, author, role, rating } = body;

        if (!quote || !author) {
            return NextResponse.json({ success: false, error: "Quote and Author are required" }, { status: 400 });
        }

        const [newTestimonial] = await db.insert(testimonials).values({
            quote,
            author,
            role: role || "",
            rating: rating || 5,
            updatedAt: new Date(),
        }).returning();

        return NextResponse.json({ success: true, testimonial: newTestimonial });
    } catch (error) {
        console.error("Error creating testimonial:", error);
        return NextResponse.json({ success: false, error: "Failed to create testimonial" }, { status: 500 });
    }
}

// PUT (Update)
export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        // if (!session?.user) {
        //    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        // }

        const body = await request.json();
        const { id, quote, author, role, rating } = body;

        if (!id || !quote || !author) {
            return NextResponse.json({ success: false, error: "ID, Quote and Author are required" }, { status: 400 });
        }

        const [updatedTestimonial] = await db.update(testimonials)
            .set({
                quote,
                author,
                role: role || "",
                rating: rating || 5,
                updatedAt: new Date(),
            })
            .where(eq(testimonials.id, id))
            .returning();

        return NextResponse.json({ success: true, testimonial: updatedTestimonial });
    } catch (error) {
        console.error("Error updating testimonial:", error);
        return NextResponse.json({ success: false, error: "Failed to update testimonial" }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        // if (!session?.user) {
        //    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        // }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: "Testimonial ID is required" }, { status: 400 });
        }

        await db.delete(testimonials).where(eq(testimonials.id, id));

        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return NextResponse.json({ success: false, error: "Failed to delete testimonial" }, { status: 500 });
    }
}
