
import { db } from "@/lib/db";
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

        const allUsers = await db.user.findMany();
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
        const existingUser = await db.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: "change-me", // Set a default password or handle via email invite in real world
                role: role || 'user',
                image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=random`
            }
        });

        return NextResponse.json({ success: true, user: newUser });
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

        await db.user.update({
            where: { id: userId },
            data: updateData
        });

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
        await db.post.deleteMany({
            where: { authorId: userId }
        });

        // Delete user (Accounts/Sessions will cascade automatically per schema)
        await db.user.delete({
            where: { id: userId }
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("Delete User Error:", e);
        return NextResponse.json({ error: "Failed to delete user. Check server logs." }, { status: 500 });
    }
}
