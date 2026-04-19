import type { ComponentConfig } from "@credbuild/core";
import { ColorPickerField } from "./fields/ColorPickerField";
import React, { useId } from "react";

export type StatsProps = {
    items: { value: string; label: string; valueColor?: string; labelColor?: string }[];
    mobileLayout: 'stack' | 'scroll' | 'grid-2';

    // Styling
    backgroundColor: string;
    cardBgColor: string;
    cardBorderColor: string;
    valueColor: string;
    labelColor: string;

    // Typography
    valueFont?: string;
    labelFont?: string;

    // Spacing
    paddingTop: string;
    paddingBottom: string;
};

const StatsRender = ({
    items, mobileLayout = 'stack',
    backgroundColor = '#ffffff',
    cardBgColor = '#fef2f2',
    cardBorderColor = '#fecaca',
    valueColor = '#dc2626',
    labelColor = '#64748b',
    valueFont = 'inherit',
    labelFont = 'inherit',
    paddingTop = '60px',
    paddingBottom = '60px'
}: StatsProps) => {
    const id = "stats-" + useId().replace(/:/g, "");

    return (
        <section className={id}>
            <style dangerouslySetInnerHTML={{
                __html: `
                .${id} {
                    padding-top: ${paddingTop};
                    padding-bottom: ${paddingBottom};
                    background-color: ${backgroundColor};
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .${id} .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .${id} .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
                    gap: 24px;
                }
                .${id} .card {
                    text-align: center;
                    padding: 32px 20px;
                    background-color: ${cardBgColor};
                    border-radius: 16px;
                    border: 2px solid ${cardBorderColor};
                    transition: transform 0.3s, box-shadow 0.3s;
                    cursor: default;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .${id} .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
                }
                .${id} .value {
                    font-size: 3rem;
                    font-weight: 800;
                    color: ${valueColor};
                    margin-bottom: 8px;
                    line-height: 1.1;
                    font-family: ${valueFont !== 'inherit' ? `"${valueFont}", sans-serif` : 'inherit'};
                }
                .${id} .label {
                    font-size: 1rem;
                    color: ${labelColor};
                    font-weight: 600;
                    font-family: ${labelFont !== 'inherit' ? `"${labelFont}", sans-serif` : 'inherit'};
                }

                @media (max-width: 768px) {
                    .${id} {
                        padding-top: 40px;
                        padding-bottom: 40px;
                        padding-left: 0;
                        padding-right: 0;
                    }
                    .${id} .container {
                       padding-left: 20px;
                       padding-right: ${mobileLayout === 'scroll' ? '0' : '20px'};
                    }

                    .${id} .grid.mobile-scroll {
                        display: flex;
                        overflow-x: auto;
                        padding-bottom: 20px;
                        padding-right: 20px;
                        scroll-snap-type: x mandatory;
                        gap: 12px;
                        scrollbar-width: none;
                    }
                    .${id} .grid.mobile-scroll::-webkit-scrollbar {
                        display: none;
                    }
                    .${id} .grid.mobile-scroll .card {
                        min-width: calc(50% - 6px);
                        max-width: calc(50% - 6px);
                        scroll-snap-align: start;
                        padding: 20px 12px;
                    }
                    .${id} .grid.mobile-scroll .value {
                         font-size: 2rem;
                    }
                     .${id} .grid.mobile-scroll .label {
                         font-size: 0.9rem;
                    }

                     .${id} .grid.mobile-stack {
                         gap: 16px;
                     }

                    .${id} .grid.mobile-grid-2 {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 12px;
                    }
                    .${id} .grid.mobile-grid-2 .card {
                        padding: 24px 12px;
                    }
                    .${id} .grid.mobile-grid-2 .value {
                        font-size: 2rem;
                    }
                    .${id} .grid.mobile-grid-2 .label {
                        font-size: 0.9rem;
                    }
                }
            `}} />
            <div className="container">
                <div className={`grid mobile-${mobileLayout}`}>
                    {items.map((item, i) => (
                        <div key={i} className="card">
                            <div className="value" style={{ color: item.valueColor ? item.valueColor : undefined }}>
                                {item.value}
                            </div>
                            <div className="label" style={{ color: item.labelColor ? item.labelColor : undefined }}>
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const Stats: ComponentConfig<StatsProps> = {
    label: "Statistics",
    fields: {
        items: {
            type: "array",
            arrayFields: {
                value: { type: "text", label: "Value" },
                label: { type: "text", label: "Label" },
                valueColor: { type: "custom", label: "Custom Value Color", render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} /> },
                labelColor: { type: "custom", label: "Custom Label Color", render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} /> }
            },
            getItemSummary: (item) => item.label || "Stat",
        },
        mobileLayout: {
            type: "select",
            label: "📱 Mobile Layout",
            options: [
                { label: "Stack (Vertical)", value: "stack" },
                { label: "Scroll (Horizontal)", value: "scroll" },
                { label: "Grid (2 Columns)", value: "grid-2" },
            ]
        },
        backgroundColor: {
            type: "custom", label: "Section Background",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        cardBgColor: {
            type: "custom", label: "Card Background",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        cardBorderColor: {
            type: "custom", label: "Card Border",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        valueColor: {
            type: "custom", label: "Default Value Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        labelColor: {
            type: "custom", label: "Default Label Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        valueFont: {
            type: "select",
            label: "Value Font",
            options: [
                { label: "Inherit", value: "inherit" },
                { label: "Inter", value: "Inter" },
                { label: "Lato", value: "Lato" },
                { label: "Montserrat", value: "Montserrat" },
                { label: "Playfair Display", value: "Playfair Display" },
                { label: "Roboto", value: "Roboto" },
            ]
        },
        labelFont: {
            type: "select",
            label: "Label Font",
            options: [
                { label: "Inherit", value: "inherit" },
                { label: "Inter", value: "Inter" },
                { label: "Lato", value: "Lato" },
                { label: "Montserrat", value: "Montserrat" },
                { label: "Playfair Display", value: "Playfair Display" },
                { label: "Roboto", value: "Roboto" },
            ]
        },
        paddingTop: { type: "text", label: "Padding Top", placeholder: "60px" },
        paddingBottom: { type: "text", label: "Padding Bottom", placeholder: "60px" },
    },
    defaultProps: {
        items: [
            { value: "100+", label: "Judul Buku" },
            { value: "500+", label: "Eksemplar" },
            { value: "50+", label: "Penulis Puas" },
        ],
        mobileLayout: 'stack',
        backgroundColor: "#ffffff",
        cardBgColor: "#fef2f2",
        cardBorderColor: "#fecaca",
        valueColor: "#dc2626",
        labelColor: "#64748b",
        paddingTop: "60px",
        paddingBottom: "60px",
    },
    render: (props) => <StatsRender {...props} />,
};
