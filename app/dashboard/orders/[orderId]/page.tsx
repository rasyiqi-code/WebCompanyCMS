
import { db } from "../../../../lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, MapPin, Mail, Package, CreditCard } from "lucide-react";
import OrderStatusManager from "./OrderStatusManager";
import { getPaymentSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/currency";

export default async function OrderDetailPage({
    params,
}: {
    params: Promise<{ orderId: string }>;
}) {
    const { orderId } = await params;

    const paymentSettings = await getPaymentSettings();
    const currency = paymentSettings.currency || "USD";

    const order = await db.order.findUnique({
        where: { id: orderId }
    });

    if (!order) {
        return notFound();
    }

    // Fetch items with product details
    const items = await db.orderItem.findMany({
        where: { orderId: orderId },
        include: {
            product: {
                select: {
                    name: true,
                    images: true
                }
            }
        }
    });

    const formattedItems = items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        productName: item.product?.name,
        productImage: item.product?.images,
    }));

    return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4">
            <div className="mb-8 border-b border-[#2f2f2f] pb-4">
                <Link href="/dashboard/orders" className="flex items-center gap-2 text-white hover:text-white transition-colors text-xs font-medium mb-4">
                    <ArrowLeft size={14} />
                    Back to Orders
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-white tracking-tight">
                                Order <span className="text-white">#{order.id.slice(0, 8)}</span>
                            </h1>
                        </div>
                        <p className="text-white text-[11px] font-medium uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-left md:text-right">
                        <div className="text-[10px] font-bold text-white uppercase tracking-widest mb-0.5">Total Amount</div>
                        <div className="text-2xl font-bold text-white tracking-tight">{formatPrice(order.total, currency)}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Items */}
                    <div className="bg-[#202020] rounded-lg border border-[#2f2f2f] overflow-hidden">
                        <div className="px-4 py-2 border-b border-[#2f2f2f] bg-white/[0.01]">
                             <h3 className="text-[11px] font-bold text-white uppercase tracking-widest opacity-50">Items</h3>
                        </div>
                        <ul className="divide-y divide-[#2f2f2f]">
                            {formattedItems.map((item) => (
                                <li key={item.id} className="p-4 flex items-center hover:bg-white/[0.01] transition-colors">
                                    <div className="w-12 h-12 bg-white/[0.03] rounded border border-[#2f2f2f] flex-shrink-0 mr-4 relative overflow-hidden">
                                        {item.productImage && item.productImage[0] ? (
                                            <Image src={item.productImage[0]} alt={item.productName || "Product"} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-700 font-bold uppercase tracking-tight">NULL</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-white text-sm truncate uppercase tracking-tight">{item.productName || "Untitled Product"}</h4>
                                        <p className="text-[11px] text-white font-medium">
                                            {formatPrice(item.price, currency)} × {item.quantity}
                                        </p>
                                    </div>
                                    <div className="text-right ml-4">
                                        <div className="text-sm font-bold text-white tracking-tight">
                                            {formatPrice(Number(item.price) * item.quantity, currency)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Customer & Actions */}
                <div className="space-y-8">
                    {/* Status & Customer */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-[11px] font-bold text-white uppercase tracking-widest opacity-50">Status</h3>
                            <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border inline-block ${order.paymentStatus === 'paid' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'}`}>
                                {order.paymentStatus || 'pending'}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[#2f2f2f] space-y-4">
                            <h3 className="text-[11px] font-bold text-white uppercase tracking-widest opacity-50">Identity</h3>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-white">Name</label>
                                    <p className="text-sm font-bold text-white tracking-tight uppercase">{order.customerName}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-white">Email</label>
                                    <p className="text-sm font-medium text-white">{order.customerEmail}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-white">Address</label>
                                    <p className="text-[11px] font-medium text-white leading-relaxed uppercase tracking-tight">
                                        {order.customerAddress}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-[#2f2f2f] space-y-4">
                        <h3 className="text-[11px] font-bold text-white uppercase tracking-widest opacity-50">Operations</h3>
                        <OrderStatusManager
                            orderId={orderId}
                            paymentStatus={order.paymentStatus || "pending"}
                            fulfillmentStatus={order.fulfillmentStatus || "unfulfilled"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
