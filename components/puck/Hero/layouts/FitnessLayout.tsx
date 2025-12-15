import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "../../fields/SliderField";
import { ResponsiveSliderField } from "../../fields/ResponsiveSliderField";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type HeroFitnessProps = {
    title: string;
    subtitle: string;
    ctaText: string;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
    imageUrl4: string;

    // Typography
    titleFont: string;
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;
    titleColor: string;

    subtitleSize: { desktop?: number; tablet?: number; mobile?: number };
    subtitleColor: string;

    // Button
    btnPrimaryColor: string;
    btnPrimaryTextColor: string;
    btnSecondaryColor: string;
    btnSecondaryTextColor: string;
    btnRadius: string;
    btnPaddingVertical: string;
    btnPaddingHorizontal: string;

    // Layout
    backgroundColor: string;
    accentColor1: string;
    accentColor2: string;
    paddingTop: { desktop?: number; tablet?: number; mobile?: number };
    paddingBottom: { desktop?: number; tablet?: number; mobile?: number };
    gap: { desktop?: number; tablet?: number; mobile?: number };
};

export const HeroFitness: ComponentConfig<HeroFitnessProps> = {
    label: "Hero - Fitness/Gym",
    fields: {
        title: { type: "text", label: "📝 Title" },
        subtitle: { type: "textarea", label: "📄 Subtitle" },
        ctaText: { type: "text", label: "🔘 CTA Button" },

        imageUrl1: { type: "text", label: "🖼️ Image 1 (Top Left)" },
        imageUrl2: { type: "text", label: "🖼️ Image 2 (Top Right)" },
        imageUrl3: { type: "text", label: "🖼️ Image 3 (Bottom Left - Circle)" },
        imageUrl4: { type: "text", label: "🖼️ Image 4 (Bottom Right)" },

        titleFont: {
            type: "select", label: "Title Font",
            options: [
                { label: "Oswald", value: "Oswald" },
                { label: "Inter", value: "Inter" },
                { label: "Roboto Condensed", value: "Roboto Condensed" },
                { label: "Montserrat", value: "Montserrat" },
            ]
        },
        titleSize: {
            type: "custom", label: "Title Size (rem)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={8} step={0.1} defaultValue={4.5} />
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
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={3} step={0.1} defaultValue={1.2} />
        },
        subtitleColor: {
            type: "custom", label: "Subtitle Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        btnPrimaryColor: {
            type: "custom", label: "Primary Btn Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnPrimaryTextColor: {
            type: "custom", label: "Primary Btn Text",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnSecondaryColor: {
            type: "custom", label: "Secondary Btn Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnSecondaryTextColor: {
            type: "custom", label: "Secondary Btn Text",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnRadius: {
            type: "custom", label: "Button Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={50} defaultValue="50px" />
        },
        btnPaddingVertical: {
            type: "custom", label: "Button Padding (Vertical)",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={40} defaultValue="16px" />
        },
        btnPaddingHorizontal: {
            type: "custom", label: "Button Padding (Horizontal)",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={80} defaultValue="40px" />
        },

        backgroundColor: {
            type: "custom", label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        accentColor1: {
            type: "custom", label: "Accent Circle",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        accentColor2: {
            type: "custom", label: "Accent Border",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        gap: {
            type: "custom", label: "Grid Gap",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={100} defaultValue={40} />
        },
        paddingTop: {
            type: "custom", label: "Padding Top",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={80} />
        },
        paddingBottom: {
            type: "custom", label: "Padding Bottom",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={80} />
        },
    },
    defaultProps: {
        title: "SHAPE YOUR IDEAL BODY",
        subtitle: "Take the first step towards a healthier, stronger you with our premium fitness programs.",
        ctaText: "Get Started Now",

        imageUrl1: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80",
        imageUrl2: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=600&q=80",
        imageUrl3: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
        imageUrl4: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",

        titleFont: "Oswald",
        titleSize: { desktop: 4.5 },
        titleWeight: "800",
        titleColor: "#ffffff",

        subtitleSize: { desktop: 1.2 },
        subtitleColor: "#9ca3af",

        btnPrimaryColor: "#e11d48",
        btnPrimaryTextColor: "#ffffff",
        btnSecondaryColor: "transparent",
        btnSecondaryTextColor: "#ffffff",
        btnRadius: "50px",
        btnPaddingVertical: "16px",
        btnPaddingHorizontal: "40px",

        backgroundColor: "#111827",
        accentColor1: "#e11d48",
        accentColor2: "#ffffff",

        gap: { desktop: 40 },
        paddingTop: { desktop: 80 },
        paddingBottom: { desktop: 80 },
    },
    render: ({
        title, subtitle, ctaText,
        imageUrl1, imageUrl2, imageUrl3, imageUrl4,
        titleFont, titleSize, titleWeight, titleColor,
        subtitleSize, subtitleColor,
        btnPrimaryColor, btnPrimaryTextColor, btnSecondaryColor, btnSecondaryTextColor, btnRadius, btnPaddingVertical, btnPaddingHorizontal,
        backgroundColor, accentColor1, accentColor2,
        paddingTop, paddingBottom, gap
    }) => {
        const id = "fitness-" + useId().replace(/:/g, "");
        const getVal = (obj: { desktop?: number; tablet?: number; mobile?: number } | undefined, key: 'desktop' | 'tablet' | 'mobile') => {
            if (key === 'mobile' && obj && !obj.mobile && obj.desktop) {
                return obj.desktop * 0.5;
            }
            if (key === 'tablet' && obj && !obj.tablet && obj.desktop) {
                return obj.desktop * 0.8;
            }
            return obj?.[key] ?? obj?.desktop ?? 0;
        };

        return (
            <section className={id} style={{ backgroundColor, position: 'relative' }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                .${id} {
                    padding-top: ${getVal(paddingTop, 'desktop')}px;
                    padding-bottom: ${getVal(paddingBottom, 'desktop')}px;
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .${id} .main-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: ${getVal(gap, 'desktop')}px;
                    align-items: center;
                }
                .${id} h1 { font-size: ${getVal(titleSize, 'desktop')}rem; }
                .${id} p { font-size: ${getVal(subtitleSize, 'desktop')}rem; }

                @media (max-width: 1024px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'tablet')}px;
                        padding-bottom: ${getVal(paddingBottom, 'tablet')}px;
                    }
                    .${id} .main-grid {
                        gap: ${getVal(gap, 'tablet')}px;
                    }
                    .${id} h1 { font-size: ${getVal(titleSize, 'tablet')}rem; }
                    .${id} p { font-size: ${getVal(subtitleSize, 'tablet')}rem; }
                }

                @media (max-width: 768px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'mobile')}px;
                        padding-bottom: ${getVal(paddingBottom, 'mobile')}px;
                        padding-left: 24px;
                        padding-right: 24px;
                        overflow-x: hidden;
                    }
                    .${id} .main-grid {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                    .${id} h1 { 
                        font-size: clamp(2.5rem, ${getVal(titleSize, 'mobile')}rem, 3.5rem);
                        line-height: 1.1;
                        margin-bottom: 16px;
                        word-break: break-word;
                    }
                    .${id} p { 
                        font-size: ${getVal(subtitleSize, 'mobile')}rem;
                        line-height: 1.6;
                        max-width: 100%;
                    }
                    /* Optimize image grid for mobile */
                    .${id} .image-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 12px !important;
                    }
                    /* Stack buttons on mobile */
                    .${id} .main-grid > div:first-child > div:last-child {
                        flex-direction: column;
                        gap: 12px;
                    }
                    .${id} .main-grid > div:first-child > div:last-child > * {
                        width: 100%;
                        text-align: center;
                        padding: 16px 24px;
                        box-sizing: border-box;
                    }
                    /* Reorder: content first, images second */
                    .${id} .main-grid > div:last-child {
                        order: 2;
                    }
                }
`}} />
                <div className="main-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Content */}
                    <div>
                        <h1 style={{
                            fontFamily: titleFont, fontWeight: titleWeight, color: titleColor, lineHeight: '1.1', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px'
                        }}>
                            {title}
                        </h1>
                        <p style={{
                            color: subtitleColor, marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '500px'
                        }}>
                            {subtitle}
                        </p>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <button style={{
                                backgroundColor: btnPrimaryColor, color: btnPrimaryTextColor, padding: `${btnPaddingVertical} ${btnPaddingHorizontal}`, borderRadius: btnRadius, border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s', boxSizing: 'border-box'
                            }}>
                                {ctaText}
                            </button>
                            <button style={{
                                backgroundColor: btnSecondaryColor, color: btnSecondaryTextColor, padding: `${btnPaddingVertical} ${btnPaddingHorizontal}`, borderRadius: btnRadius, border: `2px solid ${btnSecondaryTextColor}`, cursor: 'pointer', fontWeight: '700', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', boxSizing: 'border-box'
                            }}>
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Images Grid */}
                    <div className="image-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                        <div style={{ aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#1f2937' }}>
                            <img src={imageUrl1} alt="Gym 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ aspectRatio: '3/4', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#1f2937', marginTop: '40px' }}>
                            <img src={imageUrl2} alt="Gym 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ aspectRatio: '1', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#1f2937', border: `4px solid ${accentColor1} `, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={imageUrl3} alt="Gym 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#1f2937', borderBottom: `8px solid ${accentColor2} `, borderRight: `8px solid ${accentColor2} ` }}>
                            <img src={imageUrl4} alt="Gym 4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </section>
        )
    },
};
