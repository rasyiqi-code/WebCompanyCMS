
"use client";

import React from 'react';
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { useCurrency } from "@/hooks/use-currency";
import Link from "next/link";

export function ProductGridItem({ product, baseUrl = "/dashboard/products" }: { product: any, baseUrl?: string }) {
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();

    const [isAdded, setIsAdded] = React.useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        addToCart({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.images?.[0],
            quantity: 1,
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all group">
            <Link href={`${baseUrl}/${product.id}`} className="block aspect-square bg-gray-100 relative group-hover:opacity-90 transition-opacity">
                {product.images && product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
            </Link>
            <div className="p-4">
                <Link href={`${baseUrl}/${product.id}`} className="block">
                    <h3 className="font-bold text-gray-900 mb-1 hover:text-indigo-600 transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-emerald-600">{formatPrice(product.price)}</span>
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`p-2 rounded-full transition-all active:scale-95 transform cursor-pointer ${isAdded
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                            }`}
                        title={isAdded ? "Added!" : "Add to Cart"}
                    >
                        {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
