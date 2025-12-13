import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "../../fields/SliderField";
import { ResponsiveSliderField } from "../../fields/ResponsiveSliderField";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type HeroYogaProps = {
    tag?: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    secondaryButtonText?: string;
    imageUrl?: string;

    // Stats
    stat1Value?: string;
    stat1Label?: string;
    stat2Value?: string;
    stat2Label?: string;
    stat3Value?: string;
    stat3Label?: string;

    // Styling
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;
    subtitleSize: { desktop?: number; tablet?: number; mobile?: number };
    subtitleColor: string;

    backgroundColor: string;
    primaryColor: string;
    btnTextColor: string;
    secondaryBtnColor: string;

    iconBackgroundColor: string;
    imageBackgroundColor: string;

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

export const HeroYoga: ComponentConfig<HeroYogaProps> = {
    label: "Hero - Yoga/Wellness",
    fields: {
        tag: { type: "text", label: "🏷️ Tag/Category", placeholder: "Yoga Classes" },
        title: { type: "text", label: "📝 Main Title" },
        subtitle: { type: "textarea", label: "📄 Subtitle" },
        ctaText: { type: "text", label: "🔘 Primary Button" },
        ctaLink: { type: "text", label: "🔗 Primary Button Link" },
        secondaryButtonText: { type: "text", label: "▶️ Secondary Button" },
        imageUrl: { type: "text", label: "🖼️ Image URL" },

        // Stats
        stat1Value: { type: "text", label: "📊 Stat 1 Value" },
        stat1Label: { type: "text", label: "📊 Stat 1 Label" },
        stat2Value: { type: "text", label: "📊 Stat 2 Value" },
        stat2Label: { type: "text", label: "📊 Stat 2 Label" },
        stat3Value: { type: "text", label: "📊 Stat 3 Value" },
        stat3Label: { type: "text", label: "📊 Stat 3 Label" },

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
        subtitleSize: {
            type: "custom", label: "Subtitle Size",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={3} step={0.1} defaultValue={1.1} />
        },
        subtitleColor: {
            type: "custom", label: "Subtitle/Stat Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Colors
        backgroundColor: {
            type: "custom", label: "Section Background",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        primaryColor: {
            type: "custom", label: "Primary/Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnTextColor: {
            type: "custom", label: "Primary Btn Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        secondaryBtnColor: {
            type: "custom", label: "Secondary Btn/Icon Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        iconBackgroundColor: {
            type: "custom", label: "Play Icon Bg",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        imageBackgroundColor: {
            type: "custom", label: "Image Placeholder Bg",
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
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={60} defaultValue={32} />
        },
        btnPaddingVertical: {
            type: "custom", label: "Button Padding Y",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={30} defaultValue={12} />
        },
    },
    defaultProps: {
        tag: "Yoga Classes",
        title: "Yoga Classes: Unwind, Improve And Transform",
        subtitle: "Find your inner peace and strength through our expert-led yoga sessions",
        ctaText: "Register Now",
        ctaLink: "#",
        secondaryButtonText: "Class Preview",
        stat1Value: "150+",
        stat1Label: "Expert Trainers",
        stat2Value: "300+",
        stat2Label: "Active Students",
        stat3Value: "500+",
        stat3Label: "Class Videos",

        titleSize: { desktop: 3.5 },
        titleWeight: "800",
        subtitleSize: { desktop: 1.1 },
        subtitleColor: "#64748b",

        backgroundColor: "#fef5f0",
        primaryColor: "#ff6b3d",
        btnTextColor: "#ffffff",
        secondaryBtnColor: "#ff6b3d",
        iconBackgroundColor: "#ffebe5",
        imageBackgroundColor: "#f0e5dc",

        btnRadius: 8,
        imageRadius: 24,

        gap: { desktop: 60 },
        paddingTop: { desktop: 80 },
        paddingBottom: { desktop: 60 },
        btnPaddingHorizontal: "32px",
        btnPaddingVertical: "12px",
    },
    render: ({
        tag, title, subtitle, ctaText, ctaLink, secondaryButtonText, imageUrl,
        stat1Value, stat1Label, stat2Value, stat2Label, stat3Value, stat3Label,
        titleSize, titleWeight, subtitleSize, subtitleColor,
        backgroundColor, primaryColor, btnTextColor, secondaryBtnColor, iconBackgroundColor, imageBackgroundColor,
        btnRadius, imageRadius,
        gap, paddingTop, paddingBottom, btnPaddingHorizontal, btnPaddingVertical
    }) => {
        const id = useId();

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
            <section className={id} style={{ backgroundColor }}>
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
                }
                .${id} .hero-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: ${getVal(gap, 'desktop')}px;
                    align-items: center;
                    margin-bottom: 60px;
                }
                .${id} .tag {
                    color: ${primaryColor};
                    font-size: 0.95rem;
                    font-weight: 600;
                    margin-bottom: 16px;
                }
                .${id} h1 {
                    font-size: ${getVal(titleSize, 'desktop')}rem;
                    font-weight: ${titleWeight};
                    color: #1a2332;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                }
                .${id} .subtitle {
                    font-size: ${getVal(subtitleSize, 'desktop')}rem;
                    color: ${subtitleColor};
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                .${id} .button-group {
                    display: flex;
                    gap: 16px;
                    align-items: center;
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
                    transition: opacity 0.3s;
                }
                .${id} .btn-secondary {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background-color: transparent;
                    color: ${secondaryBtnColor};
                    padding: ${btnPaddingVertical} ${btnPaddingHorizontal};
                    border-radius: ${btnRadius}px;
                    border: none;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                }
                .${id} .play-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background-color: ${iconBackgroundColor};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: ${secondaryBtnColor};
                }
                .${id} .image-container {
                    position: relative;
                    aspect-ratio: 1;
                    background-color: ${imageBackgroundColor};
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
                .${id} .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 40px;
                }
                .${id} .stat-value {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #1a2332;
                    margin-bottom: 8px;
                }
                .${id} .stat-label {
                    font-size: 1rem;
                    color: ${subtitleColor};
                }

                @media (max-width: 1024px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'tablet')}px;
                        padding-bottom: ${getVal(paddingBottom, 'tablet')}px;
                    }
                    .${id} .hero-grid {
                        gap: ${getVal(gap, 'tablet')}px;
                    }
                    .${id} h1 {
                        font-size: ${getVal(titleSize, 'tablet')}rem;
                    }
                }

                @media (max-width: 768px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'mobile')}px;
                        padding-bottom: ${getVal(paddingBottom, 'mobile')}px;
                        padding-left: 24px;
                        padding-right: 24px;
                    }
                    .${id} .hero-grid {
                        grid-template-columns: 1fr;
                        gap: ${getVal(gap, 'mobile') || 40}px;
                        margin-bottom: 40px;
                    }
                    .${id} .hero-grid > div:nth-child(2) {
                        order: -1;
                    }
                    .${id} h1 {
                        font-size: clamp(2rem, ${getVal(titleSize, 'mobile')}rem, 3rem);
                        line-height: 1.2;
                        text-align: center;
                        word-break: break-word;
                    }
                    .${id} .tag {
                        text-align: center;
                        display: block;
                    }
                    .${id} .subtitle {
                        font-size: ${getVal(subtitleSize, 'mobile')}rem;
                        text-align: center;
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
                        justify-content: center;
                        box-sizing: border-box; 
                    }
                    .${id} .image-container {
                        max-height: 400px;
                    }
                    .${id} .stats-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 12px;
                        text-align: center;
                    }
                    .${id} .stat-value {
                        font-size: 1.75rem;
                    }
                    .${id} .stat-label {
                        font-size: 0.85rem;
                    }
                }
            `}} />
                <div className="container">
                    {/* Main Content */}
                    <div className="hero-grid">
                        <div>
                            {tag && <div className="tag">{tag}</div>}
                            <h1 style={{ color: '#1a2332' }}>{title}</h1>
                            <p className="subtitle">{subtitle}</p>
                            <div className="button-group">
                                <a href={ctaLink} className="btn-primary">
                                    {ctaText}
                                </a>
                                {secondaryButtonText && (
                                    <button className="btn-secondary">
                                        <span className="play-icon">▶</span>
                                        {secondaryButtonText}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="image-container">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Hero" />
                            ) : (
                                <div className="image-placeholder">🧘‍♀️</div>
                            )}
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="stats-grid">
                        {[
                            { value: stat1Value, label: stat1Label },
                            { value: stat2Value, label: stat2Label },
                            { value: stat3Value, label: stat3Label },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    },
};
