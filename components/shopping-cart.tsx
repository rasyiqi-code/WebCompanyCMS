
"use client";

import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./providers/cart-provider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ShoppingCart() {
    const { items, isCartOpen, toggleCart, removeFromCart, clearCart } = useCart();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    if (!isCartOpen) return null;

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items }),
            });

            if (!res.ok) throw new Error("Checkout failed");

            clearCart();
            toggleCart();
            router.push("/dashboard/orders");
            router.refresh();
        } catch (error) {
            alert("Checkout failed. Please try again.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={toggleCart} />

            <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
                <div className="h-full w-full flex flex-col bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900 flex items-center">
                                <ShoppingBag className="mr-2" size={20} /> Shopping Cart
                            </h2>
                            <button
                                type="button"
                                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                onClick={toggleCart}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mt-8">
                            {items.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <p>Your cart is empty.</p>
                                    <button onClick={toggleCart} className="text-indigo-600 hover:text-indigo-800 mt-2 text-sm font-medium">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {items.map((item) => (
                                        <li key={item.productId} className="flex py-6">
                                            {item.image && (
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                            )}
                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>{item.name}</h3>
                                                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">Qty {item.quantity}</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.productId)}
                                                        className="font-medium text-red-600 hover:text-red-500 flex items-center"
                                                    >
                                                        <Trash2 size={16} className="mr-1" /> Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {items.length > 0 && (
                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {isCheckingOut ? "Processing..." : "Checkout"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
