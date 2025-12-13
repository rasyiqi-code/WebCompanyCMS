
import { db } from "./db";
import { menus, menuItems } from "../db/schema";
import { eq, asc } from "drizzle-orm";

export type MenuWithItems = typeof menus.$inferSelect & {
    items: (typeof menuItems.$inferSelect)[];
};

export const getMenu = async (slug: string): Promise<MenuWithItems | null> => {
    const menu = await db.query.menus.findFirst({
        where: eq(menus.slug, slug),
        with: {
            items: {
                orderBy: asc(menuItems.order),
            },
        },
    }) as unknown as MenuWithItems | undefined;

    // If menu doesn't exist, create it dynamically (lazy init for 'main' and 'footer')
    if (!menu && (slug === 'main' || slug === 'footer')) {
        const [newMenu] = await db.insert(menus).values({
            name: slug === 'main' ? 'Main Menu' : 'Footer Menu',
            slug
        }).returning();

        return { ...newMenu, items: [] };
    }

    return menu || null;
};

export const updateMenu = async (slug: string, items: { label: string; url: string; order: number; target?: string }[]) => {
    let menu = await getMenu(slug);

    if (!menu) {
        // should have been created by getMenu if it was a default one, otherwise create it
        const [newMenu] = await db.insert(menus).values({ name: slug, slug }).returning();
        menu = { ...newMenu, items: [] };
    }

    // Transaction-like replacement: Delete all items, insert new ones
    // Transaction-like replacement: Delete all items, insert new ones
    // Note: neon-http driver doesn't support interactive transactions easily, so we do it sequentially.
    await db.delete(menuItems).where(eq(menuItems.menuId, menu!.id));

    if (items.length > 0) {
        await db.insert(menuItems).values(
            items.map(item => ({
                menuId: menu!.id,
                label: item.label,
                url: item.url,
                order: item.order,
                target: item.target || "_self"
            }))
        );
    }

    return getMenu(slug);
};
