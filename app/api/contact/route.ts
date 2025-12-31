import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        await db.contactSubmission.create({
            data: {
                name,
                email,
                subject,
                message,
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact Form Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        // Authenticate admin here if needed
        const submissions = await db.contactSubmission.findMany({
            orderBy: { createdAt: 'asc' }
        });
        return NextResponse.json(submissions);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
