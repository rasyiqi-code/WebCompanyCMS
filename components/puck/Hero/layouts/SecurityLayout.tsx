import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "../../fields/SliderField";
import { ResponsiveSliderField } from "../../fields/ResponsiveSliderField";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type HeroSecurityProps = {
    title: string;
    ctaText: string;
    ctaLink: string;
    secondaryButtonText?: string;
    feature1Icon?: string;
    feature1Title?: string;
    feature1Description?: string;
    feature2Icon?: string;
    feature2Title?: string;
    feature2Description?: string;
    feature3Icon?: string;
    feature3Title?: string;
    feature3Description?: string;

    // Styling
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;

    // Gradients & Colors
    gradientStart: string;
    gradientEnd: string;
    gradientAngle: number;
    textColor: string;
    primaryBtnColor: string;
    primaryBtnTextColor: string;
    secondaryBtnColor: string; // Border & Text

    // Feature Cards
    cardBgColor: string;
    cardBorderColor: string;
    featureIconSize: { desktop?: number; tablet?: number; mobile?: number }; // rem

    // Shapes
    btnRadius: number;
    cardRadius: number;

    // Spacing
    paddingTop: { desktop?: number; tablet?: number; mobile?: number };
    paddingBottom: { desktop?: number; tablet?: number; mobile?: number };
    gap: { desktop?: number; tablet?: number; mobile?: number };
    btnPaddingHorizontal: string;
    btnPaddingVertical: string;
};

