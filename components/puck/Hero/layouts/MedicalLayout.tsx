import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "../../fields/SliderField";
import { ResponsiveSliderField } from "../../fields/ResponsiveSliderField";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type HeroMedicalProps = {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    secondaryButtonText?: string;
    imageUrl?: string;
    badge1Text?: string;
    badge2Text?: string;

    // Styling
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;

    // Colors
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
    primaryColor: string; // Button & Highlights
    btnTextColor: string;
    secondaryColor: string; // Secondary Button
    blobColor: string;
    badgeBgColor: string;
    badgeTextColor: string;

    // Shapes
    btnRadius: number;
    imageRadius: number;

    // Spacing
    paddingTop: { desktop?: number; tablet?: number; mobile?: number };
    paddingBottom: { desktop?: number; tablet?: number; mobile?: number };
    gap: { desktop?: number; tablet?: number; mobile?: number };
    btnPaddingHorizontal: string;
    btnPaddingVertical: string;
};

export const HeroMedical: ComponentConfig<HeroMedicalProps> = {
    label: "Hero - Medical/Health",
    fields: {
        title: { type: "text", label: "📝 Main Title" },
        description: { type: "textarea", label: "📄 Description" },
        ctaText: { type: "text", label: "🔘 Primary Button" },
        ctaLink: { type: "text", label: "🔗 Primary Button Link" },
        secondaryButtonText: { type: "text", label: "🔘 Secondary Button" },
        imageUrl: { type: "text", label: "🖼️ Image URL" },
        badge1Text: { type: "text", label: "🎯 Badge 1 Text" },
        badge2Text: { type: "text", label: "💬 Badge 2 Text" },

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

        // Colors
        backgroundColor: {
            type: "custom", label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        titleColor: {
            type: "custom", label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        descriptionColor: {
            type: "custom", label: "Description Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        primaryColor: {
            type: "custom", label: "Primary/Blob Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnTextColor: {
            type: "custom", label: "Primary Btn Text",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        secondaryColor: {
            type: "custom", label: "Secondary Btn Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        blobColor: {
            type: "custom", label: "Blob Back Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        badgeBgColor: {
            type: "custom", label: "Badge Background",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        badgeTextColor: {
            type: "custom", label: "Badge Text",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Shapes
        btnRadius: {
            type: "custom", label: "Button Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={50} defaultValue={12} />
        },
        imageRadius: {
            type: "custom", label: "Image Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={50} defaultValue={24} />
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
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={80} />
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
        title: "Get Virtual Consultations For A Healthier You",
        description: "Discover the convenience of expert medical guidance from the comfort of your surroundings. Our team of dedicated and experienced doctors is here to help you.",
        ctaText: "Contact Us",
        ctaLink: "#",
        secondaryButtonText: "Get Consultation",
        badge1Text: "Get Expert's Consultation",
        badge2Text: "24 Hour Support From The Doctors",

        titleSize: { desktop: 3.5 },
        titleWeight: "800",

        backgroundColor: "#ffffff",
        titleColor: "#1a2332",
        descriptionColor: "#64748b",
        primaryColor: "#6366f1",
        btnTextColor: "#ffffff",
        secondaryColor: "#6366f1",
        blobColor: "#ffd700",
        badgeBgColor: "#ffffff",
        badgeTextColor: "#1a2332",

        btnRadius: 12,
        imageRadius: 24,

        gap: { desktop: 60 },
        paddingTop: { desktop: 80 },
        paddingBottom: { desktop: 80 },
        btnPaddingHorizontal: "40px",
        btnPaddingVertical: "14px",
    },
    render: ({
        title, description, ctaText, ctaLink, secondaryButtonText, imageUrl, badge1Text, badge2Text,
        titleSize, titleWeight,
        backgroundColor, titleColor, descriptionColor, primaryColor, btnTextColor, secondaryColor, blobColor, badgeBgColor, badgeTextColor,
        btnRadius, imageRadius,
        gap, paddingTop, paddingBottom, btnPaddingHorizontal, btnPaddingVertical
    }) => {
        const id = useId();

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
            <section className={id}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                .${id} {
                    background-color: ${backgroundColor};
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
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: ${getVal(gap, 'desktop')}px;
                    align-items: center;
                }
                .${id} h1 {
                    font-size: ${getVal(titleSize, 'desktop')}rem;
                    font-weight: ${titleWeight};
                    color: ${titleColor};
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                }
                .${id} .description {
                    font-size: 1.05rem;
                    color: ${descriptionColor};
                    line-height: 1.7;
                    margin-bottom: 2.5rem;
                }
                .${id} .button-group {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                .${id} .btn-primary {
                    display: inline-block;
                    background-color: ${primaryColor};
                    color: ${btnTextColor};
                    padding: ${btnPaddingVertical} ${btnPaddingHorizontal};
                    border-radius: ${btnRadius}px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    box-sizing: border-box;
                    transition: opacity 0.3s;
                }
                .${id} .btn-secondary {
                    background-color: transparent;
                    color: ${secondaryColor};
                    padding: ${btnPaddingVertical} ${btnPaddingHorizontal};
                    border-radius: ${btnRadius}px;
                    border: 2px solid ${secondaryColor};
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                    box-sizing: border-box;
                }
                .${id} .image-wrapper {
                    position: relative;
                }
                .${id} .blob {
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    background-color: ${blobColor};
                    border-radius: 50% 40% 60% 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 0;
                }
                .${id} .image-container {
                    position: relative;
                    z-index: 1;
                    aspect-ratio: 3/4;
                    max-width: 400px;
                    margin: 0 auto;
                    background-color: ${backgroundColor === '#ffffff' ? '#f8fafc' : 'rgba(0,0,0,0.05)'};
                    border-radius: ${imageRadius}px;
                    overflow: hidden;
                }
                .${id} .badge {
                    position: absolute;
                    background-color: ${badgeBgColor};
                    padding: 12px 20px;
                    border-radius: 50px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    z-index: 2;
                }
                .${id} .badge-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: white;
                }
                .${id} .badge-text {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: ${badgeTextColor};
                }

                @media (max-width: 1024px) {
                    .${id} {
                         padding-top: ${getVal(paddingTop, 'tablet')}px;
                         padding-bottom: ${getVal(paddingBottom, 'tablet')}px;
                    }
                    .${id} h1 {
                        font-size: ${getVal(titleSize, 'tablet')}rem;
                    }
                     .${id} .container {
                        gap: ${getVal(gap, 'tablet')}px;
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
                    .${id} .description {
                        text-align: center;
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
                        padding: 16px 32px;
                        font-size: 1rem;
                    }
                    .${id} .blob {
                        width: 300px;
                        height: 300px;
                    }
                    .${id} .badge {
                        padding: 10px 16px;
                    }
                    .${id} .badge-icon {
                        width: 32px;
                        height: 32px;
                        font-size: 1rem;
                    }
                }
            `}} />
                <div className="container">
                    <div>
                        <h1>{title}</h1>
                        <p className="description">{description}</p>
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

                    <div className="image-wrapper">
                        <div className="blob" />
                        <div className="image-container">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Doctor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '6rem' }}>👨‍⚕️</div>
                            )}
                        </div>

                        {badge1Text && (
                            <div className="badge" style={{ top: '15%', right: '-10%' }}>
                                <div className="badge-icon" style={{ backgroundColor: '#ff4757' }}>🔬</div>
                                <span className="badge-text">{badge1Text}</span>
                            </div>
                        )}

                        {badge2Text && (
                            <div className="badge" style={{ bottom: '20%', left: '-15%' }}>
                                <div className="badge-icon" style={{ backgroundColor: primaryColor }}>💬</div>
                                <span className="badge-text">{badge2Text}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        )
    },
};
