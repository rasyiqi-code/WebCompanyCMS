import type { ComponentConfig } from "@measured/puck";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type PricingBoxProps = {
    title: string;
    description: string;
    mainColor?: string;
    titleFont?: string;
    bodyFont?: string;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    items: {
        name: string;
        price: string;
        pricePrefix?: string;
        priceSuffix?: string;
        highlightLabel?: string;
        buttonText?: string;
        buttonUrl?: string;
        features: { feature: string }[]
    }[];
};

export const PricingBox: ComponentConfig<PricingBoxProps> = {
    label: "Pricing Box",
    fields: {
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" },
        mainColor: {
            type: "custom",
            label: "🎨 Main Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        titleFont: {
            type: "select",
            label: "Title Font",
            options: [
                { label: "Inherit", value: "inherit" },
                { label: "Inter", value: "Inter" },
                { label: "Lato", value: "Lato" },
                { label: "Montserrat", value: "Montserrat" },
                { label: "Playfair Display", value: "Playfair Display" },
                { label: "Roboto", value: "Roboto" },
            ]
        },
        bodyFont: {
            type: "select",
            label: "Body Font",
            options: [
                { label: "Inherit", value: "inherit" },
                { label: "Inter", value: "Inter" },
                { label: "Lato", value: "Lato" },
                { label: "Montserrat", value: "Montserrat" },
                { label: "Playfair Display", value: "Playfair Display" },
                { label: "Roboto", value: "Roboto" },
            ]
        },
        columnsDesktop: { type: "number", label: "Desktop Columns", placeholder: "3" },
        columnsTablet: { type: "number", label: "Tablet Columns", placeholder: "2" },
        columnsMobile: { type: "number", label: "Mobile Columns", placeholder: "1" },
        items: {
            type: "array",
            arrayFields: {
                highlightLabel: { type: "text", label: "Highlight Label" },
                name: { type: "text", label: "Package Name" },
                pricePrefix: { type: "text", label: "Price Prefix" },
                price: { type: "text", label: "Price" },
                priceSuffix: { type: "text", label: "Price Suffix" },
                buttonText: { type: "text", label: "Button Text" },
                buttonUrl: { type: "text", label: "Button URL" },
                features: {
                    type: "array",
                    arrayFields: {
                        feature: { type: "text", label: "Feature" },
                    },
                },
            },
            getItemSummary: (item) => item.name || "Package",
        },
    },
    defaultProps: {
        title: "Standard Pricing",
        description: "Clear and concise pricing for your business.",
        columnsDesktop: 3,
        columnsTablet: 2,
        columnsMobile: 1,
        items: [
            {
                name: "Starter",
                price: "$29",
                priceSuffix: "/mo",
                buttonText: "Start Now",
                features: [{ feature: "Core Features" }, { feature: "Community Support" }]
            },
            {
                name: "Growth",
                price: "$59",
                priceSuffix: "/mo",
                highlightLabel: "Popular",
                buttonText: "Scale Up",
                features: [{ feature: "All Core Features" }, { feature: "Priority Support" }, { feature: "Advanced Analytics" }]
            },
            {
                name: "Enterprise",
                price: "$199",
                priceSuffix: "/mo",
                buttonText: "Contact Us",
                features: [{ feature: "Custom Integration" }, { feature: "24/7 Support" }]
            }
        ],
    },
    render: ({ title, description, items, columnsDesktop, columnsTablet, columnsMobile, titleFont = 'inherit', bodyFont = 'inherit', mainColor }) => {
        const id = useId();
        const primaryColor = mainColor || '#2563eb'; // Default Blue

        const PricingCard = ({ item, i }: any) => {
            const ButtonComponent = item.buttonUrl ? 'a' : 'button';
            const buttonProps = item.buttonUrl ? { href: item.buttonUrl } : {};

            return (
                <div
                    key={i}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        fontFamily: bodyFont !== 'inherit' ? `"${bodyFont}", sans-serif` : 'inherit',
                        border: `1px solid #e5e7eb`,
                        height: '100%',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.1)';
                    }}
                >
                    {/* Header - Solid Color */}
                    <div style={{
                        backgroundColor: primaryColor,
                        padding: '32px 24px',
                        color: 'white',
                        textAlign: 'center',
                    }}>
                        <h3 style={{
                            margin: 0,
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            {item.name}
                        </h3>
                        {item.highlightLabel && (
                            <div style={{
                                marginTop: '8px',
                                fontSize: '0.8rem',
                                opacity: 0.9,
                                fontWeight: '500'
                            }}>
                                {item.highlightLabel}
                            </div>
                        )}
                    </div>

                    {/* Price Section */}
                    <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'center',
                            color: '#111827'
                        }}>
                            {item.pricePrefix && <span style={{ fontSize: '1rem', color: '#6b7280', marginRight: '4px' }}>{item.pricePrefix}</span>}
                            <span style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1 }}>{item.price}</span>
                            {item.priceSuffix && <span style={{ fontSize: '1rem', color: '#6b7280', marginLeft: '4px' }}>{item.priceSuffix}</span>}
                        </div>
                    </div>

                    {/* Features */}
                    <div style={{ flex: 1, padding: '32px 24px' }}>
                        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                            {item.features?.map((f: any, j: number) => (
                                <li key={j} style={{
                                    padding: '12px 0',
                                    borderBottom: '1px solid #f3f4f6',
                                    color: '#4b5563',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div style={{
                                        width: '20px', height: '20px', borderRadius: '50%',
                                        backgroundColor: `${primaryColor}20`, // 20% opacity
                                        color: primaryColor,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.75rem', fontWeight: 'bold'
                                    }}>
                                        ✓
                                    </div>
                                    {f.feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer */}
                    <div style={{ padding: '0 24px 32px' }}>
                        <ButtonComponent
                            {...buttonProps}
                            style={{
                                width: '100%',
                                padding: '16px',
                                backgroundColor: 'transparent',
                                border: `2px solid ${primaryColor}`,
                                borderRadius: '8px',
                                color: primaryColor,
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                display: 'flex', // Standardized box model
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxSizing: 'border-box',
                                textDecoration: 'none',
                                transition: 'all 0.2s',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = primaryColor;
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = primaryColor;
                            }}
                        >
                            {item.buttonText || "Choose Plan"}
                        </ButtonComponent>
                    </div>
                </div>
            );
        };

        return (
            <section className={id} style={{ padding: '80px 20px', backgroundColor: '#f9fafb' }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .${id} .grid-container {
                        display: grid;
                        grid-template-columns: repeat(${columnsDesktop || 3}, 1fr);
                        gap: 30px;
                    }
                    @media (max-width: 1024px) {
                        .${id} .grid-container {
                            grid-template-columns: repeat(${columnsTablet || 2}, 1fr);
                        }
                    }
                    @media (max-width: 768px) {
                        .${id} .grid-container {
                            grid-template-columns: repeat(${columnsMobile || 1}, 1fr);
                        }
                    }
                `}} />

                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                        fontWeight: '800',
                        color: '#111827',
                        marginBottom: '1rem',
                        fontFamily: titleFont !== 'inherit' ? `"${titleFont}", sans-serif` : 'inherit'
                    }}>
                        {title}
                    </h2>
                    <p style={{
                        fontSize: '1.125rem',
                        color: '#6b7280',
                        maxWidth: '600px',
                        margin: '0 auto 60px',
                        fontFamily: bodyFont !== 'inherit' ? `"${bodyFont}", sans-serif` : 'inherit'
                    }}>
                        {description}
                    </p>

                    <div className="grid-container">
                        {items.map((item, i) => <PricingCard key={i} item={item} i={i} />)}
                    </div>
                </div>
            </section>
        );
    }
};
