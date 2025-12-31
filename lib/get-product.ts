import { db } from "./db";

export const getProduct = async (slug: string) => {
    const product = await db.product.findUnique({
        where: { slug: slug }
    });

    return product || null;
};
