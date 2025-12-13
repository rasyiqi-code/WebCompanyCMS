import React, { useId } from "react";
import type { ComponentConfig } from "@measured/puck";
import { ColorPickerField } from "./fields/ColorPickerField";
import { ResponsiveSliderField, type ResponsiveValue } from "./fields/ResponsiveSliderField";

export type CTAProps = {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    backgroundColor?: string;
    padding?: ResponsiveValue;
    titleSize?: ResponsiveValue;
    titleColor?: string;
    descriptionSize?: ResponsiveValue;
    descriptionColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
};

export const CTA: ComponentConfig<CTAProps> = {
    label: "Call to Action",
    fields: {
        title: { type: "text", label: "Title" },
        subtitle: { type: "textarea", label: "Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        buttonLink: { type: "text", label: "Button Link" },
        backgroundColor: {
            type: "custom",
            label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        padding: {
            type: "custom",
            label: "Padding (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={0} max={200} step={4} />
        },
        titleSize: {
            type: "custom",
            label: "Title Size (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={16} max={96} step={2} />
        },
        titleColor: {
            type: "custom",
            label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        descriptionSize: {
            type: "custom",
            label: "Description Size (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={12} max={48} step={1} />
        },
        descriptionColor: {
            type: "custom",
            label: "Description Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        buttonColor: {
            type: "custom",
            label: "Button Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        buttonTextColor: {
            type: "custom",
            label: "Button Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
    },
    defaultProps: {
        title: "Siap Menerbitkan Buku Anda?",
        subtitle: "Hubungi kami sekarang untuk konsultasi gratis",
        buttonText: "Mulai Sekarang",
        buttonLink: "#contact",
        backgroundColor: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)",
        padding: { desktop: 100, tablet: 80, mobile: 60 },
        titleSize: { desktop: 56, tablet: 48, mobile: 32 },
        titleColor: "#ffffff",
        descriptionSize: { desktop: 20, tablet: 18, mobile: 16 },
        descriptionColor: "rgba(255, 255, 255, 0.95)",
        buttonColor: "#ffffff",
        buttonTextColor: "#dc2626",
    },
    render: ({
        title,
        subtitle,
        buttonText,
        buttonLink,
        backgroundColor = "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)",
        padding = { desktop: 100, tablet: 80, mobile: 60 },
        titleSize = { desktop: 56, tablet: 48, mobile: 32 },
        titleColor = "#ffffff",
        descriptionSize = { desktop: 20, tablet: 18, mobile: 16 },
        descriptionColor = "rgba(255, 255, 255, 0.95)",
        buttonColor = "#ffffff",
        buttonTextColor = "#dc2626",
    }) => {
        const id = useId().replace(/:/g, ''); // React ID, sanitized
        const uniqueClass = `cta-${id}`;

        const getVal = (val: ResponsiveValue | undefined, fallback: number) => {
            // Handle raw number (legacy) or object
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
            <section className={uniqueClass} style={{
                background: backgroundColor,
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .${uniqueClass} {
                            padding: ${getVal(padding, 100)}px 20px;
                        }
                        .${uniqueClass} .cta-title {
                            font-size: ${getVal(titleSize, 56)}px;
                        }
                        .${uniqueClass} .cta-desc {
                            font-size: ${getVal(descriptionSize, 20)}px;
                        }

                        @media (max-width: 1024px) {
                            .${uniqueClass} {
                                padding: ${getTabletVal(padding, 80)}px 20px;
                            }
                            .${uniqueClass} .cta-title {
                                font-size: ${getTabletVal(titleSize, 48)}px;
                            }
                            .${uniqueClass} .cta-desc {
                                font-size: ${getTabletVal(descriptionSize, 18)}px;
                            }
                        }

                        @media (max-width: 640px) {
                            .${uniqueClass} {
                                padding: ${getMobileVal(padding, 60)}px 20px;
                            }
                            .${uniqueClass} .cta-title {
                                font-size: ${getMobileVal(titleSize, 32)}px;
                            }
                            .${uniqueClass} .cta-desc {
                                font-size: ${getMobileVal(descriptionSize, 16)}px;
                            }
                        }
                    `
                }} />

                {/* Decorative elements */}
                <div style={{
                    position: 'absolute',
                    width: 'clamp(300px, 50vw, 500px)',
                    height: 'clamp(300px, 50vw, 500px)',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    top: '-250px',
                    left: '-100px',
                }} />
                <div style={{
                    position: 'absolute',
                    width: 'clamp(250px, 40vw, 400px)',
                    height: 'clamp(250px, 40vw, 400px)',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    bottom: '-200px',
                    right: '-100px',
                }} />

                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <h2 className="cta-title" style={{
                        color: titleColor,
                        marginBottom: '1.5rem',
                        fontWeight: '800',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                    }}>
                        {title}
                    </h2>
                    <p className="cta-desc" style={{
                        color: descriptionColor,
                        marginBottom: 'clamp(2rem, 5vw, 3rem)',
                        lineHeight: '1.6',
                    }}>
                        {subtitle}
                    </p>
                    <a
                        href={buttonLink}
                        style={{
                            display: 'inline-block',
                            backgroundColor: buttonColor,
                            color: buttonTextColor,
                            padding: 'clamp(14px, 3vw, 18px) clamp(32px, 8vw, 56px)',
                            minHeight: '48px',
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            fontWeight: '800',
                            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
                        }}
                    >
                        {buttonText} →
                    </a>
                </div>
            </section>
        );
    },
};
