import "dotenv/config";
import { db } from "@/lib/db";

const portfolioData = {
    content: [
        {
            type: "Portfolio",
            props: {
                title: "Our Work",
                subtitle: "Check out our latest projects",
                items: [
                    { title: "Project Alpha", category: "Web", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format", link: "#" },
                    { title: "Project Beta", category: "App", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format", link: "#" },
                    { title: "Project Gamma", category: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format", link: "#" },
                ]
            }
        }
    ],
    root: { props: { title: "Portfolio" } }
};

const galleryData = {
    content: [
        {
            type: "Gallery",
            props: {
                title: "Photo Gallery",
                variant: "white",
                scrollMode: "grid",
                columnsDesktop: 4,
                columnsTablet: 3,
                columnsMobile: 2,
                items: [
                    { title: "Moments 1", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format" },
                    { title: "Moments 2", image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format" },
                    { title: "Moments 3", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format" },
                    { title: "Moments 4", image: "https://images.unsplash.com/photo-1502086223501-63582103855d?auto=format" },
                ]
            }
        }
    ],
    root: { props: { title: "Gallery" } }
};

async function seed() {
    console.log("Seeding Content...");

    // 1. Upsert Pages
    const pages = [
        { path: "/portfolio", title: "Portfolio", data: portfolioData },
        { path: "/gallery", title: "Gallery", data: galleryData },
    ];

    for (const page of pages) {
        const existing = await db.puckPage.findUnique({
            where: { path: page.path }
        });
        if (!existing) {
            await db.puckPage.create({
                data: { ...page, data: page.data as any }
            });
            console.log(`Created page: ${page.path}`);
        } else {
            console.log(`Page already exists: ${page.path}`);
        }
    }

    // 2. Add to Main Menu
    let mainMenu = await db.menu.findUnique({
        where: { slug: "main" }
    });

    if (!mainMenu) {
        console.log("Creating 'main' menu...");
        mainMenu = await db.menu.create({
            data: { name: "Main Menu", slug: "main" }
        });
    }

    const menuLinks = [
        { label: "Portfolio", url: "/portfolio", order: 2 },
        { label: "Gallery", url: "/gallery", order: 3 },
    ];

    for (const link of menuLinks) {
        const existingItem = await db.menuItem.findFirst({
            where: {
                menuId: mainMenu.id,
                url: link.url
            }
        });

        if (!existingItem) {
            await db.menuItem.create({
                data: {
                    menuId: mainMenu.id,
                    label: link.label,
                    url: link.url,
                    order: link.order
                }
            });
            console.log(`Added menu link: ${link.label}`);
        } else {
            console.log(`Menu link already exists: ${link.label}`);
        }
    }

    console.log("Seeding complete.");
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
