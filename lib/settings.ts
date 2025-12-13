
import { db } from "./db";
import { siteSettings } from "../db/schema";
import { eq } from "drizzle-orm";

export type SiteSettings = typeof siteSettings.$inferSelect;
export type SiteSettingsUpdate = Partial<Omit<SiteSettings, "id" | "updatedAt">>;

export const getSiteSettings = async (): Promise<SiteSettings> => {
    const [settings] = await db.select().from(siteSettings).limit(1);
    if (settings) return settings;

    // Create default settings if none exist
    const [newSettings] = await db.insert(siteSettings).values({
        siteName: "My Awesome Site",
        description: "Welcome to my website",
        footerCopyright: `© ${new Date().getFullYear()} All Rights Reserved.`,
    }).returning();

    return newSettings;
};

export const updateSiteSettings = async (data: SiteSettingsUpdate) => {
    const current = await getSiteSettings();

    const [updated] = await db.update(siteSettings)
        .set({
            ...data,
            updatedAt: new Date(),
        })
        .where(eq(siteSettings.id, current.id))
        .returning();

    return updated;
};
