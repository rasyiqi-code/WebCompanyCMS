
import Link from "next/link";
import { CheckCircle, ShoppingBag } from "lucide-react";

export default async function OrderSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ orderId: string }>;
}) {
    const { orderId } = await searchParams;
    // Note: In real app, might want to fetch order details to show them.

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-emerald-600" size={40} />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                <p className="text-gray-500 mb-8">
                    Thank you for your purchase. We've received your order and are getting it ready.
                </p>

                <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-mono font-medium text-gray-900 select-all">
                        {/* We don't have orderId synchronously here easily without verifying params await, 
                            but for simple display: */}
                        {orderId}
                    </p>
                </div>

                <Link
                    href="/dashboard/products"
                    className="flex items-center justify-center w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                >
                    <ShoppingBag className="mr-2" size={18} />
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
