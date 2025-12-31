import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        let allTestimonials;

        if (status === 'all') {
            allTestimonials = await db.testimonial.findMany({
                orderBy: { createdAt: 'desc' }
            });
        } else {
            allTestimonials = await db.testimonial.findMany({
                where: { isApproved: true },
                orderBy: { createdAt: 'desc' }
            });
        }

        return NextResponse.json({ success: true, testimonials: allTestimonials });
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const isAdmin = !!session?.user;

        const body = await request.json();
        const { quote, author, role, rating } = body;

        if (!quote || !author) {
            return NextResponse.json({ success: false, error: "Quote and Author are required" }, { status: 400 });
        }

        const newTestimonial = await db.testimonial.create({
            data: {
                quote,
                author,
                role: role || "",
                rating: rating || 5,
                isApproved: isAdmin, // Approve immediately if admin
                updatedAt: new Date(),
            }
        });

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
        const { id, quote, author, role, rating, isApproved } = body;

        if (!id) {
            return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
        }

        const updateData: any = {
            updatedAt: new Date(),
        };
        if (quote !== undefined) updateData.quote = quote;
        if (author !== undefined) updateData.author = author;
        if (role !== undefined) updateData.role = role;
        if (rating !== undefined) updateData.rating = rating;
        if (isApproved !== undefined) updateData.isApproved = isApproved;

        const updatedTestimonial = await db.testimonial.update({
            where: { id: id },
            data: updateData
        });

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

        await db.testimonial.delete({
            where: { id: id }
        });

        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return NextResponse.json({ success: false, error: "Failed to delete testimonial" }, { status: 500 });
    }
}
