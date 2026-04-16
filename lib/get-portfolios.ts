import { db } from "./db";

export async function getPortfolios() {
    try {
        const items = await db.portfolioItem.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return items;
    } catch (error) {
        console.error("Error fetching portfolios:", error);
        return [];
    }
}
