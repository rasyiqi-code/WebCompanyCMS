
import React, { useEffect, useState } from "react";
import type { ComponentConfig } from "@measured/puck";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { ColorPickerField } from "./fields/ColorPickerField";

export type ProductListProps = {
    title?: string;
    description?: string;
    limit?: number;
    columns?: number;
    backgroundColor?: string;
};

type Product = {
    id: string;
    name: string;
    slug: string;
    price: string;
    images: string[] | null;
    stock: number;
};

export const ProductList: ComponentConfig<ProductListProps> = {
    label: "Product List",
    fields: {
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" },
        limit: { type: "number", label: "Limit" },
        columns: { type: "number", label: "Columns", min: 1, max: 4 },
        backgroundColor: {
            type: "custom",
            label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
    },
    defaultProps: {
        title: "Featured Products",
        description: "Check out our latest collection.",
        limit: 4,
        columns: 4,
        backgroundColor: "#ffffff",
    },
    render: ({ title, description, limit = 4, columns = 4, backgroundColor = "#ffffff" }) => {
        const [products, setProducts] = useState<Product[]>([]);
        const [loading, setLoading] = useState(true);
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
            setMounted(true);
            const fetchProducts = async () => {
                try {
                    const res = await fetch("/api/products");
                    if (res.ok) {
                        const data = await res.json();
                        setProducts(data.products || []);
                    }
                } catch (e) {
                    console.error("Failed to fetch products", e);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        }, []);

        if (!mounted) {
            return <div className="p-8 text-center text-gray-400">Loading Products...</div>;
        }

        const displayedProducts = products.slice(0, limit);

        return (
            <section className="py-16 px-6" style={{ backgroundColor: backgroundColor }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        {title && <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>}
                        {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                        </div>
                    ) : displayedProducts.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No products found.</p>
                        </div>
                    ) : (
                        <div className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`}>
                            {displayedProducts.map((product) => (
                                <div key={product.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                                        {product.images && product.images[0] ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <ShoppingCart size={48} />
                                            </div>
                                        )}
                                        {/* Quick Add Overlay (Placeholder) */}
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center pb-6">
                                            <Link href={`/products/${product.slug}`} className="bg-white text-emerald-700 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-emerald-50 transition-colors text-sm">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-emerald-700 font-bold">${product.price}</span>
                                            <span className={`text-xs ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    },
};
