
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { products } from "../../../db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(req: Request) {
    try {
        const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
        return NextResponse.json({ products: allProducts });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
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
            [product] = await db.update(products)
                .set({
                    name,
                    slug,
                    description,
                    price,
                    stock: stock || 0,
                    images: images || [],
                    updatedAt: new Date()
                })
                .where(eq(products.id, productId))
                .returning();
        } else {
            // Create
            [product] = await db.insert(products).values({
                name,
                slug,
                description,
                price,
                stock: stock || 0,
                images: images || [],
                updatedAt: new Date()
            }).returning();
        }

        return NextResponse.json({ success: true, product });

    } catch (error) {
        console.error("Error saving product:", error);
        return NextResponse.json({ error: "Failed to save product" }, { status: 500 });
    }
}
