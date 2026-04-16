
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkMenus() {
    console.log("--- Menus ---");
    const menus = await prisma.menu.findMany({
        include: { items: true }
    });
    console.log(JSON.stringify(menus, null, 2));

    console.log("\n--- Site Settings ---");
    const settings = await prisma.siteSettings.findFirst();
    console.log(JSON.stringify(settings, null, 2));
}

checkMenus()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
