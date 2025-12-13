import React, { useId } from "react";
import type { ComponentConfig } from "@measured/puck";
import { ColorPickerField } from "./fields/ColorPickerField";
import { ResponsiveSliderField, type ResponsiveValue } from "./fields/ResponsiveSliderField";

export type IconGridProps = {
    title: string;
    items: { title: string; description: string; icon: string }[];
    columns?: number;
    mobileLayout?: "grid" | "scroll";
    backgroundColor?: string;
    padding?: ResponsiveValue;
    titleSize?: ResponsiveValue;
    titleColor?: string;
    iconSize?: ResponsiveValue;
    iconColor?: string;
    cardBackgroundColor?: string;
    cardBorderColor?: string;
    itemTitleSize?: ResponsiveValue;
    itemDescriptionSize?: ResponsiveValue;
    itemTextColor?: string;
};

export const IconGrid: ComponentConfig<IconGridProps> = {
    label: "Icon Grid",
    fields: {
        title: { type: "text", label: "Title" },
        items: {
            type: "array",
            arrayFields: {
                title: { type: "text", label: "Title" },
                description: { type: "textarea", label: "Description" },
                icon: { type: "text", label: "Icon" },
            },
            getItemSummary: (item) => item.title || "Item",
        },
        columns: {
            type: "number",
            label: "Desktop Columns",
            min: 1,
            max: 6,
        },
        mobileLayout: {
            type: "select",
            label: "Mobile Layout",
            options: [
                { label: "Vertical Stack", value: "grid" },
                { label: "Horizontal Scroll", value: "scroll" },
            ],
        },
        backgroundColor: {
            type: "custom",
            label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        padding: {
            type: "custom",
            label: "Section Padding (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={0} max={200} step={4} />
        },
        titleSize: {
            type: "custom",
            label: "Title Font Size (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={16} max={96} step={2} />
        },
        titleColor: {
            type: "custom",
            label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        iconSize: {
            type: "custom",
            label: "Icon Size (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={16} max={128} step={4} />
        },
        iconColor: {
            type: "custom",
            label: "Icon Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        cardBackgroundColor: {
            type: "custom",
            label: "Card Background",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        cardBorderColor: {
            type: "custom",
            label: "Card Border Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        itemTitleSize: {
            type: "custom",
            label: "Item Title Size (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={12} max={48} step={1} />
        },
        itemDescriptionSize: {
            type: "custom",
            label: "Item Desc Size (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={10} max={24} step={1} />
        },
        itemTextColor: {
            type: "custom",
            label: "Item Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
    },
    defaultProps: {
        title: "Mengapa Memilih KBM?",
        items: [
            { title: "Profesional", description: "Tim profesional siap melayani", icon: "★" },
            { title: "Royalty 100%", description: "Tanpa potongan apapun", icon: "★" },
            { title: "Transparan", description: "Proses transparan dari awal", icon: "★" },
        ],
        columns: 3,
        mobileLayout: "grid",
        backgroundColor: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)",
        padding: { desktop: 80, tablet: 60, mobile: 40 },
        titleSize: { desktop: 48, tablet: 40, mobile: 28 },
        titleColor: "#ffffff",
        iconSize: { desktop: 56, tablet: 48, mobile: 40 },
        cardBackgroundColor: "rgba(255,255,255,0.1)",
        cardBorderColor: "rgba(255,255,255,0.2)",
        itemTitleSize: { desktop: 24, tablet: 20, mobile: 18 },
        itemDescriptionSize: { desktop: 16, tablet: 15, mobile: 14 },
        itemTextColor: "#ffffff",
    },
    render: ({
        title,
        items,
        columns = 3,
        mobileLayout = "grid",
        backgroundColor = "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)",
        padding = { desktop: 80, tablet: 60, mobile: 40 },
        titleSize = { desktop: 48, tablet: 40, mobile: 28 },
        titleColor = "#ffffff",
        iconSize = { desktop: 56, tablet: 48, mobile: 40 },
        iconColor, // Default is undefined (inherits)
        cardBackgroundColor = "rgba(255,255,255,0.1)",
        cardBorderColor = "rgba(255,255,255,0.2)",
        itemTitleSize = { desktop: 24, tablet: 20, mobile: 18 },
        itemDescriptionSize = { desktop: 16, tablet: 15, mobile: 14 },
        itemTextColor = "#ffffff",
    }) => {
        const id = useId().replace(/:/g, '');
        const uniqueClass = `icon-grid-${id}`;

        const getVal = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.desktop ?? fallback;
        };
        const getTabletVal = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.tablet ?? val?.desktop ?? fallback;
        };
        const getMobileVal = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.mobile ?? val?.tablet ?? val?.desktop ?? fallback;
        };

        return (
            <section className={uniqueClass} style={{
                background: backgroundColor,
                color: 'white',
                position: 'relative',
            }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .${uniqueClass} {
                        padding: ${getVal(padding, 80)}px 20px;
                    }
                    .${uniqueClass} .grid-title {
                        font-size: ${getVal(titleSize, 48)}px;
                    }
                    .${uniqueClass} .grid-icon {
                        font-size: ${getVal(iconSize, 56)}px;
                    }
                    .${uniqueClass} .grid-item-title {
                        font-size: ${getVal(itemTitleSize, 24)}px;
                    }
                    .${uniqueClass} .grid-item-desc {
                        font-size: ${getVal(itemDescriptionSize, 16)}px;
                    }
                    
                    .${uniqueClass} .icon-grid-container {
                        display: grid;
                        grid-template-columns: repeat(${columns}, 1fr);
                        gap: 20px;
                    }

                    @media (max-width: 1024px) {
                        .${uniqueClass} {
                            padding: ${getTabletVal(padding, 60)}px 20px;
                        }
                        .${uniqueClass} .grid-title {
                            font-size: ${getTabletVal(titleSize, 40)}px;
                        }
                        .${uniqueClass} .grid-icon {
                            font-size: ${getTabletVal(iconSize, 48)}px;
                        }
                        .${uniqueClass} .grid-item-title {
                            font-size: ${getTabletVal(itemTitleSize, 20)}px;
                        }
                        .${uniqueClass} .grid-item-desc {
                            font-size: ${getTabletVal(itemDescriptionSize, 15)}px;
                        }
                    }

                    @media (max-width: 768px) {
                        .${uniqueClass} {
                            padding: ${getMobileVal(padding, 40)}px 20px;
                        }
                        .${uniqueClass} .grid-title {
                            font-size: ${getMobileVal(titleSize, 28)}px;
                        }
                         .${uniqueClass} .grid-icon {
                            font-size: ${getMobileVal(iconSize, 40)}px;
                        }
                        .${uniqueClass} .grid-item-title {
                            font-size: ${getMobileVal(itemTitleSize, 18)}px;
                        }
                        .${uniqueClass} .grid-item-desc {
                            font-size: ${getMobileVal(itemDescriptionSize, 14)}px;
                        }

                        .${uniqueClass} .icon-grid-container {
                            ${mobileLayout === "scroll" ? `
                                display: flex;
                                overflow-x: auto;
                                overflow-y: hidden;
                                scroll-snap-type: x mandatory;
                                -webkit-overflow-scrolling: touch;
                                padding-bottom: 20px;
                                margin-left: -20px;
                                margin-right: -20px;
                                padding-left: 20px;
                                padding-right: 20px;
                            ` : `
                                grid-template-columns: 1fr;
                            `}
                        }
                        
                        ${mobileLayout === "scroll" ? `
                        .${uniqueClass} .icon-grid-item {
                            min-width: 280px;
                            scroll-snap-align: center;
                        }
                        ` : ''}
                    }
                `
                }} />

                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <h2 className="grid-title" style={{
                        textAlign: 'center',
                        color: titleColor,
                        marginBottom: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: '800',
                        letterSpacing: '-0.02em',
                    }}>
                        {title}
                    </h2>
                    <div className="icon-grid-container">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="icon-grid-item"
                                style={{
                                    backgroundColor: cardBackgroundColor,
                                    backdropFilter: 'blur(10px)',
                                    border: `1px solid ${cardBorderColor}`,
                                    borderRadius: '16px',
                                    padding: 'clamp(28px, 5vw, 40px) clamp(20px, 4vw, 30px)',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s, background-color 0.3s',
                                    cursor: 'default',
                                    color: itemTextColor,
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    // Hover effect fallback
                                    if (cardBackgroundColor.startsWith('rgba(255,255,255')) {
                                        e.currentTarget.style.backgroundColor = cardBackgroundColor.replace('0.1', '0.15');
                                    }
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.backgroundColor = cardBackgroundColor;
                                }}
                            >
                                <div className="grid-icon" style={{
                                    color: iconColor || 'inherit',
                                    marginBottom: '1.5rem',
                                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
                                }}>
                                    {item.icon}
                                </div>
                                <h3 className="grid-item-title" style={{
                                    marginBottom: '1rem',
                                    fontWeight: '700',
                                }}>
                                    {item.title}
                                </h3>
                                <p className="grid-item-desc" style={{
                                    opacity: 0.95,
                                    lineHeight: '1.6',
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    },
};
