import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Testing connection...");
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("Connection successful:", result);
  } catch (e) {
    console.error("Connection failed:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
