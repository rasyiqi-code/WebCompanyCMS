import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "../../fields/SliderField";
import { ResponsiveSliderField } from "../../fields/ResponsiveSliderField";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type HeroDentalProps = {
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaText1: string;
    ctaLink1: string;
    ctaText2: string;
    ctaLink2: string;

    // Services
    service1Title: string;
    service1Desc: string;
    service2Title: string;
    service2Desc: string;
    service3Title: string;
    service3Desc: string;

    // Typography
    titleFont: string;
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;
    titleColor: string;
    highlightColor: string;

    subtitleSize: { desktop?: number; tablet?: number; mobile?: number };
    subtitleColor: string;

    // Buttons
    btnPrimaryColor: string;
    btnPrimaryTextColor: string;
    btnSecondaryColor: string;
    btnSecondaryTextColor: string;
    btnRadius: string;
    btnPaddingVertical: string;
    btnPaddingHorizontal: string;

    // Colors
    backgroundColor: string;
    accentColor: string;
    serviceCardBg: string;

    // Layout
    paddingTop: { desktop?: number; tablet?: number; mobile?: number };
    paddingBottom: { desktop?: number; tablet?: number; mobile?: number };
};

export const HeroDental: ComponentConfig<HeroDentalProps> = {
    label: "Hero - Dental Clinic",
    fields: {
        // Content
        title: { type: "text", label: "📝 Title (Part 1)" },
        titleHighlight: { type: "text", label: "✨ Title Highlight (Part 2)" },
        subtitle: { type: "textarea", label: "📄 Subtitle" },
        ctaText1: { type: "text", label: "🔘 Primary Button" },
        ctaLink1: { type: "text", label: "🔗 Primary Button Link" },
        ctaText2: { type: "text", label: "🔘 Secondary Button" },
        ctaLink2: { type: "text", label: "🔗 Secondary Button Link" },

        // Services
        service1Title: { type: "text", label: "🦷 Service 1 Title" },
        service1Desc: { type: "textarea", label: "📄 Service 1 Description" },
        service2Title: { type: "text", label: "🦷 Service 2 Title" },
        service2Desc: { type: "textarea", label: "📄 Service 2 Description" },
        service3Title: { type: "text", label: "🦷 Service 3 Title" },
        service3Desc: { type: "textarea", label: "📄 Service 3 Description" },

        // Typography
        titleFont: {
            type: "select", label: "Title Font",
            options: [
                { label: "Inter", value: "Inter" },
                { label: "Poppins", value: "Poppins" },
                { label: "Montserrat", value: "Montserrat" },
                { label: "Roboto", value: "Roboto" },
            ]
        },
        titleSize: {
            type: "custom", label: "Title Size (rem)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={6} step={0.1} defaultValue={3.5} />
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
        highlightColor: {
            type: "custom", label: "Highlight Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        subtitleSize: {
            type: "custom", label: "Subtitle Size (rem)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={2} step={0.1} defaultValue={1} />
        },
        subtitleColor: {
            type: "custom", label: "Subtitle Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Buttons
        btnPrimaryColor: {
            type: "custom", label: "Primary Button Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnPrimaryTextColor: {
            type: "custom", label: "Primary Button Text",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnSecondaryColor: {
            type: "custom", label: "Secondary Button Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnSecondaryTextColor: {
            type: "custom", label: "Secondary Button Text",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnRadius: {
            type: "custom", label: "Button Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={50} defaultValue="8px" />
        },
        btnPaddingVertical: {
            type: "custom", label: "Button Padding (Vertical)",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={40} defaultValue="14px" />
        },
        btnPaddingHorizontal: {
            type: "custom", label: "Button Padding (Horizontal)",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={80} defaultValue="40px" />
        },

        // Colors
        backgroundColor: {
            type: "custom", label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        accentColor: {
            type: "custom", label: "Accent Color (Icons)",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        serviceCardBg: {
            type: "custom", label: "Service Card Background",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Layout
        paddingTop: {
            type: "custom", label: "Padding Top",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={80} />
        },
        paddingBottom: {
            type: "custom", label: "Padding Bottom",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={60} />
        },
    },
    defaultProps: {
        title: "Your Destination For Healthy Teeth And",
        titleHighlight: "Beautiful Smile",
        subtitle: "Welcome to dental care where healthy teeth and beautiful smiles are not just aspirations, but destinations",
        ctaText1: "Book Appointment",
        ctaLink1: "#",
        ctaText2: "Our Treatments",
        ctaLink2: "#",

        service1Title: "Teeth Whitening",
        service1Desc: "Transformative Teeth Whitening Services for all ages",
        service2Title: "Precision Dental Implants",
        service2Desc: "Implants that Feel and Look Like Your Own",
        service3Title: "Gentle Sedation Dentistry",
        service3Desc: "Anxiety-free dentistry: your comfort, our priority",

        titleFont: "Inter",
        titleSize: { desktop: 3.5 },
        titleWeight: "700",
        titleColor: "#1a1a1a",
        highlightColor: "#4169E1",

        subtitleSize: { desktop: 1 },
        subtitleColor: "#64748b",

        btnPrimaryColor: "#4169E1",
        btnPrimaryTextColor: "#ffffff",
        btnSecondaryColor: "transparent",
        btnSecondaryTextColor: "#4169E1",
        btnRadius: "8px",
        btnPaddingVertical: "14px",
        btnPaddingHorizontal: "40px",

        backgroundColor: "#ffffff",
        accentColor: "#4169E1",
        serviceCardBg: "#f8fafc",

        paddingTop: { desktop: 80 },
        paddingBottom: { desktop: 60 },
    },
    render: ({
        title, titleHighlight, subtitle, ctaText1, ctaLink1, ctaText2, ctaLink2,
        service1Title, service1Desc, service2Title, service2Desc, service3Title, service3Desc,
        titleFont, titleSize, titleWeight, titleColor, highlightColor,
        subtitleSize, subtitleColor,
        btnPrimaryColor, btnPrimaryTextColor, btnSecondaryColor, btnSecondaryTextColor, btnRadius, btnPaddingVertical, btnPaddingHorizontal,
        backgroundColor, accentColor, serviceCardBg,
        paddingTop, paddingBottom
    }) => {
        const id = useId();
        const getVal = (obj: { desktop?: number; tablet?: number; mobile?: number } | undefined, key: 'desktop' | 'tablet' | 'mobile') => {
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
                }
                .${id} .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .${id} .hero-content {
                    text-align: center;
                    margin-bottom: 60px;
                    position: relative;
                }
                .${id} h1 { 
                    font-size: ${getVal(titleSize, 'desktop')}rem;
                    font-family: ${titleFont};
                    font-weight: ${titleWeight};
                    color: ${titleColor};
                    line-height: 1.2;
                    margin-bottom: 20px;
                }
                .${id} .highlight { color: ${highlightColor}; }
                .${id} .subtitle { 
                    font-size: ${getVal(subtitleSize, 'desktop')}rem;
                    color: ${subtitleColor};
                    margin-bottom: 32px;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .${id} .button-group {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .${id} .services-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                }
                .${id} .service-card {
                    background: ${serviceCardBg};
                    padding: 32px 24px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }
                .${id} .service-number {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: ${accentColor};
                    margin-bottom: 12px;
                }
                .${id} .service-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: ${accentColor};
                    margin-bottom: 8px;
                }
                .${id} .service-desc {
                    font-size: 0.9rem;
                    color: ${subtitleColor};
                    line-height: 1.5;
                }
                .${id} .icon-tooth {
                    position: absolute;
                    font-size: 3rem;
                    opacity: 0.2;
                }
                .${id} .icon-left { left: 10%; top: 20px; }
                .${id} .icon-right { right: 10%; top: 20px; }

                @media (max-width: 1024px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'tablet')}px;
                        padding-bottom: ${getVal(paddingBottom, 'tablet')}px;
                    }
                    .${id} h1 { font-size: ${getVal(titleSize, 'tablet')}rem; }
                    .${id} .subtitle { font-size: ${getVal(subtitleSize, 'tablet')}rem; }
                }

                @media (max-width: 768px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'mobile')}px;
                        padding-bottom: ${getVal(paddingBottom, 'mobile')}px;
                        padding-left: 24px;
                        padding-right: 24px;
                    }
                    .${id} .hero-content {
                        margin-bottom: 40px;
                    }
                    .${id} h1 { 
                        font-size: ${getVal(titleSize, 'mobile')}rem;
                        line-height: 1.2;
                        margin-bottom: 16px;
                    }
                    .${id} .subtitle { 
                        font-size: ${getVal(subtitleSize, 'mobile')}rem;
                        margin-bottom: 24px;
                        line-height: 1.6;
                    }
                    .${id} .button-group {
                        flex-direction: column;
                        width: 100%;
                        gap: 12px;
                    }
                    .${id} .button-group a {
                        width: 100%;
                        text-align: center;
                        display: block;
                        box-sizing: border-box;
                    }
                    .${id} .services-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }
                    .${id} .service-card {
                        padding: 24px 20px;
                    }
                    .${id} .service-number {
                        font-size: 1.25rem;
                        margin-bottom: 8px;
                    }
                    .${id} .service-title {
                        font-size: 1.1rem;
                        margin-bottom: 6px;
                    }
                    .${id} .service-desc {
                        font-size: 0.875rem;
                        line-height: 1.6;
                    }
                    .${id} .icon-tooth {
                        display: none;
                    }
                }
            `}} />
                <div className="container">
                    <div className="hero-content">
                        <div className="icon-tooth icon-left">🦷</div>
                        <h1>
                            {title} <span className="highlight">{titleHighlight}</span>
                        </h1>
                        <p className="subtitle">{subtitle}</p>
                        <div className="button-group">
                            <a href={ctaLink1} style={{
                                backgroundColor: btnPrimaryColor,
                                color: btnPrimaryTextColor,
                                padding: `${btnPaddingVertical} ${btnPaddingHorizontal}`,
                                borderRadius: btnRadius,
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '1rem',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'opacity 0.2s',
                                display: 'inline-block'
                            }}>
                                {ctaText1}
                            </a>
                            <a href={ctaLink2} style={{
                                backgroundColor: btnSecondaryColor,
                                color: btnSecondaryTextColor,
                                padding: `${btnPaddingVertical} ${btnPaddingHorizontal}`,
                                borderRadius: btnRadius,
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '1rem',
                                border: `2px solid ${btnSecondaryTextColor}`,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'inline-block'
                            }}>
                                {ctaText2}
                            </a>
                        </div>
                        <div className="icon-tooth icon-right">🦷</div>
                    </div>

                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-number">01</div>
                            <div className="service-title">{service1Title}</div>
                            <div className="service-desc">{service1Desc}</div>
                        </div>
                        <div className="service-card">
                            <div className="service-number">02</div>
                            <div className="service-title">{service2Title}</div>
                            <div className="service-desc">{service2Desc}</div>
                        </div>
                        <div className="service-card">
                            <div className="service-number">03</div>
                            <div className="service-title">{service3Title}</div>
                            <div className="service-desc">{service3Desc}</div>
                        </div>
                    </div>
                </div>
            </section>
        )
    },
};
