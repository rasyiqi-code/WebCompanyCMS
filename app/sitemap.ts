
import { MetadataRoute } from 'next';
import { db } from '../lib/db';
import { puckPages, products, posts } from '../db/schema';
import { desc, eq } from 'drizzle-orm';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
        return [];
    }

    // Fetch all published pages
    const pagesData = await db.select({
        path: puckPages.path,
        updatedAt: puckPages.updatedAt,
    })
        .from(puckPages)
        .where(eq(puckPages.isPublished, true))
        .orderBy(desc(puckPages.updatedAt));

    const pages = pagesData.map((page) => ({
        url: `${baseUrl}/page${page.path}`,
        lastModified: page.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Add static routes
    const routes = [
        '',
        '/dashboard/login',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    return [...routes, ...pages];
}
