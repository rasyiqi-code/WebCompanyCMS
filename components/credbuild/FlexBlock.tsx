import type { ComponentConfig } from "@credbuild/core";
import { SliderField } from "./fields/SliderField";
import { ResponsiveSliderField } from "./fields/ResponsiveSliderField";
import { ColorPickerField } from "./fields/ColorPickerField";
import React, { useId } from "react";
import Image from "next/image";

const RenderField1 = ({ value, onChange }: any) => <ResponsiveSliderField value={value} onChange={onChange} unit="%" max={100} defaultValue={100} />;
const RenderField2 = ({ value, onChange }: any) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={800} defaultValue={0} />;
const RenderField3 = ({ value, onChange }: any) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={40} />;
const RenderField4 = ({ value, onChange }: any) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={20} />;
const RenderField5 = ({ value, onChange }: any) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={0} />;
const RenderField6 = ({ value, onChange }: any) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={10} step={0.1} defaultValue={2.5} />;
const RenderField7 = ({ value, onChange }: any) => <ColorPickerField value={value} onChange={onChange} />;
const RenderField8 = ({ value, onChange }: any) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={5} step={0.1} defaultValue={1.1} />;
const RenderField9 = ({ value, onChange }: any) => <SliderField value={value} onChange={onChange} unit="px" max={100} defaultValue="0px" />;
const RenderField10 = ({ value, onChange }: any) => <SliderField value={value} onChange={onChange} unit="px" max={20} defaultValue="0px" />;


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

const FlexBlockRender = ({
    title, description, image,
    alignContent, width, minHeight,
    paddingTop, paddingBottom, paddingLeft, paddingRight, marginTop, marginBottom,
    titleFontFamily, titleSize, titleWeight, titleColor,
    descFontFamily, descSize, descColor,
    backgroundColor, backgroundImage, borderRadius, borderWidth, borderColor
}: FlexBlockProps) => {
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
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        marginBottom: '1.5rem',
                    }}>
                        <Image
                            src={image}
                            alt={title}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-cover"
                            style={{
                                borderRadius: 'calc(' + borderRadius + ' / 2)'
                            }}
                            sizes="(max-width: 1200px) 100vw, 1200px"
                        />
                    </div>
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
};

export const FlexBlock: ComponentConfig<FlexBlockProps> = {
    label: "Flex Block (Pro)",
    fields: {
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" },
        image: { type: "text", label: "Image URL" },
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
            render: RenderField1
        },
        minHeight: {
            type: "custom", label: "Min Height (px)",
            render: RenderField2
        },
        paddingTop: {
            type: "custom", label: "Padding Top",
            render: RenderField3
        },
        paddingBottom: {
            type: "custom", label: "Padding Bottom",
            render: RenderField3
        },
        paddingLeft: {
            type: "custom", label: "Padding Left",
            render: RenderField4
        },
        paddingRight: {
            type: "custom", label: "Padding Right",
            render: RenderField4
        },
        marginTop: {
            type: "custom", label: "Margin Top",
            render: RenderField5
        },
        marginBottom: {
            type: "custom", label: "Margin Bottom",
            render: RenderField5
        },
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
            render: RenderField6
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
            render: RenderField7
        },
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
            render: RenderField8
        },
        descColor: {
            type: "custom", label: "Desc Color",
            render: RenderField7
        },
        backgroundColor: {
            type: "custom", label: "Background Color",
            render: RenderField7
        },
        backgroundImage: { type: "text", label: "Background Image URL" },
        borderRadius: {
            type: "custom", label: "Border Radius",
            render: RenderField9
        },
        borderWidth: {
            type: "custom", label: "Border Width",
            render: RenderField10
        },
        borderColor: {
            type: "custom", label: "Border Color",
            render: RenderField7
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
    render: FlexBlockRender,
};
