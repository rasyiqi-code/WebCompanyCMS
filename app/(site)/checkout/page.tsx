"use client";

import React, { useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { useCurrency } from "@/hooks/use-currency";
import { CreditCard, Truck, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PaymentMethodInfo from "../../../components/shop/PaymentMethodInfo";

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const { formatPrice } = useCurrency();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
    });

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-500 mb-6">Add some products before checking out.</p>
                <Link href="/dashboard/products" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">
                    Browse Store
                </Link>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    items: items.map(i => ({ productId: i.productId, quantity: i.quantity, price: i.price }))
                })
            });

            if (!res.ok) throw new Error("Order failed");

            const data = await res.json();

            clearCart();
            router.push(`/checkout/success?orderId=${data.orderId}`);

        } catch (error) {
            console.error(error);
            alert("Something went wrong with your order. Please try again.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Secure Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Col: Form */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold mb-6 flex items-center">
                                <Truck className="mr-3 text-emerald-600" />
                                Shipping Information
                            </h2>
                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text" name="name" required
                                        value={formData.name} onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email" name="email" required
                                        value={formData.email} onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text" name="address" required
                                        value={formData.address} onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text" name="city" required
                                            value={formData.city} onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                        <input
                                            type="text" name="zip" required
                                            value={formData.zip} onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <PaymentMethodInfo />
                    </div>

                    {/* Right Col: Summary */}
                    <div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                                {items.map((item) => (
                                    <div key={item.productId} className="flex gap-4 py-2 border-b border-gray-100 last:border-0">
                                        <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                                                <span className="font-bold text-gray-900 text-sm">{formatPrice(item.price * item.quantity)}</span>
                                            </div>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-gray-900 font-bold text-lg pt-2">
                                    <span>Total</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                disabled={isProcessing}
                                className="w-full mt-6 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                ) : (
                                    <ArrowRight className="mr-2" size={20} />
                                )}
                                {isProcessing ? "Processing..." : "Place Order"}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center">
                                <CheckCircle size={12} className="mr-1" /> Secure Encrypted Checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
