"use client";

import React, { useState } from "react";
import { CheckCircle, Truck, XCircle, Clock, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderStatusManager({ orderId, paymentStatus, fulfillmentStatus }: { orderId: string, paymentStatus: string, fulfillmentStatus: string }) {
    const [pStatus, setPStatus] = useState(paymentStatus);
    const [fStatus, setFStatus] = useState(fulfillmentStatus);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    paymentStatus: pStatus,
                    fulfillmentStatus: fStatus
                })
            });

            if (res.ok) {
                router.refresh();
                alert("Order status updated!");
            } else {
                alert("Failed to update status.");
            }
        } catch (e) {
            console.error(e);
            alert("Error updating status.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Manage Order Status</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <select
                        value={pStatus}
                        onChange={(e) => setPStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fulfillment Status</label>
                    <select
                        value={fStatus}
                        onChange={(e) => setFStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                        <option value="unfulfilled">Unfulfilled</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="returned">Returned</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="pt-2">
                    <button
                        onClick={handleUpdate}
                        disabled={isLoading || (pStatus === paymentStatus && fStatus === fulfillmentStatus)}
                        className="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center"
                    >
                        {isLoading ? "Saving..." : <><Save size={18} className="mr-2" /> Update Statuses</>}
                    </button>
                </div>
            </div>
        </div>
    );
}
