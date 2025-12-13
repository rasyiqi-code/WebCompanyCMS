
import "dotenv/config";
import { db } from "../lib/db";
import { mediaItems } from "../db/schema";
import { desc } from "drizzle-orm";

async function main() {
    console.log("Fetching media items...");
    const items = await db.select().from(mediaItems).orderBy(desc(mediaItems.createdAt)).limit(5);
    items.forEach(item => {
        console.log(`ID: ${item.id}`);
        console.log(`Filename: ${item.filename}`);
        console.log(`URL: ${item.url}`);
        console.log("---");
    });
    process.exit(0);
}

main().catch(console.error);