export const HeroSecurity: ComponentConfig<HeroSecurityProps> = {
    label: "Hero - Security/Tech",
    fields: {
        title: { type: "text", label: "📝 Main Title" },
        ctaText: { type: "text", label: "🔘 Primary Button" },
        ctaLink: { type: "text", label: "🔗 Primary Button Link" },
        secondaryButtonText: { type: "text", label: "🔘 Secondary Button" },

        feature1Icon: { type: "text", label: "🛡️ Feature 1 Icon" },
        feature1Title: { type: "text", label: "Feature 1 Title" },
        feature1Description: { type: "text", label: "Feature 1 Description" },

        feature2Icon: { type: "text", label: "⏰ Feature 2 Icon" },
        feature2Title: { type: "text", label: "Feature 2 Title" },
        feature2Description: { type: "text", label: "Feature 2 Description" },

        feature3Icon: { type: "text", label: "🔐 Feature 3 Icon" },
        feature3Title: { type: "text", label: "Feature 3 Title" },
        feature3Description: { type: "text", label: "Feature 3 Description" },

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
        gradientStart: {
            type: "custom", label: "Gradient Start",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        gradientEnd: {
            type: "custom", label: "Gradient End",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        gradientAngle: {
            type: "custom", label: "Gradient Angle",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="deg" max={360} defaultValue={135} />
        },
        textColor: {
            type: "custom", label: "Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        primaryBtnColor: {
            type: "custom", label: "Primary Btn Bg",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        primaryBtnTextColor: {
            type: "custom", label: "Primary Btn Text",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        secondaryBtnColor: {
            type: "custom", label: "Secondary Btn Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        cardBgColor: {
            type: "custom", label: "Card Bg (rgba)",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        cardBorderColor: {
            type: "custom", label: "Card Border (rgba)",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        featureIconSize: {
            type: "custom", label: "Feature Icon Size",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={5} step={0.1} defaultValue={3} />
        },

        // Shapes
        btnRadius: {
            type: "custom", label: "Button Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={50} defaultValue={12} />
        },
        cardRadius: {
            type: "custom", label: "Card Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={50} defaultValue={16} />
        },

        // Spacing
        gap: {
            type: "custom", label: "Grid Gap",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={100} defaultValue={32} />
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
        title: "Safeguard Your Data With Our Expert Solutions",
        ctaText: "Defend My Data",
        ctaLink: "#",
        secondaryButtonText: "Free Trial",
        feature1Icon: "🛡️",
        feature1Title: "Threat Detection",
        feature1Description: "Our technology constantly scans for potential threats",
        feature2Icon: "⏰",
        feature2Title: "24/7 Monitoring",
        feature2Description: "All-time monitoring of your data to keep it safe",
        feature3Icon: "🔐",
        feature3Title: "Data Encryption",
        feature3Description: "Rest easy knowing your sensitive information is shielded",

        titleSize: { desktop: 3.5 },
        titleWeight: "800",

        gradientStart: "#667eea",
        gradientEnd: "#764ba2",
        gradientAngle: 135,
        textColor: "#ffffff",
        primaryBtnColor: "#ffffff",
        primaryBtnTextColor: "#667eea",
        secondaryBtnColor: "#ffffff",
        cardBgColor: "rgba(255, 255, 255, 0.1)",
        cardBorderColor: "rgba(255, 255, 255, 0.2)",
        featureIconSize: { desktop: 3 },

        btnRadius: 12,
        cardRadius: 16,

        gap: { desktop: 32 },
        paddingTop: { desktop: 80 },
        paddingBottom: { desktop: 60 },
        btnPaddingHorizontal: "40px",
        btnPaddingVertical: "14px",
    },
    render: ({
        title, ctaText, ctaLink, secondaryButtonText,
        feature1Icon, feature1Title, feature1Description,
        feature2Icon, feature2Title, feature2Description,
        feature3Icon, feature3Title, feature3Description,
        titleSize, titleWeight, featureIconSize,
        gradientStart, gradientEnd, gradientAngle, textColor,
        primaryBtnColor, primaryBtnTextColor, secondaryBtnColor,
        cardBgColor, cardBorderColor,
        btnRadius, cardRadius,
        gap, paddingTop, paddingBottom, btnPaddingHorizontal, btnPaddingVertical
    }) => {
        const id = "security-" + useId().replace(/:/g, "");

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
                    background: linear-gradient(${gradientAngle}deg, ${gradientStart} 0%, ${gradientEnd} 100%);
                    color: ${textColor};
                    padding-top: ${getVal(paddingTop, 'desktop')}px;
                    padding-bottom: ${getVal(paddingBottom, 'desktop')}px;
                    padding-left: 20px;
                    padding-right: 20px;
                    overflow-x: hidden;
                }
                .${id} .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .${id} .hero-content {
                    text-align: center;
                    margin-bottom: 60px;
                }
                .${id} h1 {
                    font-size: ${getVal(titleSize, 'desktop')}rem;
                    font-weight: ${titleWeight};
                    line-height: 1.1;
                    margin-bottom: 2.5rem;
                    color: ${textColor};
                }
                .${id} .button-group {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .${id} .btn-primary {
                    background-color: ${primaryBtnColor};
                    color: ${primaryBtnTextColor};
                    padding: ${btnPaddingVertical} ${btnPaddingHorizontal};
                    border-radius: ${btnRadius}px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    display: inline-block;
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
                .${id} .features-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: ${getVal(gap, 'desktop')}px;
                }
                .${id} .feature-card {
                    background: ${cardBgColor};
                    backdrop-filter: blur(10px);
                    padding: 32px 24px;
                    border-radius: ${cardRadius}px;
                    border: 1px solid ${cardBorderColor};
                }
                .${id} .feature-icon {
                    font-size: ${getVal(featureIconSize as any, 'desktop')}rem;
                    margin-bottom: 16px;
                }
                .${id} .feature-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 8px;
                }
                .${id} .feature-desc {
                    font-size: 0.95rem;
                    opacity: 0.9;
                    line-height: 1.6;
                }

                @media (max-width: 1024px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'tablet')}px;
                        padding-bottom: ${getVal(paddingBottom, 'tablet')}px;
                    }
                    .${id} h1 {
                        font-size: ${getVal(titleSize, 'tablet')}rem;
                    }
                    .${id} .feature-icon {
                        font-size: ${getVal(featureIconSize as any, 'tablet')}rem;
                    }
                    .${id} .features-grid {
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
                    .${id} h1 {
                        font-size: clamp(2rem, ${getVal(titleSize, 'mobile')}rem, 3rem);
                        margin-bottom: 2rem;
                        word-break: break-word;
                        line-height: 1.2;
                    }
                    .${id} .feature-icon {
                        font-size: ${getVal(featureIconSize as any, 'mobile')}rem;
                    }
                    .${id} .hero-content {
                        margin-bottom: 40px;
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
                    .${id} .features-grid {
                        grid-template-columns: 1fr;
                        gap: ${getVal(gap, 'mobile') || 20}px;
                    }
                    .${id} .feature-card {
                        text-align: center;
                        padding: 24px 20px;
                    }
                }
            `}} />
                <div className="container">
                    <div className="hero-content">
                        <h1>{title}</h1>
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

                    <div className="features-grid">
                        {[
                            { icon: feature1Icon, title: feature1Title, desc: feature1Description },
                            { icon: feature2Icon, title: feature2Title, desc: feature2Description },
                            { icon: feature3Icon, title: feature3Title, desc: feature3Description },
                        ].map((feature, i) => (
                            <div key={i} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <div className="feature-title">{feature.title}</div>
                                <div className="feature-desc">{feature.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    },
};
