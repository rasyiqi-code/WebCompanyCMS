import React from "react";
export const dynamic = "force-dynamic";
import { FileText, ShoppingBag, Eye, Image as ImageIcon, Briefcase, Plus, MessageSquare } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { serializeOrders } from "@/lib/serialize";
import { getPaymentSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/currency";
import { 
    PageHeader,
    StatCard,
    QuickAction,
    LibraryItem,
    EmptyState
} from "@/components/dashboard/ui/DataTable";

async function getStats() {
    try {
        const [
            postsCount,
            productsCount,
            ordersCount,
            usersCount,
            mediaCount,
            galleryCount,
            portfolioCount,
            messagesCount,
            stats,
            mediaSize,
            recentOrdersRaw
        ] = await Promise.all([
            db.post.count(),
            db.product.count(),
            db.order.count(),
            db.user.count(),
            db.mediaItem.count(),
            db.galleryItem.count(),
            db.portfolioItem.count(),
            db.contactSubmission.count(),
            db.siteStatistics.findFirst(),
            db.mediaItem.aggregate({ _sum: { size: true } }),
            db.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
        ]);

        return {
            counts: {
                posts: postsCount,
                products: productsCount,
                orders: ordersCount,
                users: usersCount,
                media: mediaCount,
                gallery: galleryCount,
                portfolio: portfolioCount,
                messages: messagesCount,
            },
            views: stats?.totalViews || 0,
            storageUsed: Number(mediaSize._sum.size || 0),
            recentOrders: serializeOrders(recentOrdersRaw)
        };
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return {
            counts: { posts: 0, products: 0, orders: 0, users: 0, media: 0, gallery: 0, portfolio: 0, messages: 0 },
            views: 0,
            storageUsed: 0,
            recentOrders: []
        };
    }
}

export default async function DashboardPage() {
    const data = await getStats();
    const paymentSettings = await getPaymentSettings();
    const currency = paymentSettings.currency || "USD";
    const totalRevenue = data.recentOrders.reduce((acc, o) => acc + Number(o.total), 0);

    return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8 text-white">
            <PageHeader 
                title="Workspace" 
                subtitle="High-level telemetry and asset operations." 
            />

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="Gross Revenue" 
                    value={formatPrice(totalRevenue, currency)} 
                    icon={<ShoppingBag size={14} />} 
                    description="Recent 5 Transactions"
                />
                <StatCard 
                    title="Traffic Overview" 
                    value={data.views.toLocaleString()} 
                    icon={<Eye size={14} />} 
                    description="Total Lifetime Views"
                />
                <StatCard 
                    title="Infrastructure" 
                    value={data.counts.media.toString()} 
                    icon={<ImageIcon size={14} />} 
                    description={`${(data.storageUsed / 1024 / 1024).toFixed(2)} MB Storage Used`}
                />
                <StatCard 
                    title="Active Identity" 
                    value={data.counts.users.toString()} 
                    icon={<Plus size={14} />} 
                    description="Registered Console Users"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Recent Activity */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Recent Activity</h3>
                        <Link href="/dashboard/orders" className="text-[10px] font-bold text-[#2eaadc] hover:underline uppercase tracking-widest">View all</Link>
                    </div>
                    <div className="bg-[#202020] rounded border border-[#2f2f2f] divide-y divide-[#2f2f2f]">
                        {data.recentOrders.length > 0 ? (
                            data.recentOrders.map((order) => (
                                <div key={order.id} className="p-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white">
                                            <ShoppingBag size={14} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">{order.customerName}</p>
                                            <p className="text-[10px] text-white uppercase tracking-tight">#{order.id.slice(0, 8)}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-white">{formatPrice(order.total, currency)}</p>
                                        <p className="text-[9px] text-gray-700 uppercase tracking-widest font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <EmptyState 
                                icon={<ShoppingBag size={32} />} 
                                message="No recent activity detected." 
                                className="border-none py-12"
                            />
                        )}
                    </div>
                </div>

                {/* Right: Quick Links & Assets */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest px-1">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <QuickAction href="/dashboard/products/new" label="Product" icon={<Plus size={12} />} />
                            <QuickAction href="/dashboard/posts/new" label="New Post" icon={<Plus size={12} />} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest px-1">Library</h3>
                        <div className="bg-[#202020] rounded border border-[#2f2f2f] divide-y divide-[#2f2f2f]">
                            <LibraryItem label="Blog Posts" value={data.counts.posts} icon={<FileText size={14} />} href="/dashboard/posts" />
                            <LibraryItem label="Products" value={data.counts.products} icon={<ShoppingBag size={14} />} href="/dashboard/products" />
                            <LibraryItem label="Messages" value={data.counts.messages} icon={<MessageSquare size={14} />} href="/dashboard/inbox" />
                            <LibraryItem label="Media Assets" value={data.counts.media} icon={<ImageIcon size={14} />} href="/dashboard/media" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

