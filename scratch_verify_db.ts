import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Checking database connection...");
    // Check if SiteSettings exists
    const count = await prisma.siteSettings.count();
    console.log(`Connection successful. SiteSettings count: ${count}`);
    
    if (count === 0) {
      console.log("Database is empty. You might need to run prisma db push or a seed script.");
    }
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
