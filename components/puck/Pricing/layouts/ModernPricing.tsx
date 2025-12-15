import type { ComponentConfig } from "@measured/puck";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type PricingModernProps = {
    title: string;
    description: string;
    mainColor?: string;
    titleFont?: string;
    bodyFont?: string;
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    items: {
        theme: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'red';
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

export const PricingModern: ComponentConfig<PricingModernProps> = {
    label: "Pricing Modern",
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
                theme: {
                    type: "select",
                    label: "Card Theme",
                    options: [
                        { label: "Blue", value: "blue" },
                        { label: "Purple", value: "purple" },
                        { label: "Green", value: "green" },
                        { label: "Orange", value: "orange" },
                        { label: "Pink", value: "pink" },
                        { label: "Red", value: "red" },
                    ]
                },
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
        title: "Choose Your Plan",
        description: "Select the perfect plan for your needs.",
        columnsDesktop: 3,
        columnsTablet: 2,
        columnsMobile: 1,
        items: [
            {
                theme: "green",
                name: "Basic",
                price: "$19",
                priceSuffix: "/mo",
                buttonText: "Get Started",
                features: [{ feature: "5 Projects" }, { feature: "Basic Analytics" }]
            },
            {
                theme: "orange",
                name: "Pro",
                price: "$49",
                priceSuffix: "/mo",
                highlightLabel: "Best Value",
                buttonText: "Go Pro",
                features: [{ feature: "Unlimited Projects" }, { feature: "Advanced Analytics" }, { feature: "Priority Support" }]
            },
            {
                theme: "purple",
                name: "Enterprise",
                price: "$99",
                pricePrefix: "From",
                priceSuffix: "/mo",
                buttonText: "Contact Sales",
                features: [{ feature: "Custom Solutions" }, { feature: "Dedicated Manager" }]
            }
        ],
    },
    render: ({ title, description, items, columnsDesktop, columnsTablet, columnsMobile, titleFont = 'inherit', bodyFont = 'inherit', mainColor }) => {
        const id = "modern-pricing-" + useId().replace(/:/g, "");

        const themeColors: Record<string, { bg: string, text: string, accent: string }> = {
            blue: { bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', text: '#ffffff', accent: '#2563eb' },
            purple: { bg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', text: '#ffffff', accent: '#7c3aed' },
            green: { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', text: '#ffffff', accent: '#059669' },
            orange: { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', text: '#ffffff', accent: '#d97706' },
            pink: { bg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', text: '#ffffff', accent: '#db2777' },
            red: { bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', text: '#ffffff', accent: '#dc2626' },
        };

        const PricingCard = ({ item, i }: any) => {
            // Use mainColor if available, otherwise fallback to item theme
            const theme = mainColor ? {
                bg: `linear-gradient(135deg, ${mainColor} 0%, ${mainColor}DD 100%)`,
                text: '#ffffff',
                accent: mainColor
            } : (themeColors[item.theme] || themeColors.blue);

            const ButtonComponent = item.buttonUrl ? 'a' : 'button';
            const buttonProps = item.buttonUrl ? { href: item.buttonUrl } : {};

            return (
                <div
                    key={i}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        fontFamily: bodyFont !== 'inherit' ? `"${bodyFont}", sans-serif` : 'inherit',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
                    }}
                >
                    {/* Header Section */}
                    <div style={{
                        background: theme.bg,
                        padding: '30px 20px 50px',
                        color: 'white',
                        textAlign: 'center',
                        position: 'relative',
                        clipPath: 'ellipse(150% 100% at 50% 0%)' // Creates a curved bottom
                    }}>
                        {item.highlightLabel && (
                            <span style={{
                                display: 'inline-block',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(4px)',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                marginBottom: '10px',
                                letterSpacing: '0.05em'
                            }}>
                                {item.highlightLabel}
                            </span>
                        )}
                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>{item.name}</h3>
                    </div>

                    {/* Price Circle (Floating Over Curve) */}
                    <div style={{
                        width: '120px',
                        height: '120px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        margin: '-60px auto 20px', // Pull up to overlap
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        border: `4px solid white`,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                        zIndex: 10
                    }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            border: `2px solid ${theme.accent}`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: theme.accent
                        }}>
                            {item.pricePrefix && <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{item.pricePrefix}</span>}
                            <span style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: 1 }}>{item.price}</span>
                            {item.priceSuffix && <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{item.priceSuffix}</span>}
                        </div>
                    </div>

                    {/* Features List */}
                    <div style={{ flex: 1, padding: '0 30px 30px' }}>
                        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                            {item.features?.map((f: any, j: number) => (
                                <li key={j} style={{
                                    padding: '10px 0',
                                    borderBottom: '1px solid #f3f4f6',
                                    fontSize: '0.95rem',
                                    color: '#4b5563',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <span style={{ color: theme.accent, fontSize: '1.2rem' }}>•</span>
                                    {f.feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer / Button */}
                    <div style={{ padding: '0 30px 40px' }}>
                        <ButtonComponent
                            {...buttonProps}
                            style={{
                                width: '100%',
                                padding: '16px',
                                background: theme.bg,
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                display: 'inline-flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textDecoration: 'none',
                                transition: 'opacity 0.2s',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
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
