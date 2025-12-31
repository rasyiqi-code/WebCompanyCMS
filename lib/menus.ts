import { db } from "./db";
import { Prisma } from "@prisma/client";

export type MenuWithItems = Prisma.MenuGetPayload<{
    include: { items: true }
}>;

export const getMenu = async (slug: string): Promise<MenuWithItems | null> => {
    const menu = await db.menu.findUnique({
        where: { slug },
        include: {
            items: {
                orderBy: { order: 'asc' }
            }
        }
    });

    // If menu doesn't exist, create it dynamically (lazy init for 'main' and 'footer')
    if (!menu && (slug === 'main' || slug === 'footer')) {
        const newMenu = await db.menu.create({
            data: {
                name: slug === 'main' ? 'Main Menu' : 'Footer Menu',
                slug
            },
            include: { items: true } // Return empty items
        });

        return newMenu;
    }

    return menu;
};

export const updateMenu = async (slug: string, items: { label: string; url: string; order: number; target?: string }[]) => {
    let menu = await getMenu(slug);

    if (!menu) {
        // should have been created by getMenu if it was a default one, otherwise create it
        const newMenu = await db.menu.create({
            data: { name: slug, slug },
            include: { items: true }
        });
        menu = newMenu;
    }

    // Transaction-like replacement
    await db.$transaction(async (tx) => {
        // Delete all items
        await tx.menuItem.deleteMany({
            where: { menuId: menu!.id }
        });

        // Insert new items
        if (items.length > 0) {
            await tx.menuItem.createMany({
                data: items.map(item => ({
                    menuId: menu!.id,
                    label: item.label,
                    url: item.url,
                    order: item.order,
                    target: item.target || "_self"
                }))
            });
        }
    });

    return getMenu(slug);
};
