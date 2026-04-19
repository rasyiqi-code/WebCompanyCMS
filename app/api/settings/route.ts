import { NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "../../../lib/settings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const settingsSchema = z.object({
    siteName: z.string().min(1, "Site name is required").optional().nullable(),
    tagline: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    contactEmail: z.string().email("Invalid email address").optional().nullable().or(z.literal("")).or(z.literal(null)),
    brandColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color").optional().nullable(),
    brandPrimaryColor: z.string().optional().nullable(),
    brandSecondaryColor: z.string().optional().nullable(),
    brandAccentColor: z.string().optional().nullable(),
    brandBackgroundColor: z.string().optional().nullable(),
    brandTextColor: z.string().optional().nullable(),
    brandFontPrimary: z.string().optional().nullable(),
    brandFontSecondary: z.string().optional().nullable(),
    brandFooterText: z.string().optional().nullable(),
    brandSupportEmail: z.string().optional().nullable(),
    logoUrl: z.string().optional().nullable(),
    faviconUrl: z.string().optional().nullable(),
    footerCopyright: z.string().optional().nullable(),
    showCart: z.boolean().optional().nullable(),
    showFloatingChat: z.boolean().optional().nullable(),
    whatsappNumber: z.string().optional().nullable(),
    googleAnalyticsId: z.string().optional().nullable(),
});

export async function GET() {
    try {
        const settings = await getSiteSettings();
        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        
        // Validate with Zod
        const validation = settingsSchema.safeParse(body);
        if (!validation.success) {
            console.error("[SETTINGS_PUT] Validation Error:", validation.error.format());
            return NextResponse.json({ 
                error: "Validation failed", 
                details: validation.error.format() 
            }, { status: 400 });
        }

        const updated = await updateSiteSettings(body);
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating settings:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
