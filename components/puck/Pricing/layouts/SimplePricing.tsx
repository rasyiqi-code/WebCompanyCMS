import type { ComponentConfig } from "@measured/puck";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type PricingSimpleProps = {
    title: string;
    mainColor?: string;
    titleFont?: string;
    bodyFont?: string;
    scrollMode: "grid" | "horizontal";
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    items: {
        name: string;
        subtitle?: string;
        price: string;
        pricePrefix?: string;
        priceSuffix?: string;
        highlightLabel?: string;
        buttonText?: string;
        buttonUrl?: string;
        buttonDesc?: string;
        features: { feature: string }[]
    }[];
};

export const PricingSimple: ComponentConfig<PricingSimpleProps> = {
    label: "Pricing Simple",
    fields: {
        title: { type: "text", label: "📝 Title" },
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
        scrollMode: {
            type: "select",
            label: "📱 Layout Mode",
            options: [
                { label: "Responsive Grid", value: "grid" },
                { label: "Horizontal Scroll", value: "horizontal" },
            ],
        },
        columnsDesktop: { type: "number", label: "🖥️ Columns (Desktop)", placeholder: "3" },
        columnsTablet: { type: "number", label: "📱 Columns (Tablet)", placeholder: "2" },
        columnsMobile: { type: "number", label: "📱 Columns (Mobile)", placeholder: "1" },
        items: {
            type: "array",
            arrayFields: {
                highlightLabel: { type: "text", label: "🌟 Highlight Label (e.g. Best Value)" },
                name: { type: "text", label: "Package Name" },
                subtitle: { type: "text", label: "Package Subtitle" },
                pricePrefix: { type: "text", label: "Price Prefix (e.g. Starts form)" },
                price: { type: "text", label: "Price" },
                priceSuffix: { type: "text", label: "Price Suffix (e.g. /month)" },
                buttonText: { type: "text", label: "Button Text" },
                buttonUrl: { type: "text", label: "Button URL (link)" },
                buttonDesc: { type: "text", label: "Description below button" },
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
        title: "Paket Penerbitan",
        scrollMode: "grid" as const,
        columnsDesktop: 3,
        columnsTablet: 2,
        columnsMobile: 1,
        items: [
            {
                name: "Paket Majapahit",
                subtitle: "Untuk Pemula",
                price: "Rp 3.000.000",
                priceSuffix: "/naskah",
                buttonText: "Pilih Majapahit",
                buttonUrl: "#",
                features: [{ feature: "ISBN + Barcode" }]
            },
            {
                highlightLabel: "Terpopuler",
                name: "Paket Nusantara",
                subtitle: "Paling Lengkap",
                price: "Rp 5.000.000",
                priceSuffix: "All in One",
                buttonText: "Pilih Nusantara",
                buttonUrl: "#",
                buttonDesc: "* Slot terbatas bulan ini",
                features: [{ feature: "Semua di Majapahit" }]
            },
        ],
    },
    render: ({ title, scrollMode, columnsDesktop, columnsTablet, columnsMobile, items, titleFont = 'inherit', bodyFont = 'inherit', mainColor }) => {
        const id = "simple-pricing-" + useId().replace(/:/g, "");
        const isHorizontal = scrollMode === "horizontal";
        const primaryColor = mainColor || '#dc2626'; // Default red

        const PricingCard = ({ item, i }: any) => {
            const ButtonComponent = item.buttonUrl ? 'a' : 'button';
            const buttonProps = item.buttonUrl ? { href: item.buttonUrl } : {};

            return (
                <div
                    key={i}
                    className="pricing-card"
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: 'clamp(28px, 5vw, 40px) clamp(20px, 4vw, 30px)',
                        textAlign: 'center',
                        boxShadow: item.highlightLabel ? `0 20px 40px ${primaryColor}40` : '0 4px 6px rgba(0,0,0,0.05)',
                        border: item.highlightLabel ? `2px solid ${primaryColor}` : '2px solid #f1f5f9',
                        fontFamily: bodyFont !== 'inherit' ? `"${bodyFont}", sans-serif` : 'inherit',
                        transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                        cursor: 'default',
                        position: 'relative',
                        overflow: 'visible', // Changed to visible for Badge
                        marginTop: item.highlightLabel ? '0' : '20px', // Offset for alignment
                        ...(isHorizontal && {
                            flexShrink: 0,
                            width: 'clamp(260px, 35vw, 350px)',
                            scrollSnapAlign: 'start',
                        }),
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        if (!item.highlightLabel) {
                            e.currentTarget.style.boxShadow = `0 20px 40px ${primaryColor}33`; // 20% opacity
                            e.currentTarget.style.borderColor = primaryColor;
                        }
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        if (!item.highlightLabel) {
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                            e.currentTarget.style.borderColor = '#f1f5f9';
                        }
                    }}
                >
                    {/* Highlight Label Badge */}
                    {item.highlightLabel && (
                        <div style={{
                            position: 'absolute',
                            top: '-16px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: primaryColor,
                            color: 'white',
                            padding: '6px 16px',
                            borderRadius: '999px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            whiteSpace: 'nowrap',
                            boxShadow: `0 4px 6px ${primaryColor}4D`
                        }}>
                            {item.highlightLabel}
                        </div>
                    )}

                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100px',
                        height: '100px',
                        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}99 100%)`,
                        opacity: 0.05,
                        borderRadius: '0 0 0 100%',
                        pointerEvents: 'none'
                    }} />

                    <h3 style={{
                        fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
                        marginBottom: '0.5rem',
                        color: primaryColor,
                        fontWeight: '700',
                    }}>
                        {item.name}
                    </h3>

                    {item.subtitle && (
                        <div style={{
                            color: '#64748b',
                            fontSize: '0.95rem',
                            marginBottom: '1.5rem',
                            fontWeight: '500'
                        }}>
                            {item.subtitle}
                        </div>
                    )}

                    <div style={{ marginBottom: '2rem' }}>
                        {item.pricePrefix && (
                            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '4px' }}>
                                {item.pricePrefix}
                            </div>
                        )}
                        <div style={{
                            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                            fontWeight: '800',
                            background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}CC 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            lineHeight: 1
                        }}>
                            {item.price}
                        </div>
                        {item.priceSuffix && (
                            <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '4px', fontWeight: '500' }}>
                                {item.priceSuffix}
                            </div>
                        )}
                    </div>

                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        textAlign: 'left',
                        marginBottom: '2rem',
                    }}>
                        {(item.features || []).map((f: any, j: number) => (
                            <li
                                key={j}
                                style={{
                                    padding: '12px 0',
                                    borderBottom: j < item.features.length - 1 ? '1px solid #f1f5f9' : 'none',
                                    color: '#475569',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                                }}
                            >
                                <span style={{ color: primaryColor, fontSize: '1.2rem', flexShrink: 0 }}>✓</span>
                                <span>{f.feature}</span>
                            </li>
                        ))}
                    </ul>

                    <div>
                        <ButtonComponent
                            {...buttonProps}
                            style={{
                                display: 'flex', // Changed from inline-flex to flex for consistent width
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxSizing: 'border-box', // Ensure padding doesn't overflow width
                                width: '100%',
                                padding: '14px',
                                minHeight: '48px',
                                backgroundColor: item.highlightLabel ? primaryColor : '#ffffff',
                                color: item.highlightLabel ? 'white' : primaryColor,
                                border: `2px solid ${primaryColor}`,
                                borderRadius: '9999px',
                                fontWeight: '700',
                                fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textDecoration: 'none',
                                boxShadow: item.highlightLabel ? `0 4px 6px ${primaryColor}33` : 'none'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = primaryColor;
                                e.currentTarget.style.borderColor = primaryColor;
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = item.highlightLabel ? primaryColor : '#ffffff';
                                e.currentTarget.style.borderColor = primaryColor;
                                e.currentTarget.style.color = item.highlightLabel ? 'white' : primaryColor;
                            }}
                        >
                            {item.buttonText || "Pilih Paket"}
                        </ButtonComponent>
                        {item.buttonDesc && (
                            <div style={{
                                marginTop: '12px',
                                fontSize: '0.8rem',
                                color: '#64748b',
                                fontStyle: 'italic'
                            }}>
                                {item.buttonDesc}
                            </div>
                        )}
                    </div>
                </div>
            );
        };

        return (
            <section className={id} style={{ padding: 'clamp(50px, 8vw, 80px) 20px', backgroundColor: '#f8fafc' }} >
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .${id} .grid-container {
                        display: grid;
                        grid-template-columns: repeat(${columnsDesktop || 3}, 1fr);
                        gap: clamp(20px, 4vw, 30px);
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

                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                        marginBottom: '1rem',
                        fontWeight: '800',
                        color: '#1e293b',
                        fontFamily: titleFont !== 'inherit' ? `"${titleFont}", sans-serif` : 'inherit'
                    }}>
                        {title}
                    </h2>
                    <p style={{
                        textAlign: 'center',
                        color: '#64748b',
                        marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
                        fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                    }}>
                        Pilih paket yang sesuai dengan kebutuhan Anda
                    </p>

                    {isHorizontal ? (
                        <div style={{
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'thin',
                            paddingBottom: '20px',
                            marginLeft: '-20px',
                            marginRight: '-20px',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: 'clamp(20px, 4vw, 30px)',
                                minWidth: 'min-content',
                            }}>
                                {items.map((item, i) => <PricingCard key={i} item={item} i={i} />)}
                            </div>
                        </div>
                    ) : (
                        <div className="grid-container">
                            {items.map((item, i) => <PricingCard key={i} item={item} i={i} />)}
                        </div>
                    )}
                </div>
            </section >
        );
    },
};
