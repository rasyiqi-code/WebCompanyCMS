"use client";

import React, { useState } from "react";
import { CheckCircle, Truck, XCircle, Clock, Save, Loader2 } from "lucide-react";
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
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-blue-500"></div>
            <h3 className="text-xs font-black text-indigo-400 mb-6 uppercase tracking-[0.2em]">Sync Order Status</h3>

            <div className="space-y-6">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1">Payment Tracking</label>
                    <select
                        value={pStatus}
                        onChange={(e) => setPStatus(e.target.value)}
                        className="appearance-none w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 outline-none text-white transition-all font-bold text-sm cursor-pointer"
                    >
                        <option value="pending" className="bg-[#111]">Pending Authorization</option>
                        <option value="paid" className="bg-[#111]">Capital Verified</option>
                        <option value="failed" className="bg-[#111]">Transmission Failure</option>
                        <option value="refunded" className="bg-[#111]">Asset Reversion</option>
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1">Fulfillment Status</label>
                    <select
                        value={fStatus}
                        onChange={(e) => setFStatus(e.target.value)}
                        className="appearance-none w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none text-white transition-all font-bold text-sm cursor-pointer"
                    >
                        <option value="unfulfilled" className="bg-[#111]">Awaiting Logistics</option>
                        <option value="shipped" className="bg-[#111]">Transit Initiated</option>
                        <option value="delivered" className="bg-[#111]">Recipient Acquisition</option>
                        <option value="returned" className="bg-[#111]">Reverse Logistics</option>
                        <option value="cancelled" className="bg-[#111]">Protocol Terminated</option>
                    </select>
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleUpdate}
                        disabled={isLoading || (pStatus === paymentStatus && fStatus === fulfillmentStatus)}
                        className="w-full px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3"
                    >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {isLoading ? "Saving..." : "Update Status"}
                    </button>
                </div>
            </div>
        </div>
    );
}


