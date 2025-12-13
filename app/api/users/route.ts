
import { db } from "@/lib/db";
import { users, posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const allUsers = await db.select().from(users);
        return NextResponse.json({ users: allUsers });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

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
            password: "change-me", // Set a default password or handle via email invite in real world
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
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { userId, role, name, email, password } = body;

        // Construct update object dynamically
        const updateData: any = {};
        if (role) updateData.role = role;
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password && password.trim() !== "") {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await db.update(users)
            .set(updateData)
            .where(eq(users.id, userId));

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("id");

        if (!userId) {
            return new NextResponse("User ID required", { status: 400 });
        }

        // Prevent deleting self
        if (userId === session.user.id) {
            return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
        }

        // Manually cascade delete posts (since schema doesn't have cascade)
        await db.delete(posts).where(eq(posts.authorId, userId));

        // Delete user (Accounts/Sessions will cascade automatically per schema)
        await db.delete(users).where(eq(users.id, userId));

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("Delete User Error:", e);
        return NextResponse.json({ error: "Failed to delete user. Check server logs." }, { status: 500 });
    }
}
