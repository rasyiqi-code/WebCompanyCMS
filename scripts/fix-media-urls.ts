
import "dotenv/config";
import { db } from "../lib/db";
import { mediaItems } from "../db/schema";
import { ilike, sql } from "drizzle-orm";

const OLD_DOMAIN = "pub-3c6b106d036a4bb1a51d79d4cfff2015.r2.dev";
const NEW_DOMAIN = "cdn.univedpress.id";

async function main() {
    console.log(`Migrating URLs from ${OLD_DOMAIN} to ${NEW_DOMAIN}...`);

    // Postgres specific replacement
    const result = await db.execute(sql`
        UPDATE "MediaItem"
        SET url = REPLACE(url, ${OLD_DOMAIN}, ${NEW_DOMAIN})
        WHERE url LIKE ${'%' + OLD_DOMAIN + '%'}
    `);

    console.log("Migration complete.");
    process.exit(0);
}

main().catch(console.error);
