import type { ComponentConfig } from "@credbuild/core";
import { ColorPickerField } from "../../fields/ColorPickerField";
import { ResponsiveSliderField, ResponsiveValue } from "../../fields/ResponsiveSliderField";
import React, { useId } from "react";
import Image from "next/image";

export type PricingImageProps = {
    title: string;
    sectionBg?: string;
    titleColor?: string;
    titleFont?: string;
    scrollMode: "grid" | "horizontal";
    columnsDesktop?: number;
    columnsTablet?: number;
    columnsMobile?: number;
    gap?: ResponsiveValue;
    items: {
        imageUrl: string;
        altText?: string;
        link?: string;
    }[];

    // Card & Image settings
    cardRadius?: number;
    cardAspectRatio?: string;
    cardObjectFit?: "cover" | "contain";
    cardShadow?: "none" | "sm" | "md" | "lg";
    hoverLift?: number;
};

const ImageCard = ({
    item,
    isHorizontal,
    cardRadius = 16,
    cardAspectRatio = "2/3",
    cardObjectFit = "cover",
    cardShadow = "none",
    hoverLift = 6
}: {
    item: any;
    isHorizontal: boolean;
    cardRadius?: number;
    cardAspectRatio?: string;
    cardObjectFit?: "cover" | "contain";
    cardShadow?: "none" | "sm" | "md" | "lg";
    hoverLift?: number;
}) => {
    const Wrapper = item.link ? 'a' : 'div';
    const wrapperProps = item.link ? { href: item.link } : {};

    const shadows = {
        none: 'none',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    };

    return (
        <Wrapper
            {...wrapperProps as any}
            className="pricing-image-card"
            style={{
                display: 'block',
                borderRadius: `${cardRadius}px`,
                overflow: 'hidden',
                cursor: item.link ? 'pointer' : 'default',
                transition: 'transform 0.3s, box-shadow 0.3s',
                textDecoration: 'none',
                position: 'relative',
                boxShadow: shadows[cardShadow],
                ...(isHorizontal && {
                    flexShrink: 0,
                    width: 'clamp(260px, 35vw, 350px)',
                    scrollSnapAlign: 'start',
                }),
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = `translateY(-${hoverLift}px)`;
                if (cardShadow === 'none') {
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                }
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = shadows[cardShadow];
            }}
        >
            <div style={{ 
                position: 'relative', 
                width: '100%', 
                aspectRatio: cardAspectRatio === 'auto' ? 'unset' : cardAspectRatio,
            }}>
                <Image
                    src={item.imageUrl}
                    alt={item.altText || "Pricing Package"}
                    fill={cardAspectRatio !== 'auto'}
                    width={cardAspectRatio === 'auto' ? 800 : undefined}
                    height={cardAspectRatio === 'auto' ? 800 : undefined}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={cardObjectFit === 'cover' ? 'object-cover' : 'object-contain'}
                    style={cardAspectRatio === 'auto' ? { width: '100%', height: 'auto', display: 'block' } : {}}
                    unoptimized
                />
            </div>
        </Wrapper>
    );
};

const PricingImageRender = (props: PricingImageProps) => {
    const { title, scrollMode, columnsDesktop, columnsTablet, columnsMobile, items, titleFont = 'inherit', sectionBg, gap, titleColor } = props;
    const id = "image-pricing-" + useId().replace(/:/g, "");
    const isHorizontal = scrollMode === "horizontal";

    const commonCardProps = {
        isHorizontal,
        cardRadius: props.cardRadius,
        cardAspectRatio: props.cardAspectRatio,
        cardObjectFit: props.cardObjectFit,
        cardShadow: props.cardShadow,
        hoverLift: props.hoverLift
    };

    return (
        <section className={id} style={{ padding: 'clamp(50px, 8vw, 80px) 20px', backgroundColor: sectionBg || '#f8fafc' }} >
            <style dangerouslySetInnerHTML={{
                __html: `
                .${id} {
                    --gap-desktop: ${gap?.desktop || 28}px;
                    --gap-tablet: ${gap?.tablet || 24}px;
                    --gap-mobile: ${gap?.mobile || 16}px;
                    --gap: var(--gap-desktop);
                }
                .${id} .grid-container {
                    display: grid;
                    grid-template-columns: repeat(${columnsDesktop || 3}, 1fr);
                    gap: var(--gap);
                }
                @media (max-width: 1024px) {
                    .${id} { --gap: var(--gap-tablet); }
                    .${id} .grid-container {
                        grid-template-columns: repeat(${columnsTablet || 2}, 1fr);
                    }
                }
                @media (max-width: 768px) {
                    .${id} { --gap: var(--gap-mobile); }
                    .${id} .grid-container {
                        grid-template-columns: repeat(${columnsMobile || 1}, 1fr);
                    }
                }
            `}} />

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                    marginBottom: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: '800',
                    color: titleColor || '#1e293b',
                    fontFamily: titleFont !== 'inherit' ? `"${titleFont}", sans-serif` : 'inherit'
                }}>
                    {title}
                </h2>

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
                            gap: 'var(--gap)',
                            minWidth: 'min-content',
                            padding: '10px 0'
                        }}>
                            {items.map((item, i) => <ImageCard key={i} item={item} {...commonCardProps} />)}
                        </div>
                    </div>
                ) : (
                    <div className="grid-container">
                        {items.map((item, i) => <ImageCard key={i} item={item} {...commonCardProps} />)}
                    </div>
                )}
            </div>
        </section >
    );
};

