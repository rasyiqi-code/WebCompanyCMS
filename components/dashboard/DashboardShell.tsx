"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    FileText,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Menu,
    Briefcase,
    Image as ImageIcon,
    ChevronDown,
    User,
    X
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/components/providers/cart-provider";
import { SiteSettings } from "../../lib/settings";

interface DashboardShellProps {
    children: React.ReactNode;
    initialSettings?: SiteSettings | null;
}

export default function DashboardShell({
    children,
    initialSettings
}: DashboardShellProps) {
    const { data: session } = useSession();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [siteName, setSiteName] = useState(initialSettings?.siteName || "Builder CMS");

    // We can't use useCart directly here if DashboardLayout is a Server Component?
    // Wait, I made DashboardLayout "use client" earlier in Step 1493. So it is safe.
    // const { toggleCart, cartCount } = useCart(); // Unused in dashboard sidebar currently?

    useEffect(() => {
        if (!initialSettings) {
            fetch("/api/settings")
                .then(res => res.json())
                .then(data => {
                    if (data?.siteName) {
                        setSiteName(data.siteName);
                    }
                })
                .catch(err => console.error(err));
        }
    }, [initialSettings]);

    const navItems = [
        {
            title: null,
            items: [
                { href: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Overview", roles: ["admin", "editor", "user"] },
            ]
        },
        {
            title: "Commerce",
            items: [
                { href: "/dashboard/products", icon: <ShoppingBag size={20} />, label: "Products", roles: ["admin", "editor", "user"] },
                { href: "/dashboard/orders", icon: <ShoppingBag size={20} />, label: "Orders", roles: ["admin", "editor", "user"] },
            ]
        },
        {
            title: "Content",
            items: [
                { href: "/dashboard/pages", icon: <FileText size={20} />, label: "Pages", roles: ["admin", "editor"] },
                { href: "/dashboard/menus", icon: <Menu size={20} />, label: "Menus", roles: ["admin", "editor"] },
                { href: "/dashboard/posts", icon: <FileText size={20} />, label: "Blog Posts", roles: ["admin", "editor"] },
                { href: "/dashboard/media", icon: <ImageIcon size={20} />, label: "Media Library", roles: ["admin", "editor"] },
                { href: "/dashboard/gallery", icon: <FileText size={20} />, label: "Gallery", roles: ["admin", "editor"] },
                { href: "/dashboard/portfolios", icon: <Briefcase size={20} />, label: "Portfolio", roles: ["admin", "editor"] },
                { href: "/dashboard/inbox", icon: <FileText size={20} />, label: "Inbox / Messages", roles: ["admin", "editor"] },
                { href: "/dashboard/testimonials", icon: <Users size={20} />, label: "Testimonials", roles: ["admin", "editor"] },
            ]
        },
        {
            title: "System",
            items: [
                { href: "/dashboard/users", icon: <Users size={20} />, label: "Users & Roles", roles: ["admin"] },
                { href: "/dashboard/settings/header", icon: <LayoutDashboard size={20} />, label: "Header & Chat", roles: ["admin"] },
                { href: "/dashboard/settings", icon: <Settings size={20} />, label: "General Settings", roles: ["admin"] },
                { href: "/dashboard/settings/payments", icon: <Settings size={20} />, label: "Payment Settings", roles: ["admin"] },
            ]
        }
    ];

    const SidebarContent = () => (
        <>
            <div className="h-16 flex items-center px-6 border-b border-gray-200 justify-between">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {siteName}
                </span>
                {/* Close button for mobile */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="md:hidden text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((section, i) => {
                    // Filter items based on role
                    const visibleItems = section.items.filter(item =>
                        !item.roles || item.roles.includes(session?.user?.role || "user")
                    );

                    if (visibleItems.length === 0) return null;

                    return (
                        <React.Fragment key={i}>
                            {section.title && (
                                <div className={`pb-2 ${i > 0 ? "pt-4" : ""}`}>
                                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        {section.title}
                                    </p>
                                </div>
                            )}
                            {visibleItems.map((item) => (
                                <div key={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                    <NavItem {...item} />
                                </div>
                            ))}
                        </React.Fragment>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                    <LogOut size={20} className="mr-3" />
                    Sign Out
                </button>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white h-full shadow-xl">
                        <SidebarContent />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 -ml-2 text-gray-600 rounded-md hover:bg-gray-100"
                        >
                            <Menu size={24} />
                        </button>
                        <span className="ml-4 text-lg font-bold text-gray-900">{siteName}</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {/* Placeholder for Breadcrumbs or Search */}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                    {(session?.user?.name?.[0] || "A").toUpperCase()}
                                </div>
                                <div className="hidden md:block text-sm text-left">
                                    <p className="font-medium text-gray-700">{session?.user?.name || "Admin User"}</p>
                                    <p className="text-xs text-gray-500">{session?.user?.email || "Administrator"}</p>
                                </div>
                                <div className="hidden md:block">
                                    <ChevronDown size={16} className="text-gray-400" />
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                                    <Link href="/dashboard/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <User size={16} className="mr-2" />
                                        My Profile
                                    </Link>
                                    <Link href="/dashboard/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <Settings size={16} className="mr-2" />
                                        Settings
                                    </Link>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/login" })}
                                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors group"
        >
            <span className="mr-3 text-gray-400 group-hover:text-blue-600 transition-colors">{icon}</span>
            {label}
        </Link>
    );
}
