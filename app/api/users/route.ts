
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const allUsers = await db.select().from(users);
        return NextResponse.json({ users: allUsers });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, role } = body;

        // Basic validation
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.email, email));
        if (existingUser.length > 0) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const newUser = await db.insert(users).values({
            name,
            email,
            role: role || 'user',
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=random`
        }).returning();

        return NextResponse.json({ success: true, user: newUser[0] });
    } catch (error) {
        console.error("Create User Error:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { userId, role } = body;

        await db.update(users)
            .set({ role })
            .where(eq(users.id, userId));

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
