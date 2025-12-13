
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { items } = body;

        if (!items || items.length === 0) {
            return new NextResponse("No items in cart", { status: 400 });
        }

        const total = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

        const [newOrder] = await db.insert(orders).values({
            customerName: session.user.name || "Customer",
            customerEmail: session.user.email,
            customerAddress: "Default Address",
            total: total.toString(),
            status: "pending",
            paymentStatus: "pending",
            fulfillmentStatus: "unfulfilled"
        }).returning();

        await db.insert(orderItems).values(
            items.map((item: any) => ({
                orderId: newOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price.toString()
            }))
        );

        return NextResponse.json(newOrder);
    } catch (error) {
        console.error("[CreateOrder]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
