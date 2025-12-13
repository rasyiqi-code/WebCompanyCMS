
"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import Link from "next/link";

export function ProductGridItem({ product }: { product: any }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.images?.[0],
            quantity: 1,
        });
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all group">
            <Link href={`/dashboard/products/${product.id}`} className="block aspect-square bg-gray-100 relative group-hover:opacity-90 transition-opacity">
                {product.images && product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
            </Link>
            <div className="p-4">
                <Link href={`/dashboard/products/${product.id}`} className="block">
                    <h3 className="font-bold text-gray-900 mb-1 hover:text-indigo-600 transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-emerald-600">${product.price}</span>
                    <button
                        onClick={handleAddToCart}
                        className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors active:scale-95 transform"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
