
import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ProductGridItem } from "@/app/dashboard/products/ProductGridItem";
import { ShoppingCart } from "@/components/shopping-cart";

export const metadata = {
    title: "Shop - Premium Collection | Unived Press",
    description: "Discover our premium collection of products. Quality you can trust, curated just for you.",
    openGraph: {
        title: "Shop - Premium Collection | Unived Press",
        description: "Discover our premium collection of products. Quality you can trust, curated just for you.",
        type: "website",
    }
};

export default async function ShopPage() {
    const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));

    return (
        <div className="bg-white">
            {/* Header is provided by SiteLayout */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <section className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Collection</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Discover premium quality products curated just for you.
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {allProducts.map((product) => (
                        <ProductGridItem key={product.id} product={product} baseUrl="/shop" />
                    ))}
                </div>
            </main>
        </div>
    );
}
