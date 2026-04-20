"use client";

import type { ComponentConfig } from "@credbuild/core";
import React from "react";
import Image from "next/image";
import { ColorPickerField } from "./fields/ColorPickerField";

const RenderField1 = ({ value, onChange }: any) => <ColorPickerField value={value} onChange={onChange} />;


export type GalleryProps = {
    title: string;
    variant: "red" | "white";
    scrollMode: "grid" | "horizontal";
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    aspectRatio?: "portrait" | "square" | "landscape" | "video";
    imageFit?: "cover" | "contain";
    backgroundColor?: string;
};

const GalleryRender = ({ title, variant, scrollMode, columnsDesktop, columnsTablet, columnsMobile, backgroundColor, aspectRatio, imageFit }: GalleryProps) => {
    const [items, setItems] = React.useState<{ title: string; url: string; description: string }[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch("/api/gallery")
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const isHorizontal = scrollMode === "horizontal";
    const defaultBg = variant === "red" ? "#7f1d1d" : "#ffffff";
    const finalBg = backgroundColor || defaultBg;

    let paddingBottom = "140%"; // Default Portrait
    if (aspectRatio === "square") paddingBottom = "100%";
    if (aspectRatio === "landscape") paddingBottom = "75%";
    if (aspectRatio === "video") paddingBottom = "56.25%";

    const fit = imageFit || "cover";

    if (loading) return <div className="p-10 text-center">Loading Gallery...</div>;
    if (items.length === 0) return <div className="p-10 text-center text-gray-400">No images found. Please add them in the Dashboard.</div>;

    return (
        <section style={{
            padding: 'clamp(50px, 8vw, 80px) 20px',
            backgroundColor: finalBg,
            color: variant === "red" ? "white" : "#1e293b",
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                    marginBottom: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: '800',
                }}>
                    {title}
                </h2>

                {isHorizontal ? (
                    <div style={{
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'thin',
                        paddingBottom: '20px',
                        marginLeft: '-20px',
                        marginRight: '-20px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: 'clamp(16px, 3vw, 24px)',
                            minWidth: 'min-content',
                        }}>
                            {items.map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        backgroundColor: variant === "red" ? "#991b1b" : "#f8fafc",
                                        borderRadius: '12px',
                                        padding: '0',
                                        overflow: 'hidden',
                                        boxShadow: variant === "red" ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
                                        flexShrink: 0,
                                        width: 'clamp(200px, 30vw, 300px)',
                                        scrollSnapAlign: 'start',
                                    }}
                                >
                                    <div style={{
                                        width: '100%',
                                        paddingTop: paddingBottom,
                                        backgroundColor: variant === "red" ? "#7f1d1d" : "#e5e7eb",
                                        position: 'relative',
                                    }}>
                                        {item.url ? (
                                            <Image
                                                src={item.url}
                                                alt={item.title}
                                                fill
                                                className={`object-${fit}`}
                                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                            />
                                        ) : (
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '2rem',
                                                opacity: 0.5,
                                            }}>
                                                🖼️
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: '16px' }}>
                                        <p style={{ fontWeight: '600', textAlign: 'center', fontSize: '0.95rem' }}>{item.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="gallery-container">
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .gallery-grid {
                                display: grid;
                                grid-template-columns: repeat(${columnsMobile || 2}, 1fr);
                                gap: 16px;
                            }
                            @media (min-width: 768px) {
                                .gallery-grid {
                                    grid-template-columns: repeat(${columnsTablet || 3}, 1fr);
                                    gap: 24px;
                                }
                            }
                            @media (min-width: 1024px) {
                                .gallery-grid {
                                    grid-template-columns: repeat(${columnsDesktop || 5}, 1fr);
                                }
                            }
                        `}} />
                        <div className="gallery-grid">
                            {items.map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        backgroundColor: variant === "red" ? "#991b1b" : "#f8fafc",
                                        borderRadius: '12px',
                                        padding: '0',
                                        overflow: 'hidden',
                                        boxShadow: variant === "red" ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
                                    }}
                                >
                                    <div style={{
                                        width: '100%',
                                        paddingTop: paddingBottom,
                                        backgroundColor: variant === "red" ? "#7f1d1d" : "#e5e7eb",
                                        position: 'relative',
                                    }}>
                                        {item.url ? (
                                            <Image
                                                src={item.url}
                                                alt={item.title}
                                                fill
                                                className={`object-${fit}`}
                                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                            />
                                        ) : (
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '2rem',
                                                opacity: 0.5,
                                            }}>
                                                🖼️
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: '16px' }}>
                                        <p style={{ fontWeight: '600', textAlign: 'center', fontSize: '0.95rem' }}>{item.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export const Gallery: ComponentConfig<GalleryProps> = {
    label: "Gallery",
    fields: {
        title: { type: "text", label: "📝 Title" },
        variant: {
            type: "select",
            label: "🎨 Style",
            options: [
                { label: "Red Background (Dark Theme)", value: "red" },
                { label: "White Background (Light Theme)", value: "white" },
            ],
        },
        scrollMode: {
            type: "select",
            label: "📱 Layout Mode",
            options: [
                { label: "Responsive Grid", value: "grid" },
                { label: "Horizontal Scroll", value: "horizontal" },
            ],
        },
        columnsDesktop: { type: "number", label: "🖥️ Columns (Desktop)", placeholder: "5" },
        columnsTablet: { type: "number", label: "📱 Columns (Tablet)", placeholder: "3" },
        columnsMobile: { type: "number", label: "📱 Columns (Mobile)", placeholder: "2" },
        aspectRatio: {
            type: "select",
            label: "🖼️ Aspect Ratio",
            options: [
                { label: "Portrait (3:4)", value: "portrait" },
                { label: "Square (1:1)", value: "square" },
                { label: "Landscape (4:3)", value: "landscape" },
                { label: "Video (16:9)", value: "video" },
            ]
        },
        imageFit: {
            type: "radio",
            label: "Thinking Image Fit",
            options: [
                { label: "Cover (Fill)", value: "cover" },
                { label: "Contain (Fit)", value: "contain" },
            ]
        },
        backgroundColor: {
            type: "custom",
            label: "Custom Background Color",
            render: RenderField1
        },
    },
    defaultProps: {
        title: "Buku Terbitan KBM",
        variant: "red" as const,
        scrollMode: "grid" as const,
        columnsDesktop: 5,
        columnsTablet: 3,
        columnsMobile: 2,
    },
    render: GalleryRender,
};
