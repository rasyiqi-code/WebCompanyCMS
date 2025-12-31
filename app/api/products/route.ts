
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const isAdminOrEditor = session?.user?.role === "admin" || session?.user?.role === "editor";

        const { searchParams } = new URL(req.url);
        const includeArchived = searchParams.get("includeArchived") === "true";

        const whereCondition = (isAdminOrEditor && includeArchived) ? {} : { isArchived: false };

        const allProducts = await db.product.findMany({
            where: whereCondition,
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ products: allProducts });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, isArchived } = body;

        if (!id) {
            return NextResponse.json({ error: "Product ID required" }, { status: 400 });
        }

        const product = await db.product.update({
            where: { id },
            data: { isArchived }
        });

        return NextResponse.json({ success: true, product });
    } catch (error) {
        console.error("Error archiving product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, slug, description, price, stock, images, productId } = body;

        // Validation
        if (!name || !slug || !price) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let product;

        if (productId) {
            // Update
            product = await db.product.update({
                where: { id: productId },
                data: {
                    name,
                    slug,
                    description,
                    price,
                    stock: stock || 0,
                    images: images || [],
                    updatedAt: new Date()
                }
            });
        } else {
            // Create
            product = await db.product.create({
                data: {
                    name,
                    slug,
                    description,
                    price,
                    stock: stock || 0,
                    images: images || [],
                    updatedAt: new Date()
                }
            });
        }

        return NextResponse.json({ success: true, product });

    } catch (error) {
        console.error("Error saving product:", error);
        return NextResponse.json({ error: "Failed to save product" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("id");

        if (!productId) {
            return NextResponse.json({ error: "Product ID required" }, { status: 400 });
        }

        await db.product.delete({
            where: { id: productId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting product FULL DETAILS:", error);
        // @ts-ignore
        if (error.code === 'P2003') {
            return NextResponse.json({ error: "Cannot delete product because it is part of an existing order." }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to delete product: " + (error as Error).message }, { status: 500 });
    }
}
