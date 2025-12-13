import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "./fields/SliderField";
import { ResponsiveSliderField } from "./fields/ResponsiveSliderField";
import { ColorPickerField } from "./fields/ColorPickerField";
import React, { useId } from "react";

export type FlexBlockProps = {
    // Content
    title: string;
    description: string;
    image?: string;

    // Layout
    alignContent: "left" | "center" | "right";
    width: { desktop?: number; tablet?: number; mobile?: number };
    minHeight: { desktop?: number; tablet?: number; mobile?: number };

    // Spacing
    paddingTop: { desktop?: number; tablet?: number; mobile?: number };
    paddingBottom: { desktop?: number; tablet?: number; mobile?: number };
    paddingLeft: { desktop?: number; tablet?: number; mobile?: number };
    paddingRight: { desktop?: number; tablet?: number; mobile?: number };
    marginTop: { desktop?: number; tablet?: number; mobile?: number };
    marginBottom: { desktop?: number; tablet?: number; mobile?: number };

    // Typography
    titleFontFamily: string;
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;
    titleColor: string;

    descFontFamily: string;
    descSize: { desktop?: number; tablet?: number; mobile?: number };
    descColor: string;

    // Background & Border
    backgroundColor: string;
    backgroundImage?: string;
    borderRadius: string;
    borderWidth: string;
    borderColor: string;
};

