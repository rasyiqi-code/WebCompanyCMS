"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Palette, LayoutTemplate, Share2 } from "lucide-react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const tabs = [
        { name: "General", href: "/dashboard/settings/general", icon: Settings },
        { name: "Branding", href: "/dashboard/settings/branding", icon: Palette },
        { name: "Header", href: "/dashboard/settings/header", icon: LayoutTemplate },
        { name: "Footer", href: "/dashboard/settings/footer", icon: LayoutTemplate },
    ];

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>

            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${isActive
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            <tab.icon size={18} className="mr-2" />
                            {tab.name}
                        </Link>
                    );
                })}
            </div>

            {children}
        </div>
    );
}
