"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Eye, Share2 } from "lucide-react";
import { SiteSettings } from "../../lib/settings";


interface FooterProps {
    initialSettings?: SiteSettings | null;
}

export default function Footer({ initialSettings }: FooterProps) {
    const [settings, setSettings] = useState<SiteSettings | null>(initialSettings || null);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalViews: 0, todayViews: 0 });

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => setSettings(data))
            .catch((err) => console.error(err));

        fetch("/api/menus?slug=footer")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.items) {
                    setMenuItems(data.items.sort((a: any, b: any) => a.order - b.order));
                }
            })
            .catch((err) => console.error(err));

        // Fetch Analytics
        fetch("/api/analytics")
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error("Failed to fetch analytics", err));
    }, []);

    const socialLinks = [
        { icon: Facebook, href: settings?.socialFacebook, color: "bg-[#3b5998]" },
        { icon: Twitter, href: settings?.socialTwitter, color: "bg-[#1DA1F2]" },
        { icon: Linkedin, href: settings?.socialLinkedin, color: "bg-[#0077b5]" },
        { icon: Phone, href: settings?.socialWhatsapp ? `https://wa.me/${settings.socialWhatsapp}` : null, color: "bg-[#25D366]" }, // WhatsApp
        { icon: Share2, href: settings?.socialTelegram ? `https://t.me/${settings.socialTelegram}` : null, color: "bg-[#0088cc]" }, // Telegram
        { icon: Mail, href: settings?.contactEmail ? `mailto:${settings.contactEmail}` : null, color: "bg-[#ea4335]" },
    ].filter(link => link.href);

    const brandColor = settings?.brandColor || "#CE1111";
    const backgroundColor = settings?.footerBackgroundColor || brandColor;
    const textColor = settings?.footerTextColor || "#ffffff";

    return (
        <footer className="w-full font-sans">
            {/* Top Bar: Background Color */}
            <div className="py-6" style={{ backgroundColor, color: textColor }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Logo Area */}
                    <div className="flex-shrink-0">
                        {settings?.logoUrl ? (
                            <img src={settings.logoUrl} alt={settings.siteName || "Logo"} className="h-12 object-contain" />
                        ) : (
                            <span className="text-2xl font-bold">{settings?.siteName || "Logo"}</span>
                        )}
                    </div>

                    {/* Share Section */}
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">Bagikan:</span>
                        <div className="flex gap-1">
                            {socialLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.href!}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${link.color} w-8 h-8 flex items-center justify-center text-white hover:opacity-90 transition-opacity`}
                                    style={{ borderRadius: '4px' }}
                                >
                                    <link.icon size={16} fill="white" className="text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* View Count */}
                    <div className="bg-white text-gray-700 px-6 py-3 rounded-lg shadow-md flex items-center gap-2 text-sm font-medium">
                        <Eye size={18} />
                        <span>{stats.totalViews} total views, {stats.todayViews} views today</span>
                    </div>

                </div>
            </div>

            {/* Middle Bar: White Background - Address */}
            <div className="bg-white py-4 border-b border-gray-100 shadow-sm relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm md:text-base font-medium" style={{ color: backgroundColor }}>
                    {settings?.footerAddress || "Address not configured."}
                </div>
            </div>

            {/* Bottom Bar: Background Color - Links & Copyright */}
            <div className="py-4" style={{ backgroundColor, color: textColor }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm font-bold">
                    <div className="flex flex-wrap justify-center gap-6">
                        {menuItems.length > 0 ? (
                            menuItems.map((item, idx) => (
                                <Link key={idx} href={item.url} target={item.target} className="hover:underline">
                                    {item.label}
                                </Link>
                            ))
                        ) : (
                            // Fallback if no specific footer menu is set
                            <>
                                <Link href="#" className="hover:underline">Tentang Penerbit</Link>
                                <Link href="#" className="hover:underline">Hubungi</Link>
                                <Link href="#" className="hover:underline">Privacy Policy</Link>
                            </>
                        )}
                    </div>
                    <div>
                        {settings?.footerCopyright || "© All Rights Reserved."}
                    </div>
                </div>
            </div>

        </footer>
    );
}
