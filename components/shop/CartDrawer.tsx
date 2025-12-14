"use client";

import React from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
    const { items, removeFromCart, updateQuantity, cartTotal, isCartOpen, toggleCart } = useCart();
    const router = useRouter();

    if (!isCartOpen) return null;

    const handleCheckout = () => {
        toggleCart();
        router.push("/checkout");
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => toggleCart()}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <ShoppingBag className="mr-3 text-emerald-600" />
                        Your Cart ({items.length})
                    </h2>
                    <button
                        onClick={() => toggleCart()}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                <ShoppingBag className="text-gray-400" size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                            <p className="text-gray-500 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
                            <button
                                onClick={() => toggleCart()}
                                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.productId} className="flex gap-4">
                                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <ShoppingBag size={20} className="text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                                        <div className="text-emerald-600 font-bold">${item.price}</div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                className="p-1 hover:bg-white rounded-l-lg transition-colors text-gray-500"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="p-1 hover:bg-white rounded-r-lg transition-colors text-gray-500"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="text-xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
                        >
                            Checkout Now
                        </button>
                        <div className="text-center mt-3">
                            <button onClick={() => toggleCart()} className="text-sm text-gray-500 hover:text-gray-800">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
