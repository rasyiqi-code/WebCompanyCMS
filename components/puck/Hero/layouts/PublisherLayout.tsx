import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "../../fields/SliderField";
import { ResponsiveSliderField } from "../../fields/ResponsiveSliderField";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type HeroPublisherProps = {
    title: string;
    description: string;
    date: string;
    author: string;
    imageUrl: string;

    // Typography
    titleFont: string;
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;
    subtitleFont: string;
    subtitleSize: { desktop?: number; tablet?: number; mobile?: number };

    // Colors
    backgroundColor: string;
    textColor: string;

    // Spacing
    paddingTop: { desktop?: number; tablet?: number; mobile?: number };
    paddingBottom: { desktop?: number; tablet?: number; mobile?: number };
};

export const HeroPublisher: ComponentConfig<HeroPublisherProps> = {
    label: "Hero - Book Publisher",
    fields: {
        title: { type: "text", label: "📝 Title" },
        description: { type: "textarea", label: "📄 Description" },
        date: { type: "text", label: "📅 Date" },
        author: { type: "text", label: "👤 Author" },
        imageUrl: { type: "text", label: "🖼️ Image URL" },

        titleFont: {
            type: "select", label: "Title Font",
            options: [
                { label: "Montserrat", value: "Montserrat" },
                { label: "Inter", value: "Inter" },
                { label: "Lato", value: "Lato" },
                { label: "Playfair Display", value: "Playfair Display" },
                { label: "Roboto", value: "Roboto" },
            ]
        },
        titleSize: {
            type: "custom", label: "Title Size (rem)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={6} step={0.1} defaultValue={3} />
        },
        titleWeight: {
            type: "select", label: "Title Weight",
            options: [{ label: "Bold", value: "700" }, { label: "ExtraBold", value: "800" }]
        },

        subtitleFont: {
            type: "select", label: "Body Font",
            options: [
                { label: "Montserrat", value: "Montserrat" },
                { label: "Inter", value: "Inter" },
                { label: "Lato", value: "Lato" },
                { label: "Playfair Display", value: "Playfair Display" },
                { label: "Roboto", value: "Roboto" },
            ]
        },
        subtitleSize: {
            type: "custom", label: "Body Size (rem)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={2} step={0.1} defaultValue={1} />
        },

        backgroundColor: {
            type: "custom", label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        textColor: {
            type: "custom", label: "Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        paddingTop: {
            type: "custom", label: "Padding Top",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={60} />
        },
        paddingBottom: {
            type: "custom", label: "Padding Bottom",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={60} />
        },
    },
    defaultProps: {
        title: "The Art of Publishing",
        description: "Discover the stories that shape our world.",
        date: "Oct 12, 2023",
        author: "John Doe",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",

        titleFont: "Montserrat",
        titleSize: { desktop: 3 },
        titleWeight: "700",
        subtitleFont: "Montserrat",
        subtitleSize: { desktop: 1 },

        backgroundColor: "#ffffff",
        textColor: "#1a202c",
        paddingTop: { desktop: 60 },
        paddingBottom: { desktop: 60 },
    },
    render: ({
        title, description, date, author, imageUrl,
        titleFont, titleSize, titleWeight, subtitleFont, subtitleSize,
        backgroundColor, textColor, paddingTop, paddingBottom
    }) => {
        const id = useId();
        const getVal = (obj: { desktop?: number; tablet?: number; mobile?: number } | undefined, key: 'desktop' | 'tablet' | 'mobile') => {
            return obj?.[key] ?? obj?.desktop ?? 0;
        };

        return (
            <section className={id} style={{ backgroundColor, color: textColor }} suppressHydrationWarning>
                <style dangerouslySetInnerHTML={{
                    __html: `
                .${id} {
                    padding-top: ${getVal(paddingTop, 'desktop')}px;
                    padding-bottom: ${getVal(paddingBottom, 'desktop')}px;
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .${id} .grid {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    align-items: center;
                }
                .${id} h1 { font-size: ${getVal(titleSize, 'desktop')}rem; }
                .${id} p { font-size: ${getVal(subtitleSize, 'desktop')}rem; }

                @media (max-width: 1024px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'tablet')}px;
                        padding-bottom: ${getVal(paddingBottom, 'tablet')}px;
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
                    }
                    .${id} h1 { 
                        font-size: ${getVal(titleSize, 'mobile')}rem;
                        line-height: 1.2;
                        margin-bottom: 16px;
                    }
                    .${id} p { 
                        font-size: ${getVal(subtitleSize, 'mobile')}rem;
                        line-height: 1.7;
                        margin-bottom: 24px;
                    }
                    .${id} .grid { 
                        grid-template-columns: 1fr !important;
                        gap: 32px !important;
                    }
                    /* Image first on mobile for better visual impact */
                    .${id} .grid > div:nth-child(2) {
                        order: -1;
                    }
                    /* Better mobile image sizing */
                    .${id} .grid > div:nth-child(2) img {
                        max-height: 400px;
                        object-fit: cover;
                    }
                    /* Mobile metadata styling */
                    .${id} .grid > div:first-child > div:first-child {
                        margin-bottom: 12px;
                        font-size: 0.85rem;
                        justify-content: center;
                    }
                    /* Center text on mobile */
                    .${id} .grid > div:first-child {
                        text-align: center;
                    }
                    /* Center wavy divider */
                    .${id} .grid > div:first-child svg {
                        margin: 0 auto;
                    }
                }
`}} />
                <div className="grid">
                    <div>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: textColor, opacity: 0.7, marginBottom: '16px', fontFamily: subtitleFont }}>
                            <span>{date}</span> • <span>{author}</span>
                        </div>
                        <h1 style={{
                            fontFamily: titleFont, fontWeight: titleWeight, lineHeight: '1.2', marginBottom: '24px', margin: 0
                        }}>
                            {title}
                        </h1>
                        <p style={{
                            fontFamily: subtitleFont, lineHeight: '1.6', opacity: 0.9, marginBottom: '32px'
                        }}>
                            {description}
                        </p>

                        {/* Wavy Divider */}
                        <svg width="100" height="10" viewBox="0 0 100 10" fill="none" style={{ display: 'block' }}>
                            <path d="M0 5 Q 12.5 0, 25 5 T 50 5 T 75 5 T 100 5" stroke={textColor} strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                    <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
                        <img src={imageUrl} alt="Hero" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                </div>
            </section>
        )
    },
};
