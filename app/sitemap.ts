
import { MetadataRoute } from 'next';
import { db } from '../lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
        return [];
    }

    // Fetch all published pages
    const pagesData = await db.puckPage.findMany({
        where: { isPublished: true },
        orderBy: { updatedAt: 'desc' },
        select: {
            path: true,
            updatedAt: true
        }
    });

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
