import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const siteSettings = await prisma.siteSettings.count();
    const posts = await prisma.post.count();
    const products = await prisma.product.count();
    const credBuildPages = await prisma.credBuildPage.count();
    const users = await prisma.user.count();
    const menus = await prisma.menu.count();

    console.log("Database Stats:");
    console.log(`- SiteSettings: ${siteSettings}`);
    console.log(`- Posts: ${posts}`);
    console.log(`- Products: ${products}`);
    console.log(`- CredBuildPages: ${credBuildPages}`);
    console.log(`- Users: ${users}`);
    console.log(`- Menus: ${menus}`);
  } catch (error) {
    console.error("Failed to gather stats:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
