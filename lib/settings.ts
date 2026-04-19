import { db } from "./db";
import { Prisma } from "@prisma/client";

export interface SiteSettings {
    id: string;
    siteName: string | null;
    tagline: string | null;
    description: string | null;
    logoUrl: string | null;
    activeTheme?: string | null;
    brandColor?: string | null;
    brandPrimaryColor?: string | null;
    brandSecondaryColor?: string | null;
    brandAccentColor?: string | null;
    brandBackgroundColor?: string | null;
    brandTextColor?: string | null;
    brandFontPrimary?: string | null;
    brandFontSecondary?: string | null;
    brandFooterText?: string | null;
    brandSupportEmail?: string | null;
    footerAddress: string | null;
    footerCopyright: string | null;
    footerAboutText: string | null;
    socialFacebook: string | null;
    socialTwitter: string | null;
    socialInstagram: string | null;
    socialLinkedin: string | null;
    socialWhatsapp: string | null;
    socialTelegram: string | null;
    contactEmail: string | null;
    headerStyle: string | null;
    headerBackgroundColor: string | null;
    headerTextColor: string | null;
    headerMobileBackgroundColor: string | null;
    footerBackgroundColor: string | null;
    footerTextColor: string | null;
    showCart: boolean | null;
    showFloatingChat: boolean | null;
    whatsappNumber: string | null;
    seoTitle: string | null;
    seoKeywords: string | null;
    seoImage: string | null;
    faviconUrl: string | null;
    googleSiteVerificationId: string | null;
    googleAnalyticsId: string | null;
    updatedAt: Date;
}

export type SiteSettingsUpdate = Partial<Omit<SiteSettings, "id" | "updatedAt">>;
export type PaymentSettings = Prisma.PaymentSettingsGetPayload<{}>;

// Force TS update v5

export const getSiteSettings = async (): Promise<SiteSettings> => {
    try {
        const settings = await db.siteSettings.findFirst();
        if (settings) return settings;

        // Create default settings if none exist
        const newSettings = await db.siteSettings.create({
            data: {
                siteName: "My Awesome Site",
                description: "Welcome to my website",
                // @ts-ignore
                activeTheme: "default",
                footerCopyright: `© ${new Date().getFullYear()} All Rights Reserved.`,
            }
        });

        return newSettings;
    } catch (error) {
        console.error("Failed to fetch site settings, returning defaults:", error);
        return {
            id: "default",
            siteName: "My Awesome Site",
            tagline: "Welcome",
            description: "Built with Next CMS",
            logoUrl: null,
            activeTheme: "default",
            seoTitle: null,
            seoKeywords: null,
            seoImage: null,
            faviconUrl: null,
            footerAddress: null,
            footerCopyright: `© ${new Date().getFullYear()} All Rights Reserved.`,
            footerAboutText: null,
            socialFacebook: null,
            socialTwitter: null,
            socialInstagram: null,
            socialLinkedin: null,
            socialWhatsapp: null,
            socialTelegram: null,
            contactEmail: null,
            brandColor: "#CE1111",
            brandPrimaryColor: null,
            brandSecondaryColor: null,
            brandAccentColor: null,
            brandBackgroundColor: null,
            brandTextColor: null,
            brandFontPrimary: null,
            brandFontSecondary: null,
            brandFooterText: null,
            brandSupportEmail: null,
            headerStyle: "simple",
            headerBackgroundColor: "#ffffff",
            headerTextColor: "111827",
            showCart: true,
            showFloatingChat: false,
            whatsappNumber: null,
            headerMobileBackgroundColor: "#f9fafb",
            footerBackgroundColor: "#CE1111",
            footerTextColor: "#ffffff",
            googleSiteVerificationId: null,
            googleAnalyticsId: null,
            updatedAt: new Date(),
        } as SiteSettings;
    }
};

export const updateSiteSettings = async (data: SiteSettingsUpdate) => {
    const current = await getSiteSettings();

    const updated = await db.siteSettings.update({
        where: { id: current.id },
        data: {
            ...data,
            updatedAt: new Date(),
        }
    });

    return updated;
};

export const getPaymentSettings = async (): Promise<PaymentSettings> => {
    try {
        const settings = await db.paymentSettings.findFirst();
        if (settings) return settings;

        // Create default settings if none exist
        const newSettings = await db.paymentSettings.create({
            data: {
                bankName: "Example Bank",
                accountNumber: "0000000000",
                accountHolder: "Store Owner",
                currency: "USD",
                instructions: "Please include your order number in the transfer note."
            }
        });

        return newSettings;
    } catch (error) {
        console.error("Failed to fetch payment settings, returning defaults:", error);
        return {
            id: "default",
            bankName: "Example Bank",
            accountNumber: "0000000000",
            accountHolder: "Store Owner",
            currency: "USD",
            instructions: "Please include your order number in the transfer note.",
            updatedAt: new Date(),
        } as PaymentSettings;
    }
};
