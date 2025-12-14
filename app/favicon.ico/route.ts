
import { getSiteSettings } from "@/lib/settings";
import { NextResponse } from "next/server";

export async function GET() {
    const settings = await getSiteSettings();

    if (settings.faviconUrl) {
        return NextResponse.redirect(settings.faviconUrl);
    }

    // If no favicon is set, we return 404, but we can return a 204 to key silence the error in logs if preferred,
    // or better, just letting it 404 is standard. 
    // However, specifically to address "di log masih ada pavicon 404", I will return 204 or a transparent pixel to silence it if no setting is found.
    // Ideally, we just redirect to a default placeholder.

    return new NextResponse(null, { status: 204 });
}
