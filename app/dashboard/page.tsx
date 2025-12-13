import React from "react";
import { FileText, ShoppingBag, Users, Eye, MessageSquare, Image, Briefcase, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import {
    posts,
    products,
    orders,
    users,
    siteStatistics,
    contactSubmissions,
    galleryItems,
    portfolioItems,
    mediaItems
} from "@/db/schema";
import { desc, sql } from "drizzle-orm";

async function getCounts() {
    // Helper to get count from table
    const getCount = async (table: any) => {
        try {
            const res = await db.select({ count: sql<number>`count(*)` }).from(table);
            return Number(res[0].count);
        } catch (e) {
            return 0;
        }
    };

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
        mediaSize
    ] = await Promise.all([
        getCount(posts),
        getCount(products),
        getCount(orders),
        getCount(users),
        getCount(mediaItems),
        getCount(galleryItems),
        getCount(portfolioItems),
        getCount(contactSubmissions),
        db.select().from(siteStatistics).limit(1),
        db.select({ totalSize: sql<number>`sum(size)` }).from(mediaItems)
    ]);

    return {
        postsCount,
        productsCount,
        ordersCount,
        usersCount,
        mediaCount,
        galleryCount,
        portfolioCount,
        messagesCount,
        views: stats[0]?.totalViews || 0,
        todayViews: stats[0]?.todayViews || 0,
        storageUsed: Number(mediaSize[0]?.totalSize || 0)
    };
}

async function getRecentActivity() {
    const recentOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(3);
    const recentMessages = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)).limit(3);

    return { recentOrders, recentMessages };
}

// ... existing code ...

export default async function DashboardPage() {
    const counts = await getCounts();
    const activity = await getRecentActivity();

    // R2 Stats
    const totalStorage = 10 * 1024 * 1024 * 1024; // 10 GB
    const usedStorage = counts.storageUsed;
    const storagePercent = Math.min((usedStorage / totalStorage) * 100, 100);

    return (
        <div>
            {/* ... existing header ... */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">REAL-TIME Data from Database.</p>
            </div>

            {/* R2 Usage Banner */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-orange-200 rounded-lg text-orange-700">
                            <Image size={20} />
                        </div>
                        <h3 className="font-bold text-orange-900">Cloudflare R2 Storage</h3>
                    </div>
                    <p className="text-sm text-orange-800 mb-3">
                        Free Tier: Up to <strong>10GB storage</strong>, 1M Class A ops, 10M Class B ops / month.
                    </p>
                    <div className="w-full bg-orange-200 rounded-full h-2.5 mb-1">
                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${storagePercent}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-orange-700 font-medium">
                        <span>Used: {(usedStorage / 1024 / 1024).toFixed(2)} MB</span>
                        <span>Limit: 10 GB</span>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={<Eye className="text-orange-600" />}
                    label="Page Views"
                    value={counts.views.toLocaleString()}
                    change={`+${counts.todayViews} today`}
                />
                <StatCard
                    icon={<ShoppingBag className="text-emerald-600" />}
                    label="Total Orders"
                    value={counts.ordersCount}
                    change="Lifetime"
                />
                <StatCard
                    icon={<Users className="text-purple-600" />}
                    label="Registered Users"
                    value={counts.usersCount}
                    change="Active"
                />
                <StatCard
                    icon={<MessageSquare className="text-blue-600" />}
                    label="Messages"
                    value={counts.messagesCount}
                    change="Inbox"
                />
            </div>

            {/* Content Stats */}
            <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">Content Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <StatCardSmall icon={<FileText size={18} />} label="Blog Posts" value={counts.postsCount} />
                <StatCardSmall icon={<ShoppingBag size={18} />} label="Products" value={counts.productsCount} />
                <StatCardSmall icon={<Image size={18} />} label="Gallery" value={counts.galleryCount} />
                <StatCardSmall icon={<Briefcase size={18} />} label="Portfolio" value={counts.portfolioCount} />
                <StatCardSmall icon={<Image size={18} />} label="Media Library" value={counts.mediaCount} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Recent Activity: Orders & Messages */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {activity.recentOrders.length === 0 && activity.recentMessages.length === 0 && (
                            <p className="text-gray-400 text-sm">No recent activity found.</p>
                        )}

                        {activity.recentOrders.map(order => (
                            <ActivityItem
                                key={order.id}
                                action="New Order"
                                target={`${order.customerName} - ${order.total}`}
                                time={new Date(order.createdAt).toLocaleDateString()}
                            />
                        ))}

                        {activity.recentMessages.map(msg => (
                            <ActivityItem
                                key={msg.id}
                                action="New Message"
                                target={`${msg.name}: ${msg.subject}`}
                                time={new Date(msg.createdAt).toLocaleDateString()}
                            />
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <ActionButton href="/dashboard/posts/new" label="Write Post" icon={<Plus size={16} />} />
                        <ActionButton href="/dashboard/products" label="Add Product" icon={<Plus size={16} />} />
                        <ActionButton href="/dashboard/gallery" label="Upload Gallery" icon={<Image size={16} />} />
                        <ActionButton href="/dashboard/settings" label="Site Settings" icon={<Settings size={16} />} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, change }: any) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
            </div>
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
            <div className="flex items-end justify-between mt-1">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{change}</span>
            </div>
        </div>
    );
}

function StatCardSmall({ icon, label, value }: any) {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="text-gray-500">{icon}</div>
                <h3 className="text-sm font-medium text-gray-600">{label}</h3>
            </div>
            <span className="text-lg font-bold text-gray-900">{value}</span>
        </div>
    );
}

function ActivityItem({ action, target, time }: any) {
    return (
        <div className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
            <div>
                <p className="text-sm font-medium text-gray-900">{action}</p>
                <p className="text-sm text-gray-600 truncate max-w-[200px]">{target}</p>
                <span className="text-xs text-gray-400 mt-1 block">{time}</span>
            </div>
        </div>
    )
}

function ActionButton({ label, href, icon }: any) {
    return (
        <Link href={href || "#"} className="flex flex-col items-center justify-center p-4 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all text-center gap-2">
            {icon}
            {label}
        </Link>
    )
}
