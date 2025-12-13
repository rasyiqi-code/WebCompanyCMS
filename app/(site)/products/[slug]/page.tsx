
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProduct } from "../../../../lib/get-product";
import Link from "next/link";
import { ArrowLeft, Check, Truck, ShieldCheck } from "lucide-react";
import AddToCartButton from "../../../../components/shop/AddToCartButton";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: `${product.name} - Store`,
        description: product.description || `Buy ${product.name}`,
    };
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Breadcrumb / Back */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-500 hover:text-emerald-600 transition-colors"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Store
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left Column: Gallery */}
                <div>
                    <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square border border-gray-100 mb-6">
                        {product.images && product.images[0] ? (
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <span className="text-xl font-medium">No Image Available</span>
                            </div>
                        )}
                    </div>
                    {/* Thumbnail Grid (if multiple images) */}
                    {product.images && product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.slice(1).map((img: string, idx: number) => (
                                <div key={idx} className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 cursor-pointer hover:ring-2 ring-emerald-500 transition-all">
                                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Product Info */}
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                    <div className="text-3xl font-bold text-emerald-600 mb-6 font-mono">${product.price}</div>

                    <div className="prose prose-gray mb-8 text-gray-600">
                        <p>{product.description}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${(product.stock || 0) > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}>
                                {(product.stock || 0) > 0 ? "IN STOCK" : "OUT OF STOCK"}
                            </span>
                            {(product.stock || 0) < 10 && (product.stock || 0) > 0 && (
                                <span className="text-red-500 font-medium">Only {product.stock} left!</span>
                            )}
                        </div>

                        <AddToCartButton product={product} />
                        <p className="text-center text-xs text-gray-400 mt-3">Secure checkout powered by Stripe (Mock)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start">
                            <Truck className="text-gray-400 mr-3 mt-1" size={20} />
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">Free Shipping</h4>
                                <p className="text-xs text-gray-500">On orders over $100</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <ShieldCheck className="text-gray-400 mr-3 mt-1" size={20} />
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">2 Year Warranty</h4>
                                <p className="text-xs text-gray-500">Full coverage included</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
