
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { paymentSettings } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    try {
        const [settings] = await db.select().from(paymentSettings).limit(1);
        return NextResponse.json(settings || {});
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch settings" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { bankName, accountNumber, accountHolder, instructions } = body;

        // Check if settings exist
        const [existing] = await db.select().from(paymentSettings).limit(1);

        if (existing) {
            await db.update(paymentSettings)
                .set({
                    bankName,
                    accountNumber,
                    accountHolder,
                    instructions,
                    updatedAt: new Date(),
                })
                .where(eq(paymentSettings.id, existing.id));
        } else {
            await db.insert(paymentSettings).values({
                bankName,
                accountNumber,
                accountHolder,
                instructions
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Payment settings error:", error);
        return NextResponse.json(
            { error: "Failed to save settings" },
            { status: 500 }
        );
    }
}
