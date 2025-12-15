import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "../../fields/SliderField";
import { ResponsiveSliderField } from "../../fields/ResponsiveSliderField";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type HeroAgencyProps = {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    project1ImageUrl?: string;
    project2ImageUrl?: string;
    project3ImageUrl?: string;

    // Typography
    titleFont: string;
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;
    titleColor: string;

    subtitleSize: { desktop?: number; tablet?: number; mobile?: number };
    subtitleColor: string;

    // Styling
    backgroundColor: string;
    accentColor: string; // Arrow/Underlines

    // Button
    btnColor: string;
    btnTextColor: string;
    btnRadius: string;
    btnOutline: boolean;
    btnPaddingVertical: string;
    btnPaddingHorizontal: string;

    //Project Grid
    projectGap: { desktop?: number; tablet?: number; mobile?: number };
    projectRadius: string;
    projectShadow: boolean;

    // Layout
    paddingTop: { desktop?: number; tablet?: number; mobile?: number };
    paddingBottom: { desktop?: number; tablet?: number; mobile?: number };
};

export const HeroAgency: ComponentConfig<HeroAgencyProps> = {
    label: "Hero - Design Agency/Portfolio",
    fields: {
        // Content
        title: { type: "text", label: "📝 Title" },
        subtitle: { type: "textarea", label: "📄 Subtitle" },
        ctaText: { type: "text", label: "🔘 CTA Button" },
        ctaLink: { type: "text", label: "🔗 CTA Link" },
        project1ImageUrl: { type: "text", label: "🖼️ Recent Project 1" },
        project2ImageUrl: { type: "text", label: "🖼️ Recent Project 2" },
        project3ImageUrl: { type: "text", label: "🖼️ Recent Project 3" },

        // Typography
        titleFont: {
            type: "select", label: "Title Font",
            options: [
                { label: "Inter", value: "Inter" },
                { label: "Syne", value: "Syne" },
                { label: "Space Grotesk", value: "Space Grotesk" },
                { label: "Montserrat", value: "Montserrat" },
            ]
        },
        titleSize: {
            type: "custom", label: "Title Size (rem)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={8} step={0.1} defaultValue={5} />
        },
        titleWeight: {
            type: "select", label: "Title Weight",
            options: [
                { label: "Bold", value: "700" },
                { label: "ExtraBold", value: "800" },
                { label: "Black", value: "900" },
            ]
        },
        titleColor: {
            type: "custom", label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        subtitleSize: {
            type: "custom", label: "Subtitle Size (rem)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={2} step={0.1} defaultValue={1.1} />
        },
        subtitleColor: {
            type: "custom", label: "Subtitle Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Style
        backgroundColor: {
            type: "custom", label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        accentColor: {
            type: "custom", label: "Accent Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Button
        btnColor: {
            type: "custom", label: "Btn Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnTextColor: {
            type: "custom", label: "Btn Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnRadius: {
            type: "custom", label: "Btn Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={50} defaultValue={50} />
        },
        btnOutline: {
            type: "radio", label: "Btn Style",
            options: [{ label: "Outline", value: true }, { label: "Solid", value: false }]
        },
        btnPaddingVertical: {
            type: "custom", label: "Button Padding (Vertical)",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={40} defaultValue="16px" />
        },
        btnPaddingHorizontal: {
            type: "custom", label: "Button Padding (Horizontal)",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={80} defaultValue="40px" />
        },

        // Projects
        projectGap: {
            type: "custom", label: "Project Gap",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={60} defaultValue={24} />
        },
        projectRadius: {
            type: "custom", label: "Project Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={40} defaultValue={16} />
        },
        projectShadow: {
            type: "radio", label: "Project Shadow",
            options: [{ label: "On", value: true }, { label: "Off", value: false }]
        },

        // Layout
        paddingTop: {
            type: "custom", label: "Padding Top",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={100} />
        },
        paddingBottom: {
            type: "custom", label: "Padding Bottom",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={80} />
        },
    },
    defaultProps: {
        title: "Weaving Pixels\nIn Brands",
        subtitle: "We Don't Just Design Websites Or Create Logos; We Meticulously Weave Pixels Into The Very Fabric Of Brands",
        ctaText: "Get In Touch",
        ctaLink: "#contact",

        project1ImageUrl: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=600&q=80",
        project2ImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        project3ImageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",

        titleFont: "Syne",
        titleSize: { desktop: 5 },
        titleWeight: "800",
        titleColor: "#ffffff",

        subtitleSize: { desktop: 1.1 },
        subtitleColor: "#94a3b8",

        backgroundColor: "#111111", // Darker black like reference
        accentColor: "#ff6b3d",

        btnColor: "#ffffff",
        btnTextColor: "#ffffff",
        btnRadius: "50px",
        btnOutline: true,
        btnPaddingVertical: "16px",
        btnPaddingHorizontal: "40px",

        projectGap: { desktop: 32 },
        projectRadius: "12px",
        projectShadow: false, // Cleaner interaction like reference

        paddingTop: { desktop: 100 },
        paddingBottom: { desktop: 80 },
    },
    render: ({
        title, subtitle, ctaText, ctaLink,
        project1ImageUrl, project2ImageUrl, project3ImageUrl,
        titleFont, titleSize, titleWeight, titleColor,
        subtitleSize, subtitleColor,
        backgroundColor, accentColor,
        btnColor, btnTextColor, btnRadius, btnOutline, btnPaddingVertical, btnPaddingHorizontal,
        projectGap, projectRadius, projectShadow,
        paddingTop, paddingBottom
    }) => {
        const id = "agency-" + useId().replace(/:/g, "");
        const getVal = (obj: { desktop?: number; tablet?: number; mobile?: number } | undefined, key: 'desktop' | 'tablet' | 'mobile') => {
            if (key === 'mobile' && obj && !obj.mobile && obj.desktop) {
                return obj.desktop * 0.5; // Auto-scale down to 50% for mobile if not set
            }
            if (key === 'tablet' && obj && !obj.tablet && obj.desktop) {
                return obj.desktop * 0.8; // Auto-scale down to 80% for tablet if not set
            }
            return obj?.[key] ?? obj?.desktop ?? 0;
        };

        return (
            <section className={id} style={{ backgroundColor, color: titleColor, position: 'relative', overflow: 'hidden' }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@400;600;800&family=Montserrat:wght@400;600;800&display=swap');
                
                .${id} {
                    padding-top: ${getVal(paddingTop, 'desktop')}px;
                    padding-bottom: ${getVal(paddingBottom, 'desktop')}px;
                    padding-left: 24px;
                    padding-right: 24px;
                }
                .${id} .container {
                    max-width: 1280px;
                    margin: 0 auto;
                }
                .${id} .main-content-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 60px;
                    align-items: flex-start;
                    margin-bottom: 80px;
                }
                .${id} h1 { 
                    font-family: ${titleFont};
                    font-weight: ${titleWeight};
                    font-size: ${getVal(titleSize, 'desktop')}rem;
                    line-height: 1.1;
                    margin: 0;
                    position: relative;
                }
                .${id} .subtitle-container {
                    padding-top: 10px;
                    border-top: 2px solid ${accentColor};
                    max-width: 500px;
                    margin-left: auto;
                }
                .${id} p { 
                    font-family: 'Inter', sans-serif;
                    font-size: ${getVal(subtitleSize, 'desktop')}rem;
                    line-height: 1.6;
                    color: ${subtitleColor};
                    margin-bottom: 32px;
                    margin-top: 24px;
                }
                .${id} .cta-btn {
                    display: inline-block;
                    background-color: ${btnOutline ? 'transparent' : btnColor};
                    color: ${btnTextColor};
                    padding: ${btnPaddingVertical} ${btnPaddingHorizontal};
                    border-radius: ${btnRadius};
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    border: ${btnOutline ? `1px solid ${btnTextColor}` : 'none'};
                    transition: all 0.3s ease;
                    box-sizing: border-box;
                    font-family: 'Inter', sans-serif;
                }
                .${id} .section-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 1.25rem;
                    color: ${accentColor};
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 32px;
                }
                .${id} .section-title::after {
                    content: '';
                    height: 2px;
                    width: 60px;
                    background-color: ${accentColor};
                }
                .${id} .project-grid { 
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: ${getVal(projectGap, 'desktop')}px;
                }
                .${id} .project-card {
                    position: relative;
                    aspect-ratio: 16/10;
                    border-radius: ${projectRadius};
                    overflow: hidden;
                    background-color: #2a3142;
                    box-shadow: ${projectShadow ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'};
                    transition: transform 0.3s ease;
                    cursor: pointer;
                }
                .${id} .project-card:hover {
                    transform: translateY(-8px);
                }
                .${id} .project-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                .${id} .project-card:hover .project-img {
                    transform: scale(1.05);
                }

                @media (max-width: 1024px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'tablet')}px;
                        padding-bottom: ${getVal(paddingBottom, 'tablet')}px;
                    }
                    .${id} h1 { font-size: ${getVal(titleSize, 'tablet')}rem; }
                    .${id} .subtitle-container { 
                        margin-left: 0; 
                        padding-top: 0;
                        border-top: none;
                    }
                    .${id} p { font-size: ${getVal(subtitleSize, 'tablet')}rem; }
                    .${id} .project-grid { 
                        grid-template-columns: repeat(2, 1fr);
                        gap: ${getVal(projectGap, 'tablet')}px; 
                    }
                }

                @media (max-width: 768px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'mobile')}px;
                        padding-bottom: ${getVal(paddingBottom, 'mobile')}px;
                        overflow-x: hidden;
                    }
                    .${id} .main-content-grid {
                        grid-template-columns: 1fr;
                        gap: 32px;
                        margin-bottom: 48px;
                    }
                    .${id} h1 { 
                        font-size: clamp(2.5rem, ${getVal(titleSize, 'mobile')}rem, 3.5rem);
                        white-space: normal;
                        word-break: break-word;
                        overflow-wrap: break-word;
                        hyphens: auto;
                        max-width: 100%;
                    }
                    .${id} .subtitle-container {
                        width: 100%;
                        border-top: 2px solid ${accentColor};
                        padding-top: 24px;
                        margin-top: 16px;
                    }
                    .${id} p { 
                        font-size: ${getVal(subtitleSize, 'mobile')}rem;
                        margin-top: 0;
                        margin-bottom: 24px;
                    }
                    .${id} .cta-btn {
                        display: block;
                        width: 100%;
                        text-align: center;
                        padding: 16px 32px;
                        box-sizing: border-box; 
                    }
                    .${id} .project-grid { 
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }
                    .${id} .project-card {
                        aspect-ratio: 16/9;
                    }
                }
            `}} />

                <div className="container">
                    {/* Header Section */}
                    <div className="main-content-grid">
                        <div style={{ position: 'relative' }}>
                            <h1>
                                {title.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}<br />
                                    </React.Fragment>
                                ))}
                            </h1>
                            {/* Decorative squiggle */}
                            <svg width="100" height="50" viewBox="0 0 100 50" style={{ position: 'absolute', bottom: '0', left: '0', transform: 'translateY(80%)', opacity: 0.8 }}>
                                <path d="M10,25 Q30,5 50,25 T90,25" fill="none" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </div>

                        <div className="subtitle-container">
                            <p>{subtitle}</p>
                            <a href={ctaLink} className="cta-btn">
                                {ctaText}
                            </a>
                        </div>
                    </div>

                    {/* Recent Projects */}
                    <div>
                        <div className="section-title">
                            Recent Projects
                        </div>
                        <div className="project-grid">
                            {[project1ImageUrl, project2ImageUrl, project3ImageUrl].map((url, i) => (
                                <div key={i} className="project-card">
                                    {url ? (
                                        <img src={url} alt={`Project ${i + 1}`} className="project-img" />
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '3rem', color: '#4b5563' }}>
                                            {i === 0 ? '🎨' : i === 1 ? '💻' : '🚀'}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    },
};
