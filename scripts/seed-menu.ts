
import "dotenv/config";
import { db } from "../lib/db";
import { menus, menuItems } from "../db/schema";
import { eq } from "drizzle-orm";

async function main() {
    console.log("Seeding Menu Items...");

    // 1. Ensure 'main' menu exists
    let [mainMenu] = await db.select().from(menus).where(eq(menus.slug, "main"));

    if (!mainMenu) {
        console.log("Creating 'main' menu...");
        [mainMenu] = await db.insert(menus).values({
            name: "Main Menu",
            slug: "main",
        }).returning();
    } else {
        console.log("Found 'main' menu.");
    }

    // 2. Define Items
    const items = [
        { label: "Home", url: "/", order: 1 },
        { label: "Shop", url: "/shop", order: 2 },
        { label: "Portfolio", url: "/portfolio", order: 3 },
        { label: "Gallery", url: "/gallery", order: 4 },
        { label: "Blog", url: "/blog", order: 5 },
    ];

    // 3. Upsert Items
    for (const item of items) {
        // Check availability by label + menuId (simple check)
        const [existing] = await db.select().from(menuItems).where(
            eq(menuItems.menuId, mainMenu.id)
        );

        // Actually, let's just delete all and recreate for simplicity in this seed, 
        // OR better: check by URL to avoid duplicates.

        // Cleanest: Check if URL exists in this menu
        const existingItems = await db.select().from(menuItems)
            .where(eq(menuItems.menuId, mainMenu.id));

        const match = existingItems.find(i => i.url === item.url);

        if (match) {
            console.log(`Updating ${item.label}...`);
            await db.update(menuItems)
                .set({ label: item.label, order: item.order })
                .where(eq(menuItems.id, match.id));
        } else {
            console.log(`Creating ${item.label}...`);
            await db.insert(menuItems).values({
                menuId: mainMenu.id,
                label: item.label,
                url: item.url,
                order: item.order,
                target: "_self"
            });
        }
    }

    console.log("✅ Menu seeded successfully.");
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
