
import React from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ShoppingCart } from "lucide-react";
import { ProductGridItem } from "./ProductGridItem";
import { db } from "../../../lib/db";
import { products } from "../../../db/schema";
import { desc } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ProductsPage() {
    const session = await getServerSession(authOptions);
    const isAdminOrEditor = session?.user?.role === "admin" || session?.user?.role === "editor";
    const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isAdminOrEditor ? "Products" : "Marketplace"}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {isAdminOrEditor ? "Manage your store inventory." : "Browse our latest products."}
                    </p>
                </div>
                {isAdminOrEditor && (
                    <Link
                        href="/dashboard/products/new"
                        className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm"
                    >
                        <Plus size={18} className="mr-2" />
                        Add Product
                    </Link>
                )}
            </div>

            {!isAdminOrEditor ? (
                // USER VIEW: GRID
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allProducts.map((product) => (
                        <ProductGridItem key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                // ADMIN VIEW: TABLE
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wilder">Product</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wilder">Price</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wilder">Stock</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wilder text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {allProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        No products found. Start by creating one.
                                    </td>
                                </tr>
                            ) : (
                                allProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {// Optional: Thumbnail
                                                    product.images && product.images[0] ? (
                                                        <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-md object-cover mr-3 border border-gray-200" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-md bg-gray-100 mr-3"></div>
                                                    )
                                                }
                                                <div>
                                                    <div className="font-medium text-gray-900">{product.name}</div>
                                                    <div className="text-xs text-gray-500 font-mono">/{product.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            ${product.price}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${(product.stock || 0) > 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                                                }`}>
                                                {product.stock} in stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/dashboard/products/${product.id}`}
                                                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
