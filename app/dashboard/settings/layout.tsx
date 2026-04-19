"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Palette, LayoutTemplate, Share2, CreditCard } from "lucide-react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const tabs = [
        { name: "General", href: "/dashboard/settings/general", icon: Settings },
        { name: "Branding", href: "/dashboard/settings/branding", icon: Palette },
        { name: "Header", href: "/dashboard/settings/header", icon: LayoutTemplate },
        { name: "Footer", href: "/dashboard/settings/footer", icon: LayoutTemplate },
        { name: "Payment", href: "/dashboard/settings/payments", icon: CreditCard },
    ];

    return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4">
            <h1 className="text-2xl font-bold text-white mb-6 tracking-tight">Settings</h1>

            <div className="flex border-b border-[#2f2f2f] mb-8 overflow-x-auto gap-1">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`flex items-center px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap rounded-t border-b-2 ${isActive
                                ? "border-[#2eaadc] text-[#2eaadc] bg-white/[0.02]"
                                : "border-transparent text-white hover:text-white hover:bg-white/[0.01]"
                                }`}
                        >
                            <tab.icon size={16} className="mr-2" />
                            {tab.name}
                        </Link>
                    );
                })}
            </div>

            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
