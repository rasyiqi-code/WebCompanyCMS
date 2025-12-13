
import "dotenv/config";
import { db } from "../lib/db";
import { puckPages } from "../db/schema";
import { eq } from "drizzle-orm";

async function main() {
    console.log("Reading Puck Page: /gallery");
    const [page] = await db.select().from(puckPages).where(eq(puckPages.path, "/gallery"));

    if (!page) {
        console.error("Page not found");
        process.exit(1);
    }

    const data = page.data as any;
    console.log("Root content:", JSON.stringify(data.content, null, 2));

    const ids = new Set();
    const duplicates = [];

    data.content?.forEach((item: any) => {
        console.log(`Item ID: ${item.props.id} (Type: ${item.type})`);
        if (!item.props.id || ids.has(item.props.id)) {
            duplicates.push(item.props.id || "MISSING");
        }
        if (item.props.id) ids.add(item.props.id);
    });

    if (duplicates.length > 0) {
        console.error("❌ Issues found (Duplicates/Missing):", duplicates);

        // Auto-fix
        console.log("🛠️ Fixing content IDs...");
        const newContent = data.content.map((item: any) => {
            if (!item.props.id || duplicates.includes(item.props.id)) {
                const newId = `fixed-${Math.random().toString(36).substr(2, 9)}`;
                return { ...item, props: { ...item.props, id: item.props.id || newId } };
            }
            return item;
        });

        await db.update(puckPages)
            .set({ data: { ...data, content: newContent } })
            .where(eq(puckPages.path, "/gallery"));

        console.log("✅ Content fixed. Page updated.");
    } else {
        console.log("✅ No duplicates found in root content.");
    }

    process.exit(0);
}

main().catch(console.error);
