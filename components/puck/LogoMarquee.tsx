
import React from "react";
import type { ComponentConfig } from "@measured/puck";
import { ColorPickerField } from "./fields/ColorPickerField";

export type LogoMarqueeProps = {
    title?: string;
    logos: { src: string; alt: string }[];
    speed?: number; // Duration in seconds
    backgroundColor?: string;
    padding?: string;
    titleColor?: string;
    titleSize?: string;
    grayscale?: boolean;
};

export const LogoMarquee: ComponentConfig<LogoMarqueeProps> = {
    label: "Logo Marquee",
    fields: {
        title: { type: "text", label: "Title" },
        logos: {
            type: "array",
            arrayFields: {
                src: { type: "text", label: "Logo URL" },
                alt: { type: "text", label: "Alt Text" },
            },
            getItemSummary: (item) => item.src || "Logo",
        },
        speed: { type: "number", label: "Speed (Seconds)", min: 5, max: 100, placeholder: "20" },
        backgroundColor: {
            type: "custom",
            label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        padding: { type: "text", label: "Section Padding" },
        titleColor: {
            type: "custom",
            label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        titleSize: { type: "text", label: "Title Font Size" },
        grayscale: {
            type: "select",
            label: "Grayscale Effect",
            options: [
                { label: "Yes", value: true },
                { label: "No", value: false },
            ],
        },
    },
    defaultProps: {
        title: "",
        logos: [
            { src: "https://via.placeholder.com/150x50?text=Logo+1", alt: "Logo 1" },
            { src: "https://via.placeholder.com/150x50?text=Logo+2", alt: "Logo 2" },
            { src: "https://via.placeholder.com/150x50?text=Logo+3", alt: "Logo 3" },
            { src: "https://via.placeholder.com/150x50?text=Logo+4", alt: "Logo 4" },
            { src: "https://via.placeholder.com/150x50?text=Logo+5", alt: "Logo 5" },
        ],
        speed: 30,
        backgroundColor: "#ffffff",
        padding: "60px 0",
        titleColor: "#64748b",
        titleSize: "1.5rem",
        grayscale: false,
    },
    render: ({
        title,
        logos,
        speed = 30,
        backgroundColor = "#ffffff",
        padding = "60px 0",
        titleColor = "#64748b",
        titleSize = "1.5rem",
        grayscale = false,
    }) => {
        // Duplicate logos to create seamless loop
        const displayLogos = [...logos, ...logos];

        return (
            <section style={{ padding: padding, overflow: "hidden", backgroundColor: backgroundColor }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee {
                    display: flex;
                    width: max-content;
                    animation: scroll ${speed}s linear infinite;
                }
                .marquee:hover {
                    animation-play-state: paused;
                }
            `
                }} />

                {title && (
                    <div style={{ maxWidth: "1200px", margin: "0 auto 40px", padding: "0 20px", textAlign: "center" }}>
                        <h2 style={{ fontSize: titleSize, fontWeight: "600", color: titleColor }}>{title}</h2>
                    </div>
                )}

                <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
                    <div className="marquee">
                        {displayLogos.map((logo, index) => (
                            <div key={index} style={{ flexShrink: 0, padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    style={{
                                        maxHeight: "40px",
                                        width: "auto",
                                        objectFit: "contain",
                                        filter: grayscale ? "grayscale(100%) opacity(0.7)" : "none",
                                        transition: "all 0.3s"
                                    }}
                                    onMouseOver={(e) => {
                                        if (grayscale) {
                                            e.currentTarget.style.filter = "grayscale(0%) opacity(1)";
                                        }
                                        e.currentTarget.style.transform = "scale(1.1)";
                                    }}
                                    onMouseOut={(e) => {
                                        if (grayscale) {
                                            e.currentTarget.style.filter = "grayscale(100%) opacity(0.7)";
                                        }
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    },
};
