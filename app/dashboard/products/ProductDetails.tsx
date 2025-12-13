
"use client";

import { useCart } from "@/components/providers/cart-provider";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetails({ product, backUrl = "/dashboard/products" }: { product: any, backUrl?: string }) {
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(product.images?.[0] || "");

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
        <div className="max-w-6xl mx-auto pb-10">
            <div className="mb-6">
                <Link href={backUrl} className="text-gray-500 hover:text-gray-900 inline-flex items-center">
                    <ArrowLeft size={20} className="mr-2" /> Back
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Image Gallery */}
                    <div className="bg-gray-50 p-6 md:p-10 flex flex-col items-center">
                        <div className="w-full aspect-square rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 mb-4 relative">
                            {selectedImage ? (
                                <img src={selectedImage} alt={product.name} className="w-full h-full object-contain" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                            )}
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto w-full p-1">
                                {product.images.map((img: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 ${selectedImage === img ? 'border-indigo-600' : 'border-transparent'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="p-8 md:p-12 flex flex-col h-full">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <div className="text-2xl font-bold text-emerald-600 mb-6">${product.price}</div>

                        <div className="prose prose-sm text-gray-600 mb-8 flex-1">
                            <p>{product.description || "No description available."}</p>
                        </div>

                        <div className="mt-auto border-t border-gray-100 pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-gray-500">
                                    Availability:
                                    <span className={(product.stock || 0) > 0 ? "text-emerald-600 ml-1" : "text-red-500 ml-1"}>
                                        {(product.stock || 0) > 0 ? "In Stock" : "Out of Stock"}
                                    </span>
                                </span>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl transform active:scale-[0.99]"
                            >
                                <ShoppingCart size={24} className="mr-3" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
