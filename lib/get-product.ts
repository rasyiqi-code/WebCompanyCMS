import { db } from "./db";

export const getProduct = async (slug: string) => {
    try {
        const product = await db.product.findUnique({
            where: { slug: slug }
        });

        return product || null;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};
