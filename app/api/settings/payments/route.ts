
import { NextResponse } from "next/server";

import { db } from "../../../../lib/db";

export async function GET() {
    try {
        const settings = await db.paymentSettings.findFirst();
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
        const { bankName, accountNumber, accountHolder, instructions, currency } = body;

        // Check if settings exist
        const existing = await db.paymentSettings.findFirst();

        if (existing) {
            await db.paymentSettings.update({
                where: { id: existing.id },
                data: {
                    bankName,
                    accountNumber,
                    accountHolder,
                    currency,
                    instructions,
                    updatedAt: new Date(),
                }
            });
        } else {
            await db.paymentSettings.create({
                data: {
                    bankName,
                    accountNumber,
                    accountHolder,
                    currency,
                    instructions
                }
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
