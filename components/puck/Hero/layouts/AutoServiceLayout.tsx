import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "../../fields/SliderField";
import { ResponsiveSliderField } from "../../fields/ResponsiveSliderField";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type HeroAutoServiceProps = {
    title: string;
    highlightText?: string;
    bulletPoints?: { text: string }[];
    ctaText: string;
    ctaLink: string;
    secondaryButtonText?: string;
    imageUrl?: string;

    // Styling
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;
    bulletSize: { desktop?: number; tablet?: number; mobile?: number };

    backgroundColor: string;
    primaryColor: string; // Highlight & Primary Btn
    textColor: string;
    bulletColor: string;
    secondaryBtnColor: string; // Defaults to Primary Color usually

    // Shapes
    btnRadius: number;
    imageRadius: number;

    // Spacing
    gap: { desktop?: number; tablet?: number; mobile?: number };
    paddingTop: { desktop?: number; tablet?: number; mobile?: number };
    paddingBottom: { desktop?: number; tablet?: number; mobile?: number };
    btnPaddingHorizontal: string;
    btnPaddingVertical: string;
};

export const HeroAutoService: ComponentConfig<HeroAutoServiceProps> = {
    label: "Hero - Auto/Service",
    fields: {
        title: { type: "text", label: "📝 Title (before highlight)" },
        highlightText: { type: "text", label: "✨ Highlighted Text" },
        bulletPoints: {
            type: "array",
            label: "✓ Bullet Points",
            arrayFields: {
                text: { type: "text", label: "Point" },
            },
            getItemSummary: (item: any) => item.text || "Bullet point",
        },
        ctaText: { type: "text", label: "🔘 Primary Button" },
        ctaLink: { type: "text", label: "🔗 Primary Button Link" },
        secondaryButtonText: { type: "text", label: "🔘 Secondary Button" },
        imageUrl: { type: "text", label: "🖼️ Service Image URL" },

        // Typography
        titleSize: {
            type: "custom", label: "Title Size",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={6} step={0.1} defaultValue={3.5} />
        },
        titleWeight: {
            type: "select", label: "Title Weight",
            options: [
                { label: "Normal", value: "400" },
                { label: "Semibold", value: "600" },
                { label: "Bold", value: "700" },
                { label: "ExtraBold", value: "800" },
            ]
        },
        bulletSize: {
            type: "custom", label: "Bullet Text Size",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={2} step={0.1} defaultValue={1} />
        },

        // Colors
        backgroundColor: {
            type: "custom", label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        primaryColor: {
            type: "custom", label: "Primary/Highlight Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        textColor: {
            type: "custom", label: "Main Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        bulletColor: {
            type: "custom", label: "Bullet Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        secondaryBtnColor: {
            type: "custom", label: "Secondary Btn/Icon Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Shapes
        btnRadius: {
            type: "custom", label: "Button Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={50} defaultValue={8} />
        },
        imageRadius: {
            type: "custom", label: "Image Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={100} defaultValue={24} />
        },

        // Spacing
        gap: {
            type: "custom", label: "Grid Gap",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={100} defaultValue={60} />
        },
        paddingTop: {
            type: "custom", label: "Padding Top",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={80} />
        },
        paddingBottom: {
            type: "custom", label: "Padding Bottom",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={60} />
        },
        btnPaddingHorizontal: {
            type: "custom", label: "Button Padding X",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={60} defaultValue={40} />
        },
        btnPaddingVertical: {
            type: "custom", label: "Button Padding Y",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={30} defaultValue={14} />
        },
    },
    defaultProps: {
        title: "Your Reliable Option For Auto ",
        highlightText: "Repairs And Services",
        bulletPoints: [
            { text: "Our team of skilled technicians boasts decades of collective experience, ensuring satisfaction" },
            { text: "We believe in honest communication with our customers. You'll receive clear explanations of every problems" },
        ],
        ctaText: "Contact Us",
        ctaLink: "#",
        secondaryButtonText: "Get Appointment",

        titleSize: { desktop: 3.5 },
        titleWeight: "800",
        bulletSize: { desktop: 1 },

        backgroundColor: "#0d1b2a",
        primaryColor: "#ffd700",
        textColor: "#ffffff",
        bulletColor: "#cbd5e1",
        secondaryBtnColor: "#ffd700",

        btnRadius: 8,
        imageRadius: 24,

        gap: { desktop: 60 },
        paddingTop: { desktop: 80 },
        paddingBottom: { desktop: 60 },
        btnPaddingHorizontal: "40px",
        btnPaddingVertical: "14px",
    },
    render: ({
        title, highlightText, bulletPoints, ctaText, ctaLink, secondaryButtonText, imageUrl,
        titleSize, titleWeight, bulletSize,
        backgroundColor, primaryColor, textColor, bulletColor, secondaryBtnColor,
        btnRadius, imageRadius,
        gap, paddingTop, paddingBottom, btnPaddingHorizontal, btnPaddingVertical
    }) => {
        const id = "auto-service-" + useId().replace(/:/g, "");

        // Smart scaling helper
        const getVal = (obj: { desktop?: number; tablet?: number; mobile?: number } | undefined, key: 'desktop' | 'tablet' | 'mobile') => {
            if (key === 'mobile' && obj && !obj.mobile && obj.desktop) {
                return obj.desktop * 0.6;
            }
            if (key === 'tablet' && obj && !obj.tablet && obj.desktop) {
                return obj.desktop * 0.8;
            }
            return obj?.[key] ?? obj?.desktop ?? 0;
        };

        return (
            <section className={id} style={{ backgroundColor, color: textColor }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                .${id} {
                    padding-top: ${getVal(paddingTop, 'desktop')}px;
                    padding-bottom: ${getVal(paddingBottom, 'desktop')}px;
                    padding-left: 20px;
                    padding-right: 20px;
                    overflow-x: hidden;
                }
                .${id} .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: ${getVal(gap, 'desktop')}px;
                    align-items: center;
                }
                .${id} h1 {
                    font-size: ${getVal(titleSize, 'desktop')}rem;
                    font-weight: ${titleWeight};
                    line-height: 1.1;
                    margin-bottom: 2rem;
                    color: ${textColor};
                }
                .${id} .highlight {
                    color: ${primaryColor};
                }
                .${id} .bullet-list {
                    margin-bottom: 2.5rem;
                }
                .${id} .bullet-item {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 16px;
                }
                .${id} .bullet-icon {
                    color: ${primaryColor};
                    font-size: 1.5rem;
                    flex-shrink: 0;
                }
                .${id} .bullet-text {
                    font-size: ${getVal(bulletSize, 'desktop')}rem;
                    color: ${bulletColor};
                    line-height: 1.6;
                    margin: 0;
                }
                .${id} .button-group {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                .${id} .btn-primary {
                    display: inline-block;
                    background-color: ${primaryColor};
                    color: #0d1b2a; /* Keep text dark on primary button which is usually bright */
                    padding: ${btnPaddingVertical} ${btnPaddingHorizontal};
                    border-radius: ${btnRadius}px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    border: none;
                    cursor: pointer;
                    transition: opacity 0.3s;
                }
                .${id} .btn-secondary {
                    background-color: transparent;
                    color: ${secondaryBtnColor};
                    padding: ${btnPaddingVertical} ${btnPaddingHorizontal};
                    border-radius: ${btnRadius}px;
                    border: 2px solid ${secondaryBtnColor};
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                }
                .${id} .image-container {
                    position: relative;
                    aspect-ratio: 4/3;
                    background-color: ${primaryColor}15; /* 15% opacity primary color as placeholder bg */
                    border-radius: ${imageRadius}px;
                    overflow: hidden;
                }
                .${id} .image-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .${id} .image-placeholder {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    font-size: 5rem;
                }

                @media (max-width: 1024px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'tablet')}px;
                        padding-bottom: ${getVal(paddingBottom, 'tablet')}px;
                    }
                    .${id} .container {
                         gap: ${getVal(gap, 'tablet')}px;
                    }
                    .${id} h1 {
                        font-size: ${getVal(titleSize, 'tablet')}rem;
                    }
                    .${id} .btn-primary,
                    .${id} .btn-secondary {
                        font-size: 0.95rem;
                    }
                }

                @media (max-width: 768px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'mobile')}px;
                        padding-bottom: ${getVal(paddingBottom, 'mobile')}px;
                        padding-left: 24px;
                        padding-right: 24px;
                    }
                    .${id} .container {
                        grid-template-columns: 1fr;
                        gap: ${getVal(gap, 'mobile') || 40}px;
                    }
                    .${id} .container > div:nth-child(2) {
                        order: -1;
                    }
                    .${id} h1 {
                        font-size: clamp(2rem, ${getVal(titleSize, 'mobile')}rem, 3rem);
                        text-align: center;
                        line-height: 1.2;
                        word-break: break-word;
                    }
                    .${id} .bullet-list {
                        margin-bottom: 2rem;
                    }
                    .${id} .bullet-item {
                        align-items: flex-start;
                    }
                    .${id} .bullet-text {
                        font-size: ${getVal(bulletSize, 'mobile')}rem;
                        line-height: 1.7;
                    }
                    .${id} .button-group {
                        flex-direction: column;
                        width: 100%;
                        gap: 12px;
                    }
                    .${id} .btn-primary,
                    .${id} .btn-secondary {
                        width: 100%;
                        text-align: center;
                        justify-content: center;
                        display: flex;
                        box-sizing: border-box;
                        font-size: 1rem;
                    }
                    .${id} .image-container {
                        max-height: 350px;
                    }
                }
            `}} />
                <div className="container">
                    <div>
                        <h1>
                            {title}<span className="highlight">{highlightText}</span>
                        </h1>

                        {bulletPoints && bulletPoints.length > 0 && (
                            <div className="bullet-list">
                                {bulletPoints.map((point: any, i) => (
                                    <div key={i} className="bullet-item">
                                        <span className="bullet-icon">✓</span>
                                        <p className="bullet-text">{point.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="button-group">
                            <a href={ctaLink} className="btn-primary">
                                {ctaText}
                            </a>
                            {secondaryButtonText && (
                                <button className="btn-secondary">
                                    {secondaryButtonText}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="image-container">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Auto Service" />
                        ) : (
                            <div className="image-placeholder">🚗</div>
                        )}
                    </div>
                </div>
            </section>
        )
    },
};
