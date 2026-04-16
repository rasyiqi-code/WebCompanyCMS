import { db } from "./db";

export async function getGalleryItems() {
    try {
        const items = await db.galleryItem.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return items;
    } catch (error) {
        console.error("Error fetching gallery items:", error);
        return [];
    }
}
