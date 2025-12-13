
import { db } from "./db";
import { products } from "../db/schema";
import { eq } from "drizzle-orm";

export const getProduct = async (slug: string) => {
    const [product] = await db.select()
        .from(products)
        .where(eq(products.slug, slug))
        .limit(1);

    return product || null;
};
