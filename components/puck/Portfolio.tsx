"use client";

import type { ComponentConfig } from "@measured/puck";
import React from "react";
import Link from "next/link";

export type PortfolioProps = {
    title: string;
    subtitle: string;
};

export const Portfolio: ComponentConfig<PortfolioProps> = {
    label: "Portfolio / Projects",
    fields: {
        title: { type: "text", label: "Section Title" },
        subtitle: { type: "text", label: "Subtitle" },
    },
    defaultProps: {
        title: "Karya Pilihan",
        subtitle: "Portofolio proyek terbaru yang telah kami kerjakan dengan sepenuh hati.",
    },
    render: ({ title, subtitle }) => {
        const [items, setItems] = React.useState<{ title: string; category: string; imageUrl: string; link?: string }[]>([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            fetch("/api/portfolios")
                .then(res => res.json())
                .then(data => {
                    setItems(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }, []);

        if (loading) return <div className="p-10 text-center">Loading Projects...</div>;
        if (items.length === 0) return <div className="p-10 text-center">No projects found. Please add them in the Dashboard!</div>;

        return (
            <section className="py-20 bg-gray-50 font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Portofolio</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{title}</h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item, i) => (
                            <Link
                                key={i}
                                href={item.link || "#"}
                                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="relative overflow-hidden aspect-[4/3]">
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl">🚀</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <span className="text-white font-medium">Lihat Detail &rarr;</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{item.category}</span>
                                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        )
    }
}
