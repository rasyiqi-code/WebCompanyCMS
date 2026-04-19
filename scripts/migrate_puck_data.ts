import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.join(process.cwd(), 'PuckPage.json');
  console.log(`Reading backup from: ${jsonPath}`);

  if (!fs.existsSync(jsonPath)) {
    console.error("Backup file not found!");
    return;
  }

  const rawData = fs.readFileSync(jsonPath, 'utf-8');
  const pages = JSON.parse(rawData);

  console.log(`Found ${pages.length} pages to migrate.`);

  for (const page of pages) {
    console.log(`Migrating page: ${page.path} (${page.title})`);

    try {
      await prisma.credBuildPage.upsert({
        where: { path: page.path },
        update: {
          title: page.title,
          description: page.description || "",
          imageUrl: page.imageUrl || "",
          body: page.body || "",
          data: page.data,
          isPublished: page.isPublished ?? true,
          useBuilder: true, // Legacy Puck pages always used builder
          updatedAt: new Date(page.updatedAt),
          createdAt: new Date(page.createdAt),
        },
        create: {
          id: page.id,
          path: page.path,
          title: page.title,
          description: page.description || "",
          imageUrl: page.imageUrl || "",
          body: page.body || "",
          data: page.data,
          isPublished: page.isPublished ?? true,
          useBuilder: true,
          updatedAt: new Date(page.updatedAt),
          createdAt: new Date(page.createdAt),
        },
      });
      console.log(`✅ Successfully migrated: ${page.path}`);
    } catch (error) {
      console.error(`❌ Failed to migrate ${page.path}:`, error);
    }
  }

  console.log("Migration finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
