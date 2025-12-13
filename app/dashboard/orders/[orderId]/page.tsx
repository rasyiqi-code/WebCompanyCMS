
import { db } from "../../../../lib/db";
import { orders, orderItems, products } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, MapPin, Mail, Package, CreditCard } from "lucide-react";
import OrderStatusManager from "./OrderStatusManager";

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ orderId: string }>;
}) {
    const { orderId } = await params;

    const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);

    if (!order) {
        return notFound();
    }

    // Fetch items with product details
    const items = await db.select({
        id: orderItems.id,
        quantity: orderItems.quantity,
        price: orderItems.price,
        productName: products.name,
        productImage: products.images,
    })
        .from(orderItems)
        .leftJoin(products, eq(orderItems.productId, products.id))
        .where(eq(orderItems.orderId, orderId));

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/orders" className="text-gray-500 hover:text-indigo-600 inline-flex items-center mb-4">
                    <ArrowLeft size={16} className="mr-1" /> Back to Orders
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            Order #{order.id.slice(0, 8)}
                            <span className={`ml-3 text-sm font-normal px-3 py-1 rounded-full ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {order.paymentStatus || 'pending'}
                            </span>
                        </h1>
                        <p className="text-gray-500 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500">Total Amount</div>
                        <div className="text-3xl font-bold text-gray-900">${order.total}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center">
                            <Package size={18} className="mr-2 text-gray-400" />
                            <h3 className="font-semibold text-gray-700">Order Items</h3>
                        </div>
                        <ul className="divide-y divide-gray-100">
                            {items.map((item) => (
                                <li key={item.id} className="p-6 flex items-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 mr-4">
                                        {item.productImage && item.productImage[0] ? (
                                            <img src={item.productImage[0]} alt={item.productName || "Product"} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">IMG</div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">{item.productName || "Unknown Product"}</h4>
                                        <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                                    </div>
                                    <div className="font-bold text-gray-900">
                                        ${(Number(item.price) * item.quantity).toFixed(2)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Customer & Actions */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center">
                            <User size={18} className="mr-2 text-gray-400" />
                            <h3 className="font-semibold text-gray-700">Customer Details</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase">Customer Name</label>
                                <p className="text-gray-900 font-medium">{order.customerName}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase">Email Address</label>
                                <p className="text-gray-900 flex items-center">
                                    <Mail size={14} className="mr-1 text-gray-400" /> {order.customerEmail}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase">Shipping Address</label>
                                <p className="text-gray-900 flex items-start mt-1">
                                    <MapPin size={14} className="mr-1 mt-1 text-gray-400 flex-shrink-0" />
                                    {order.customerAddress}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status Management (Client Component) */}
                    <OrderStatusManager
                        orderId={orderId}
                        paymentStatus={order.paymentStatus || "pending"}
                        fulfillmentStatus={order.fulfillmentStatus || "unfulfilled"}
                    />
                </div>
            </div>
        </div>
    );
}
