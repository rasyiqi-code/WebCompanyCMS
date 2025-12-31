"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { SiteSettings } from "../../lib/settings";


interface HeaderProps {
    initialSettings?: SiteSettings | null;
}

export default function Header({ initialSettings }: HeaderProps) {
    const { toggleCart, cartCount } = useCart();
    const [settings, setSettings] = useState<SiteSettings | null>(initialSettings || null);
    const [menuItems, setMenuItems] = useState<any[]>([]);

    // Mobile Menu Toggle State
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const [scrollDirection, setScrollDirection] = useState("up");
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            const direction = scrollY > lastScrollY ? "down" : "up";
            if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
                setScrollDirection(direction);
            }
            setLastScrollY(scrollY > 0 ? scrollY : 0);
        };
        window.addEventListener("scroll", updateScrollDirection);
        return () => {
            window.removeEventListener("scroll", updateScrollDirection);
        }
    }, [scrollDirection, lastScrollY]);

    // const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        // Fetch Settings
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => setSettings(data))
            .catch((err) => console.error(err));

        // Fetch Main Menu
        fetch("/api/menus?slug=main")
            .then(res => res.json())
            .then(data => {
                if (data && data.items) {
                    const sorted = data.items.sort((a: any, b: any) => a.order - b.order);
                    setMenuItems(sorted);
                }
            })
            .catch(err => console.error(err));

    }, []);

    const headerStyle = settings?.headerStyle || "simple";
    const backgroundColor = settings?.headerBackgroundColor || "#ffffff";
    const textColor = settings?.headerTextColor || "#111827";

    if (headerStyle === "centered") {
        return (
            <header
                className={`sticky top-0 z-50 w-full border-b border-gray-100 shadow-sm transition-transform duration-300 ease-in-out ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}`}
                style={{ backgroundColor }}
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">

                    {/* Actions Left - Hamburger for Centered Layout */}
                    <div className="flex-1 flex justify-start items-center">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden p-2 -ml-2 rounded-md transition-colors hover:bg-black/5 relative z-20"
                            style={{ color: textColor }}
                            aria-label="Toggle Menu"
                        >
                            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Logo Center */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                        <Link href="/" className="flex items-center gap-2">
                            {settings?.logoUrl ? (
                                <img src={settings.logoUrl} alt={settings.siteName || "Logo"} className="h-8 w-auto object-contain" />
                            ) : (
                                <span className="text-xl font-bold tracking-tight" style={{ color: textColor }}>
                                    {settings?.siteName || "Builder"}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Actions Right */}
                    <div className="flex-1 flex justify-end items-center gap-4">
                        {(settings?.showCart !== false) && (
                            <button
                                onClick={() => toggleCart()}
                                className="relative rounded-full p-2 transition-colors hover:bg-black/5"
                                style={{ color: textColor }}
                                aria-label="Open Cart"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Centered Navigation Row */}
                <div className="hidden md:flex justify-center border-t border-gray-50/10 py-3">
                    <nav className="flex gap-8">
                        {menuItems.map((link) => (
                            <Link
                                key={link.id}
                                href={link.url}
                                target={link.target || "_self"}
                                className="text-sm font-medium transition-colors hover:opacity-75"
                                style={{ color: textColor }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                {/* Mobile Menu */}
                <div
                    className={`md:hidden border-t border-gray-100/10 overflow-hidden transition-all duration-300 ease-in-out ${showMobileMenu ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
                    style={{ backgroundColor: settings?.headerMobileBackgroundColor || "#f9fafb" }}
                >
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="flex whitespace-nowrap px-4 py-3 gap-6">
                            {menuItems.map((link) => (
                                <Link key={link.id} href={link.url} className="text-sm font-medium hover:opacity-75" style={{ color: textColor }}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </header>
        )
    }

    // Default "Simple" Layout
    return (
        <header
            className={`sticky top-0 z-50 w-full border-b border-gray-100 shadow-sm transition-transform duration-300 ease-in-out ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"}`}
            style={{ backgroundColor }}
        >
            {/* Main Header Row */}
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    {/* Hamburger: Visible on Mobile (default) OR Desktop (if Minimal) */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className={`${headerStyle === "minimal" ? "block" : "md:hidden"} text-gray-700 hover:opacity-75 relative z-20`}
                        style={{ color: textColor }}
                        aria-label="Toggle Menu"
                    >
                        {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link href="/" className="flex items-center gap-2">
                        {settings?.logoUrl ? (
                            <img src={settings.logoUrl} alt={settings.siteName || "Logo"} className="h-8 w-auto object-contain" />
                        ) : (
                            <span className="text-xl font-bold tracking-tight" style={{ color: textColor }}>
                                {settings?.siteName || "Builder"}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Right Side Actions & Nav */}
                <div className="flex items-center gap-8">
                    {/* Desktop Navigation: Visible on Desktop (Simple) ONLY */}
                    {headerStyle !== "minimal" && (
                        <nav className="hidden md:flex md:gap-8">
                            {menuItems.length > 0 ? (
                                menuItems.map((link) => (
                                    <Link
                                        key={link.id}
                                        href={link.url}
                                        target={link.target || "_self"}
                                        className="text-sm font-medium transition-colors hover:opacity-75"
                                        style={{ color: textColor }}
                                    >
                                        {link.label}
                                    </Link>
                                ))
                            ) : (
                                // Fallback if no menu items
                                <span className="text-sm italic opacity-50" style={{ color: textColor }}>Configure menu in Dashboard</span>
                            )}
                        </nav>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {(settings?.showCart !== false) && (
                            <button
                                onClick={() => toggleCart()}
                                className="relative rounded-full p-2 transition-colors hover:bg-black/5"
                                style={{ color: textColor }}
                                aria-label="Open Cart"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile/Minimal Horizontal Scroll Menu */}
            <div
                className={`${headerStyle === "minimal" ? "block" : "md:hidden"} border-t border-gray-100/10 overflow-hidden transition-all duration-300 ease-in-out ${showMobileMenu ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
                style={{ backgroundColor: settings?.headerMobileBackgroundColor || "#f9fafb" }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="flex whitespace-nowrap py-3 gap-6" style={{ paddingLeft: headerStyle === "minimal" ? '40px' : '0' }}>
                            {menuItems.map((link) => (
                                <Link
                                    key={link.id}
                                    href={link.url}
                                    target={link.target || "_self"}
                                    className="text-sm font-medium hover:opacity-75"
                                    style={{ color: textColor }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {menuItems.length === 0 && <span className="text-sm italic opacity-50" style={{ color: textColor }}>No menu items</span>}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
