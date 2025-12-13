import type { ComponentConfig } from "@measured/puck";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type PricingGradientProps = {
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

export const PricingGradient: ComponentConfig<PricingGradientProps> = {
    label: "Pricing Gradient",
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
        title: "Premium Plans",
        description: "Unlock full potential with our premium plans.",
        mainColor: "#8b5cf6",
        columnsDesktop: 3,
        columnsTablet: 2,
        columnsMobile: 1,
        items: [
            {
                name: "Personal",
                price: "$15",
                priceSuffix: "/mo",
                buttonText: "Join Now",
                features: [{ feature: "Single User" }, { feature: "5GB Storage" }]
            },
            {
                name: "Business",
                price: "$45",
                priceSuffix: "/mo",
                highlightLabel: "Best Choice",
                buttonText: "Get Access",
                features: [{ feature: "5 Users" }, { feature: "50GB Storage" }, { feature: "Priority Email" }]
            },
            {
                name: "Ultimate",
                price: "$99",
                priceSuffix: "/mo",
                buttonText: "Go Ultimate",
                features: [{ feature: "Unlimited Users" }, { feature: "1TB Storage" }, { feature: "24/7 Phone Support" }]
            }
        ],
    },
    render: ({ title, description, items, columnsDesktop, columnsTablet, columnsMobile, titleFont = 'inherit', bodyFont = 'inherit', mainColor }) => {
        const id = useId();
        const primaryColor = mainColor || '#8b5cf6'; // Default Purple

        const PricingCard = ({ item, i }: any) => {
            const ButtonComponent = item.buttonUrl ? 'a' : 'button';
            const buttonProps = item.buttonUrl ? { href: item.buttonUrl } : {};

            return (
                <div
                    key={i}
                    style={{
                        background: `linear-gradient(145deg, ${primaryColor} 0%, ${primaryColor}CC 100%)`, // Gradient bg
                        borderRadius: '24px',
                        padding: '40px 30px',
                        color: 'white',
                        textAlign: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        fontFamily: bodyFont !== 'inherit' ? `"${bodyFont}", sans-serif` : 'inherit',
                        position: 'relative',
                        overflow: 'hidden',
                        height: '100%',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = `0 20px 40px ${primaryColor}66`; // Colored shadow
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    }}
                >
                    {/* Decorative Circle */}
                    <div style={{
                        position: 'absolute',
                        top: '-50px',
                        right: '-50px',
                        width: '150px',
                        height: '150px',
                        backgroundColor: 'white',
                        opacity: 0.1,
                        borderRadius: '50%',
                        pointerEvents: 'none',
                    }} />

                    {item.highlightLabel && (
                        <div style={{
                            backgroundColor: 'white',
                            color: primaryColor,
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            display: 'inline-block',
                            marginBottom: '20px',
                            alignSelf: 'center'
                        }}>
                            {item.highlightLabel}
                        </div>
                    )}

                    <h3 style={{
                        fontSize: '1.75rem',
                        marginBottom: '10px',
                        fontWeight: '700',
                    }}>
                        {item.name}
                    </h3>

                    <div style={{ marginBottom: '30px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                        }}>
                            {item.pricePrefix && <span style={{ opacity: 0.8, fontSize: '0.9rem' }}>{item.pricePrefix}</span>}
                            <span style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1 }}>{item.price}</span>
                        </div>
                        {item.priceSuffix && <div style={{ opacity: 0.8, fontSize: '1rem', marginTop: '4px' }}>{item.priceSuffix}</div>}
                    </div>

                    <div style={{ flex: 1, marginBottom: '40px' }}>
                        <ul style={{ padding: 0, margin: 0, listStyle: 'none', textAlign: 'left' }}>
                            {item.features?.map((f: any, j: number) => (
                                <li key={j} style={{
                                    padding: '8px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    fontSize: '1rem',
                                    opacity: 0.95
                                }}>
                                    <div style={{
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        ✓
                                    </div>
                                    {f.feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <ButtonComponent
                        {...buttonProps}
                        style={{
                            width: '100%',
                            padding: '18px',
                            backgroundColor: 'white',
                            color: primaryColor,
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: '800',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            display: 'flex', // Standardized box model
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                            textDecoration: 'none',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.2)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                        }}
                    >
                        {item.buttonText || "Get Started"}
                    </ButtonComponent>
                </div>
            );
        };

        return (
            <section className={id} style={{ padding: '80px 20px', backgroundColor: '#fff' }}>
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
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: '800',
                        color: '#111827',
                        marginBottom: '1rem',
                        fontFamily: titleFont !== 'inherit' ? `"${titleFont}", sans-serif` : 'inherit'
                    }}>
                        {title}
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#6b7280',
                        maxWidth: '700px',
                        margin: '0 auto 60px',
                        lineHeight: 1.6,
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
