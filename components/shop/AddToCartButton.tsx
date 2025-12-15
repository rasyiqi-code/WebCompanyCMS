"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart, CartItem } from "../providers/cart-provider";

export default function AddToCartButton({ product }: { product: any }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const item: CartItem = {
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.images?.[0],
            quantity: 1,
        };
        addToCart(item);
    };

    const isOutOfStock = (product.stock || 0) <= 0;

    return (
        <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-4 text-white rounded-xl font-bold text-lg transition-transform active:scale-95 shadow-lg flex items-center justify-center ${isOutOfStock
                ? "bg-gray-400 cursor-not-allowed shadow-none"
                : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                }`}
        >
            <ShoppingCart className="mr-3" />
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
    );
}
