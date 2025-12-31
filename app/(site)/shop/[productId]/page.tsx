
import { db } from "@/lib/db";
import ProductDetails from "@/app/dashboard/products/ProductDetails";

export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    const product = await db.product.findUnique({
        where: { id: productId }
    });

    const title = product ? `${product.name} | Unived Press Shop` : "Product Not Found";
    const description = product?.description || "Product Details";
    const images = product?.images && product.images.length > 0 ? [product.images[0]] : [];

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            images: images,
            type: "website",
        }
    };
}

export default async function PublicProductPage({
    params
}: {
    params: Promise<{ productId: string }>;
}) {
    const { productId } = await params;
    const product = await db.product.findUnique({
        where: { id: productId }
    });

    if (!product) {
        return <div className="p-20 text-center">Product not found</div>;
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.images?.[0] || undefined,
        "description": product.description,
        "sku": product.id,
        "offers": {
            "@type": "Offer",
            "url": `${baseUrl}/shop/${product.id}`,
            "priceCurrency": product.currency,
            "price": product.price,
            "availability": (product.stock ?? 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Header provided by SiteLayout */}

            <div className="pt-10 px-4">
                <ProductDetails product={product} backUrl="/shop" />
            </div>
        </main>
    );
}
