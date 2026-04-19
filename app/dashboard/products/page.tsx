import React from "react";
import Link from "next/link";
import { Plus, Edit, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { ProductGridItem } from "./ProductGridItem";
import { ArchiveProductButton } from "@/components/ArchiveProductButton";
import { db } from "../../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { serializeProducts } from "../../../lib/serialize";
import { getPaymentSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/currency";
import { 
    PageHeader,
    TableContainer,
    THead,
    TBody,
    TR,
    TH,
    TD,
    StatusBadge,
    ActionButton,
    EmptyState
} from "@/components/dashboard/ui/DataTable";


export default async function ProductsPage() {
    const session = await getServerSession(authOptions);
    const isAdminOrEditor = session?.user?.role === "admin" || session?.user?.role === "editor";

    // Admin sees ALL (including archived). Users see only NON-archived.
    const whereCondition = isAdminOrEditor ? {} : { isArchived: false };

    const allProducts = await db.product.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' }
    });

    const paymentSettings = await getPaymentSettings();
    const currency = paymentSettings.currency || "USD";

    const serializedProducts = serializeProducts(allProducts);

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <PageHeader 
                title={isAdminOrEditor ? "Inventory" : "Products"} 
                subtitle={isAdminOrEditor ? "Manage and curate your product catalog." : "Browse the latest available items."}
            >
                {isAdminOrEditor && (
                    <Link
                        href="/dashboard/products/new"
                        className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold hover:bg-[#1a99cc] transition-colors"
                    >
                        <Plus size={14} className="mr-2 inline" />
                        New Product
                    </Link>
                )}
            </PageHeader>

            {!isAdminOrEditor ? (
                // USER VIEW: GRID
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {serializedProducts.map((product) => (
                        <ProductGridItem key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                // ADMIN VIEW: TABLE
                <TableContainer>
                    <THead>
                        <TR>
                            <TH>Product</TH>
                            <TH>Price</TH>
                            <TH>In Stock</TH>
                            <TH align="right">Actions</TH>
                        </TR>
                    </THead>
                    <TBody>
                        {serializedProducts.length === 0 ? (
                            <TR>
                                <TD colSpan={4} className="p-0 border-none">
                                    <EmptyState 
                                        icon={<ShoppingCart size={32} />} 
                                        message="No assets detected. Empty catalog." 
                                    />
                                </TD>
                            </TR>
                        ) : (
                            serializedProducts.map((product) => (
                                <TR key={product.id} className={product.isArchived ? 'opacity-60' : ''}>
                                    <TD>
                                        <div className="flex items-center">
                                            {product.images && product.images[0] ? (
                                                <div className="w-8 h-8 rounded border border-[#2f2f2f] mr-3 relative overflow-hidden bg-white/5">
                                                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" unoptimized />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded bg-white/[0.02] border border-[#2f2f2f] mr-3 flex items-center justify-center text-gray-700">
                                                    <ShoppingCart size={12} />
                                                </div>
                                            )}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <div className="text-sm font-bold text-white tracking-tight">{product.name}</div>
                                                    {product.isArchived && (
                                                        <StatusBadge type="neutral" label="ARCHIVED" />
                                                    )}
                                                </div>
                                                <div className="text-[10px] text-white font-medium">/{product.slug}</div>
                                            </div>
                                        </div>
                                    </TD>
                                    <TD className="text-sm font-bold text-white">
                                        {formatPrice(product.price, currency)}
                                    </TD>
                                    <TD>
                                        <StatusBadge 
                                            type={(product.stock || 0) > 0 ? "success" : "error"} 
                                            label={product.stock?.toString() || "0"} 
                                        />
                                    </TD>
                                    <TD align="right">
                                        <div className="flex justify-end gap-3 items-center">
                                            <Link href={`/dashboard/products/${product.id}`} className="p-1 text-white hover:text-white transition-colors" title="Edit">
                                                <Edit size={14} />
                                            </Link>
                                            <div className="p-1">
                                                <ArchiveProductButton
                                                    productId={product.id}
                                                    productName={product.name}
                                                    isArchived={product.isArchived}
                                                />
                                            </div>
                                        </div>
                                    </TD>
                                </TR>
                            ))
                        )}
                    </TBody>
                </TableContainer>
            )}
        </div>
    );
}
