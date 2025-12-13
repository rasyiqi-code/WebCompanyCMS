
import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductDetails from "@/app/dashboard/products/ProductDetails";

export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);

    return {
        title: product ? `${product.name} - Shop` : "Product Not Found",
        description: product?.description || "Product Details",
    };
}

export default async function PublicProductPage({
    params
}: {
    params: Promise<{ productId: string }>;
}) {
    const { productId } = await params;
    const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);

    if (!product) {
        return <div className="p-20 text-center">Product not found</div>;
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header provided by SiteLayout */}

            <div className="pt-10 px-4">
                <ProductDetails product={product} backUrl="/shop" />
            </div>
        </div>
    );
}
