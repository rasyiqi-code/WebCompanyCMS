import { db } from "../../../lib/db";
import Link from "next/link";
import { Eye, Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { serializeOrders } from "@/lib/serialize";
import { getPaymentSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/currency";
import { 
    PageHeader, 
    TableContainer, 
    THead, 
    TBody, 
    TR, 
    TH, 
    TD, 
    StatusBadge,
    EmptyState
} from "@/components/dashboard/ui/DataTable";

export const revalidate = 0; // Ensure fresh data

export default async function OrderListPage() {
    const session = await getServerSession(authOptions);
    const userRole = session?.user?.role || "user";
    const userEmail = session?.user?.email;

    const paymentSettings = await getPaymentSettings();
    const currency = paymentSettings.currency || "USD";

    let orderListRaw;

    if (userRole === "admin") {
        orderListRaw = await db.order.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } else {
        orderListRaw = await db.order.findMany({
            where: { customerEmail: userEmail || "" },
            orderBy: { createdAt: 'desc' }
        });
    }

    const orderList = serializeOrders(orderListRaw);


    return (
        <div className="animate-in fade-in duration-700 pb-20 px-4">
            <PageHeader 
                title="Orders" 
                subtitle="Manage and track your customer orders."
            />

            <TableContainer>
                <THead>
                    <TR>
                        <TH>Order ID</TH>
                        <TH>Customer</TH>
                        <TH>Date</TH>
                        <TH>Status</TH>
                        <TH>Total</TH>
                        <TH align="right">Actions</TH>
                    </TR>
                </THead>
                <TBody>
                    {orderList.length === 0 ? (
                        <TR>
                            <TD colSpan={6} className="p-0 border-none">
                                <EmptyState 
                                    icon={<Package size={32} />} 
                                    message="No transactions found. Your ledger is currently clean." 
                                />
                            </TD>
                        </TR>
                    ) : (
                        orderList.map((order) => (
                            <TR key={order.id}>
                                <TD className="font-mono text-[10px] text-white">
                                    #{order.id.slice(0, 8).toUpperCase()}
                                </TD>
                                <TD>
                                    <div className="text-sm font-bold text-white tracking-tight">{order.customerName}</div>
                                    <div className="text-[10px] text-gray-400 mt-0.5">{order.customerEmail}</div>
                                </TD>
                                <TD className="text-xs text-white">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </TD>
                                <TD>
                                    <StatusBadge 
                                        type={
                                            order.paymentStatus === 'paid' ? 'success' : 
                                            order.paymentStatus === 'failed' ? 'error' : 
                                            'warning'
                                        } 
                                        label={order.paymentStatus || 'pending'} 
                                    />
                                </TD>
                                <TD className="text-sm font-bold text-white">
                                    {formatPrice(order.total, currency)}
                                </TD>
                                <TD align="right">
                                    <div className="flex justify-end gap-3 items-center">
                                        <Link href={`/dashboard/orders/${order.id}`} className="p-1 text-white hover:text-[#2eaadc] transition-colors" title="View Order">
                                            <Eye size={14} />
                                        </Link>
                                    </div>
                                </TD>
                            </TR>
                        ))
                    )}
                </TBody>
            </TableContainer>
        </div>
    );
}
