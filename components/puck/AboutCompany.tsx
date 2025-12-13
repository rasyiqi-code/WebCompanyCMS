
import React, { useId } from "react";
import type { ComponentConfig } from "@measured/puck";
import { ColorPickerField } from "./fields/ColorPickerField";
import { ResponsiveSliderField, type ResponsiveValue } from "./fields/ResponsiveSliderField";

export type AboutCompanyProps = {
    imageUrl: string;
    content: string;
    backgroundColor?: string;
    padding?: ResponsiveValue;
    textColor?: string;
    gap?: ResponsiveValue;
    fontSize?: ResponsiveValue;
};

export const AboutCompany: ComponentConfig<AboutCompanyProps> = {
    label: "About Company",
    fields: {
        imageUrl: { type: "text", label: "Image URL" },
        content: { type: "textarea", label: "Content" },
        backgroundColor: {
            type: "custom",
            label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        padding: {
            type: "custom",
            label: "Section Padding (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={0} max={200} step={4} />
        },
        textColor: {
            type: "custom",
            label: "Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        gap: {
            type: "custom",
            label: "Gap (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={0} max={100} step={4} defaultValue={{ desktop: 32, tablet: 24, mobile: 16 }} />
        },
        fontSize: {
            type: "custom",
            label: "Font Size (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={10} max={40} step={1} defaultValue={{ desktop: 18, tablet: 16, mobile: 16 }} />
        },
    },
    defaultProps: {
        imageUrl: "https://via.placeholder.com/600x400",
        content: "Sejak tahun 2017, Kami telah menerbitkan ribuan judul buku ber-ISBN dan telah menjadi anggota resmi Ikatan Penerbit Indonesia (IKAPI). Serta memiliki hak legal untuk memproses Hak Kekayaan Intelektual (HAKI) buku yang dikeluarkan KEMENKUMHAM RI. Sehingga saat ini kami akan menerima segala jenis penerbitan dan cetakan naskah dari berbagai jenis tulisan dan cetak ulang buku-buku yang sudah pernah diterbitkan di penerbit lain.",
        backgroundColor: "#ffffff",
        padding: { desktop: 48, tablet: 32, mobile: 24 },
        textColor: "#374151",
        gap: { desktop: 32, tablet: 24, mobile: 16 },
        fontSize: { desktop: 18, tablet: 16, mobile: 16 },
    },
    render: ({
        imageUrl,
        content,
        backgroundColor = "#ffffff",
        padding = { desktop: 48, tablet: 32, mobile: 24 },
        textColor = "#374151",
        gap = { desktop: 32, tablet: 24, mobile: 16 },
        fontSize = { desktop: 18, tablet: 16, mobile: 16 },
    }) => {
        const id = useId().replace(/:/g, ''); // React ID, sanitized
        const uniqueClass = `about-company-${id}`;

        const getVal = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.desktop ?? fallback;
        };
        const getTabletVal = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.tablet ?? val?.desktop ?? fallback;
        };
        const getMobileVal = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.mobile ?? val?.tablet ?? val?.desktop ?? fallback;
        };

        return (
            <section className={uniqueClass} style={{ backgroundColor: backgroundColor }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .${uniqueClass} {
                            padding: ${getVal(padding, 48)}px 16px;
                        }
                        .${uniqueClass} .about-grid {
                            gap: ${getVal(gap, 32)}px;
                        }
                        .${uniqueClass} .about-text {
                            font-size: ${getVal(fontSize, 18)}px;
                        }

                        @media (min-width: 768px) {
                            .${uniqueClass} {
                                padding: ${getVal(padding, 48)}px 32px;
                            }
                        }

                        @media (max-width: 1024px) {
                            .${uniqueClass} {
                                padding: ${getTabletVal(padding, 32)}px 16px;
                            }
                             .${uniqueClass} .about-grid {
                                gap: ${getTabletVal(gap, 24)}px;
                            }
                             .${uniqueClass} .about-text {
                                font-size: ${getTabletVal(fontSize, 16)}px;
                            }
                        }
                        @media (max-width: 640px) {
                            .${uniqueClass} {
                                padding: ${getMobileVal(padding, 24)}px 16px;
                            }
                             .${uniqueClass} .about-grid {
                                gap: ${getMobileVal(gap, 16)}px;
                            }
                             .${uniqueClass} .about-text {
                                font-size: ${getMobileVal(fontSize, 16)}px;
                            }
                        }
                    `
                }} />

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center about-grid">
                    <div className="rounded-xl overflow-hidden shadow-sm">
                        <img
                            src={imageUrl}
                            alt="About Us"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="leading-relaxed about-text" style={{ color: textColor }}>
                        {/* Simple paragraph splitting */}
                        {content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-4 last:mb-0">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>
        );
    },
};