export const PricingImage: ComponentConfig<PricingImageProps> = {
    label: "Pricing (Images)",
    fields: {
        title: { type: "text", label: "📝 Title" },
        sectionBg: {
            type: "custom",
            label: "Background Section",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        titleColor: {
            type: "custom",
            label: "Title Color",
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
        gap: {
            type: "custom",
            label: "Gap (Spacing)",
            render: (props) => <ResponsiveSliderField {...props} unit="px" max={100} min={0} step={4} defaultValue={{ desktop: 30, tablet: 20, mobile: 16 }} />
        },
        items: {
            type: "array",
            arrayFields: {
                imageUrl: { type: "text", label: "Image URL" },
                altText: { type: "text", label: "Alt Text" },
                link: { type: "text", label: "Link URL (Optional)" },
            },
            getItemSummary: (item) => item.altText || "Image Package",
        },

        // Card settings
        cardRadius: {
            type: "custom",
            label: "Card Border Radius",
            render: ({ value, onChange }) => (
                <div style={{ padding: "0 8px" }}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={value as number || 16}
                        onChange={(e) => onChange(parseInt(e.target.value))}
                        style={{ width: "100%" }}
                    />
                    <div style={{ fontSize: "12px", textAlign: "right" }}>{value || 16}px</div>
                </div>
            )
        },
        cardAspectRatio: {
            type: "select",
            label: "Card Aspect Ratio",
            options: [
                { label: "1:1 Square", value: "1/1" },
                { label: "4:3 Classic", value: "4/3" },
                { label: "2:3 Portrait", value: "2/3" },
                { label: "16:9 Landscape", value: "16/9" },
                { label: "Auto", value: "auto" },
            ]
        },
        cardObjectFit: {
            type: "select",
            label: "Image Object Fit",
            options: [
                { label: "Cover (Fill)", value: "cover" },
                { label: "Contain (Show all)", value: "contain" },
            ]
        },
        cardShadow: {
            type: "select",
            label: "Card Shadow",
            options: [
                { label: "None", value: "none" },
                { label: "Small", value: "sm" },
                { label: "Medium", value: "md" },
                { label: "Large", value: "lg" },
            ]
        },
        hoverLift: {
            type: "custom",
            label: "Hover Lift Distance",
            render: ({ value, onChange }) => (
                <div style={{ padding: "0 8px" }}>
                    <input
                        type="range"
                        min="0"
                        max="40"
                        value={value as number || 6}
                        onChange={(e) => onChange(parseInt(e.target.value))}
                        style={{ width: "100%" }}
                    />
                    <div style={{ fontSize: "12px", textAlign: "right" }}>{value || 6}px</div>
                </div>
            )
        },
    },
    defaultProps: {
        title: "Paket Spesial",
        scrollMode: "grid" as const,
        columnsDesktop: 3,
        columnsTablet: 2,
        columnsMobile: 1,
        gap: { desktop: 28, tablet: 24, mobile: 16 },
        cardRadius: 16,
        cardAspectRatio: "2/3",
        cardObjectFit: "cover",
        cardShadow: "none",
        hoverLift: 6,
        items: [
            {
                imageUrl: "https://via.placeholder.com/400x600?text=Package+1",
                altText: "Package 1",
                link: "#"
            },
            {
                imageUrl: "https://via.placeholder.com/400x600?text=Package+2",
                altText: "Package 2",
                link: "#"
            },
            {
                imageUrl: "https://via.placeholder.com/400x600?text=Package+3",
                altText: "Package 3",
                link: "#"
            },
        ],
    },
    render: (props) => <PricingImageRender {...props} />,
};
