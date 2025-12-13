
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { orders } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try {
        const { orderId } = await params;
        const body = await req.json();
        const { paymentStatus, fulfillmentStatus } = body;

        const updateData: any = {};
        if (paymentStatus) updateData.paymentStatus = paymentStatus;
        if (fulfillmentStatus) updateData.fulfillmentStatus = fulfillmentStatus;

        await db.update(orders)
            .set(updateData)
            .where(eq(orders.id, orderId));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}