export const FlexBlock: ComponentConfig<FlexBlockProps> = {
    label: "Flex Block (Pro)",
    fields: {
        // Content Group
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" },
        image: { type: "text", label: "Image URL" },

        // Layout Group
        alignContent: {
            type: "radio",
            label: "Content Alignment",
            options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" }
            ]
        },
        width: {
            type: "custom", label: "Width (%)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="%" max={100} defaultValue={100} />
        },
        minHeight: {
            type: "custom", label: "Min Height (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={800} defaultValue={0} />
        },

        // Spacing Group
        paddingTop: {
            type: "custom", label: "Padding Top",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={40} />
        },
        paddingBottom: {
            type: "custom", label: "Padding Bottom",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={40} />
        },
        paddingLeft: {
            type: "custom", label: "Padding Left",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={20} />
        },
        paddingRight: {
            type: "custom", label: "Padding Right",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={20} />
        },
        marginTop: {
            type: "custom", label: "Margin Top",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={0} />
        },
        marginBottom: {
            type: "custom", label: "Margin Bottom",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={0} />
        },

        // Typography Group - Title
        titleFontFamily: {
            type: "select",
            label: "Title Font",
            options: [
                { label: "Inter", value: "Inter" },
                { label: "Lato", value: "Lato" },
                { label: "Montserrat", value: "Montserrat" },
                { label: "Playfair Display", value: "Playfair Display" },
                { label: "Roboto", value: "Roboto" }
            ]
        },
        titleSize: {
            type: "custom", label: "Title Size (rem)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={10} step={0.1} defaultValue={2.5} />
        },
        titleWeight: {
            type: "select",
            label: "Title Weight",
            options: [
                { label: "Normal (400)", value: "400" },
                { label: "Medium (500)", value: "500" },
                { label: "SemiBold (600)", value: "600" },
                { label: "Bold (700)", value: "700" },
                { label: "ExtraBold (800)", value: "800" }
            ]
        },
        titleColor: {
            type: "custom", label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Typography Group - Description
        descFontFamily: {
            type: "select",
            label: "Desc Font",
            options: [
                { label: "Inter", value: "Inter" },
                { label: "Lato", value: "Lato" },
                { label: "Montserrat", value: "Montserrat" },
                { label: "Playfair Display", value: "Playfair Display" },
                { label: "Roboto", value: "Roboto" }
            ]
        },
        descSize: {
            type: "custom", label: "Desc Size (rem)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={5} step={0.1} defaultValue={1.1} />
        },
        descColor: {
            type: "custom", label: "Desc Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Style Group
        backgroundColor: {
            type: "custom", label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        backgroundImage: { type: "text", label: "Background Image URL" },
        borderRadius: {
            type: "custom", label: "Border Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={100} defaultValue="0px" />
        },
        borderWidth: {
            type: "custom", label: "Border Width",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={20} defaultValue="0px" />
        },
        borderColor: {
            type: "custom", label: "Border Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
    },
    defaultProps: {
        title: "Fully Customizable Block",
        description: "This block behaves like an Elementor section. You can tweak almost everything.",
        alignContent: "left",
        width: { desktop: 100 },
        minHeight: { desktop: 0 },
        paddingTop: { desktop: 40 },
        paddingBottom: { desktop: 40 },
        paddingLeft: { desktop: 20 },
        paddingRight: { desktop: 20 },
        marginTop: { desktop: 0 },
        marginBottom: { desktop: 0 },
        titleFontFamily: "Inter",
        titleSize: { desktop: 2.5 },
        titleWeight: "700",
        titleColor: "#1e293b",
        descFontFamily: "Inter",
        descSize: { desktop: 1.1 },
        descColor: "#475569",
        backgroundColor: "#ffffff",
        borderRadius: "0px",
        borderWidth: "0px",
        borderColor: "transparent",
    },
    render: ({
        title, description, image,
        alignContent, width, minHeight,
        paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom,
        titleFontFamily, titleSize, titleWeight, titleColor,
        descFontFamily, descSize, descColor,
        backgroundColor, backgroundImage, borderRadius, borderWidth, borderColor
    }) => {
        // Safe access helpers (default to desktop or 0 if missing)
        const getVal = (prop: any, key: 'desktop' | 'tablet' | 'mobile', def: number = 0) => {
            if (!prop) return def;
            // Fallback chain: Mobile -> Tablet -> Desktop -> Default
            if (key === 'mobile') return prop.mobile ?? prop.tablet ?? prop.desktop ?? def;
            if (key === 'tablet') return prop.tablet ?? prop.desktop ?? def;
            return prop.desktop ?? def;
        };

        const uniqueId = `flex-${useId().replace(/:/g, "")}`;

        return (
            <div className={uniqueId} style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                fontFamily: titleFontFamily // Fallback
            }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap');

                    .${uniqueId} {
                        margin-top: ${getVal(marginTop, 'desktop')}px;
                        margin-bottom: ${getVal(marginBottom, 'desktop')}px;
                    }
                    .${uniqueId} .inner-container {
                        width: ${getVal(width, 'desktop')}%;
                        min-height: ${getVal(minHeight, 'desktop')}px;
                        padding-top: ${getVal(paddingTop, 'desktop')}px;
                        padding-bottom: ${getVal(paddingBottom, 'desktop')}px;
                        padding-left: ${getVal(paddingLeft, 'desktop')}px;
                        padding-right: ${getVal(paddingRight, 'desktop')}px;
                    }
                    .${uniqueId} h2 { font-size: ${getVal(titleSize, 'desktop')}rem; }
                    .${uniqueId} p { font-size: ${getVal(descSize, 'desktop')}rem; }

                    /* Tablet */
                    @media (max-width: 1024px) {
                        .${uniqueId} {
                            margin-top: ${getVal(marginTop, 'tablet')}px;
                            margin-bottom: ${getVal(marginBottom, 'tablet')}px;
                        }
                        .${uniqueId} .inner-container {
                            width: ${getVal(width, 'tablet')}%;
                            min-height: ${getVal(minHeight, 'tablet')}px;
                            padding-top: ${getVal(paddingTop, 'tablet')}px;
                            padding-bottom: ${getVal(paddingBottom, 'tablet')}px;
                            padding-left: ${getVal(paddingLeft, 'tablet')}px;
                            padding-right: ${getVal(paddingRight, 'tablet')}px;
                        }
                        .${uniqueId} h2 { font-size: ${getVal(titleSize, 'tablet')}rem; }
                        .${uniqueId} p { font-size: ${getVal(descSize, 'tablet')}rem; }
                    }

                    /* Mobile */
                    @media (max-width: 768px) {
                        .${uniqueId} {
                            margin-top: ${getVal(marginTop, 'mobile')}px;
                            margin-bottom: ${getVal(marginBottom, 'mobile')}px;
                        }
                        .${uniqueId} .inner-container {
                            width: ${getVal(width, 'mobile')}%;
                            min-height: ${getVal(minHeight, 'mobile')}px;
                            padding-top: ${getVal(paddingTop, 'mobile')}px;
                            padding-bottom: ${getVal(paddingBottom, 'mobile')}px;
                            padding-left: ${getVal(paddingLeft, 'mobile')}px;
                            padding-right: ${getVal(paddingRight, 'mobile')}px;
                        }
                        .${uniqueId} h2 { font-size: ${getVal(titleSize, 'mobile')}rem; }
                        .${uniqueId} p { font-size: ${getVal(descSize, 'mobile')}rem; }
                    }
                `}} />

                <div className="inner-container" style={{
                    backgroundColor: backgroundColor,
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: borderRadius,
                    border: `${borderWidth} solid ${borderColor}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: alignContent === 'center' ? 'center' : alignContent === 'right' ? 'flex-end' : 'flex-start',
                    textAlign: alignContent,
                    transition: 'all 0.3s ease'
                }}>
                    {image && (
                        <img
                            src={image}
                            alt={title}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                marginBottom: '1.5rem',
                                borderRadius: 'calc(' + borderRadius + ' / 2)'
                            }}
                        />
                    )}

                    <h2 style={{
                        fontFamily: titleFontFamily,
                        fontWeight: titleWeight,
                        color: titleColor,
                        marginBottom: '1rem',
                        lineHeight: 1.2,
                        margin: 0,
                        paddingBottom: '1rem' // Visual spacing
                    }}>
                        {title}
                    </h2>

                    <p style={{
                        fontFamily: descFontFamily,
                        color: descColor,
                        lineHeight: 1.6,
                        maxWidth: '65ch',
                        whiteSpace: 'pre-line', // Preserve line breaks
                        margin: 0
                    }}>
                        {description}
                    </p>
                </div>
            </div>
        );
    }
};
