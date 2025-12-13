
import { db } from "./lib/db";
import { puckPages } from "./db/schema";
import { desc } from "drizzle-orm";

async function checkPages() {
    console.log("Checking pages...");
    const pages = await db.select().from(puckPages).orderBy(desc(puckPages.updatedAt));
    console.log(JSON.stringify(pages, null, 2));
    process.exit(0);
}

checkPages();
