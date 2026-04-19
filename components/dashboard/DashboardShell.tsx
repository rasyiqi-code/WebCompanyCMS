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
    X,
    Search,
    Bell,
    Layers
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
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
    const pathname = usePathname();
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
                { href: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Overview", roles: ["admin", "editor", "user"] },
            ]
        },
        {
            title: "Commerce",
            items: [
                { href: "/dashboard/products", icon: <ShoppingBag size={18} />, label: "Products", roles: ["admin", "editor", "user"] },
                { href: "/dashboard/orders", icon: <ShoppingBag size={18} />, label: "Orders", roles: ["admin", "editor", "user"] },
            ]
        },
        {
            title: "Content",
            items: [
                { href: "/dashboard/pages", icon: <FileText size={18} />, label: "Pages", roles: ["admin", "editor"] },
                { href: "/dashboard/menus", icon: <Menu size={18} />, label: "Menus", roles: ["admin", "editor"] },
                { href: "/dashboard/posts", icon: <FileText size={18} />, label: "Blog Posts", roles: ["admin", "editor"] },
                { href: "/dashboard/media", icon: <ImageIcon size={18} />, label: "Media Library", roles: ["admin", "editor"] },
                { href: "/dashboard/gallery", icon: <FileText size={18} />, label: "Gallery", roles: ["admin", "editor"] },
                { href: "/dashboard/portfolios", icon: <Briefcase size={18} />, label: "Portfolio", roles: ["admin", "editor"] },
                { href: "/dashboard/taxonomies", icon: <Layers size={18} />, label: "Categories & Tags", roles: ["admin", "editor"] },
                { href: "/dashboard/inbox", icon: <FileText size={18} />, label: "Inbox / Messages", roles: ["admin", "editor"] },
                { href: "/dashboard/testimonials", icon: <Users size={18} />, label: "Testimonials", roles: ["admin", "editor"] },
            ]
        },
        {
            title: "System",
            items: [
                { href: "/dashboard/users", icon: <Users size={18} />, label: "Users & Roles", roles: ["admin"] },
                { href: "/dashboard/settings/header", icon: <LayoutDashboard size={18} />, label: "Header & Chat", roles: ["admin"] },
                { href: "/dashboard/settings", icon: <Settings size={18} />, label: "General Settings", roles: ["admin"] },
                { href: "/dashboard/settings/payments", icon: <Settings size={18} />, label: "Payment Settings", roles: ["admin"] },
            ]
        }
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-[#202020] border-r border-[#2f2f2f]">
            <div className="h-12 flex items-center px-4 border-b border-[#2f2f2f] justify-between">
                <Link href="/" target="_blank" className="flex items-center gap-2.5 group">
                    <div className="w-6 h-6 rounded bg-[#373737] flex items-center justify-center text-white font-bold text-[11px] transition-colors group-hover:bg-[#404040]">
                        {siteName[0]}
                    </div>
                    <span className="text-sm font-semibold text-white tracking-tight">
                        {siteName}
                    </span>
                </Link>
                {/* Close button for mobile */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="md:hidden text-white hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 p-2 space-y-4 overflow-y-auto custom-scrollbar pr-1">
                {navItems.map((section, i) => {
                    const visibleItems = section.items.filter(item =>
                        !item.roles || item.roles.includes(session?.user?.role || "user")
                    );

                    if (visibleItems.length === 0) return null;

                    return (
                        <div key={i} className="space-y-0.5">
                            {section.title && (
                                <p className="px-3 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">
                                    {section.title}
                                </p>
                            )}
                            {visibleItems.map((item) => (
                                <div key={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                    <NavItem {...item} isActive={pathname === item.href} />
                                </div>
                            ))}
                        </div>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-[#2f2f2f]">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center w-full px-3 py-1.5 text-xs font-medium text-white rounded hover:bg-white/[0.03] hover:text-white transition-colors group"
                >
                    <LogOut size={14} className="mr-3 opacity-70" />
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-[#191919] text-white font-sans selection:bg-gray-700">
            {/* Desktop Sidebar */}
            <aside className="w-64 hidden md:flex flex-col z-20">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full h-full shadow-2xl animate-in slide-in-from-left duration-300">
                        <SidebarContent />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-12 bg-[#191919] border-b border-[#2f2f2f] flex items-center justify-between px-4 z-10 sticky top-0">
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-1.5 -ml-1 text-white rounded hover:bg-white/5 transition-colors"
                        >
                            <Menu size={18} />
                        </button>
                        <span className="ml-2 text-sm font-bold tracking-tight">{siteName}</span>
                    </div>

                    <div className="hidden md:flex items-center bg-white/[0.03] border border-[#2f2f2f] rounded px-3 py-1 w-64 group focus-within:bg-white/[0.05] transition-all">
                        <Search size={14} className="text-white" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="bg-transparent border-none focus:ring-0 text-xs ml-2 w-full text-white placeholder-gray-500"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <button className="p-1.5 text-white hover:text-white hover:bg-white/5 rounded transition-all">
                            <Bell size={16} />
                        </button>
                        
                        <div className="h-4 w-[1px] bg-[#2f2f2f] mx-1"></div>

                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 hover:bg-white/5 px-2 py-1 rounded transition-all"
                            >
                                <div className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-white text-[10px] font-bold">
                                    {(session?.user?.name?.[0] || "A").toUpperCase()}
                                </div>
                                <div className="hidden md:block text-xs text-left">
                                    <p className="font-bold text-white leading-none">{session?.user?.name || "Admin"}</p>
                                </div>
                                <ChevronDown size={12} className={`text-white transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 w-52 bg-[#202020] border border-[#2f2f2f] rounded-lg shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="px-3 py-2 border-b border-[#2f2f2f] mb-1">
                                            <p className="text-[10px] text-white uppercase tracking-widest font-bold mb-0.5">Account</p>
                                            <p className="text-xs font-medium truncate text-white">{session?.user?.email}</p>
                                        </div>
                                        <Link href="/dashboard/profile" className="flex items-center px-3 py-1.5 text-xs text-white hover:text-white hover:bg-white/5 transition-colors rounded mx-1">
                                            <User size={14} className="mr-2" />
                                            Settings
                                        </Link>
                                        <div className="h-[1px] bg-[#2f2f2f] my-1.5"></div>
                                        <button
                                            onClick={() => signOut({ callbackUrl: "/login" })}
                                            className="flex w-full items-center px-3 py-1.5 text-xs text-red-500 hover:bg-red-500/10 transition-colors rounded mx-1"
                                        >
                                            <LogOut size={14} className="mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-[#191919] p-4 md:p-6">
                    <div className="w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

function NavItem({ href, icon, label, isActive }: { href: string; icon: React.ReactNode; label: string; isActive: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center px-3 py-1 text-sm font-medium rounded transition-colors group relative ${
                isActive 
                    ? "bg-white/[0.05] text-white" 
                    : "text-white hover:text-white hover:bg-white/[0.03]"
            }`}
        >
            <span className={`mr-2.5 transition-colors ${isActive ? "text-white" : "text-white group-hover:text-white"}`}>
                {icon}
            </span>
            {label}
        </Link>
    );
}
