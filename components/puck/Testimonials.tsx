import React, { useId } from "react";
import type { ComponentConfig } from "@measured/puck";
import { ColorPickerField } from "./fields/ColorPickerField";
import { ResponsiveSliderField, type ResponsiveValue } from "./fields/ResponsiveSliderField";

export type TestimonialsProps = {
    title: string;
    description?: string;
    titleFont?: string;
    quoteFont?: string;
    scrollMode: "grid" | "horizontal";
    columns?: number;
    items?: { quote: string; author: string; role: string }[];
    limit?: number;
    backgroundColor?: string;
    padding?: ResponsiveValue;
    cardBackgroundColor?: string;
    cardBorderColor?: string;
    titleColor?: string;
    descriptionColor?: string;
    quoteColor?: string;
    authorColor?: string;
    roleColor?: string;
};

export const Testimonials: ComponentConfig<TestimonialsProps> = {
    label: "Testimonials",
    fields: {
        title: { type: "text", label: "Title" },
        description: { type: "textarea", label: "Description" },
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
        quoteFont: {
            type: "select",
            label: "Quote Font",
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
            label: "Layout Mode",
            options: [
                { label: "Responsive Grid", value: "grid" },
                { label: "Horizontal Scroll", value: "horizontal" },
            ],
        },
        columns: { type: "number", label: "Desktop Columns", placeholder: "3" },
        limit: { type: "number", label: "Max Items", placeholder: "6" },
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
        titleColor: {
            type: "custom",
            label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        descriptionColor: {
            type: "custom",
            label: "Description Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        quoteColor: {
            type: "custom",
            label: "Quote Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        authorColor: {
            type: "custom",
            label: "Author Name Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        roleColor: {
            type: "custom",
            label: "Role Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
    },
    defaultProps: {
        title: "Apa Kata Mereka",
        description: "Testimoni dari klien kami yang puas.",
        scrollMode: "grid" as const,
        columns: 3,
        limit: 6,
        items: [],
        backgroundColor: "#ffffff",
        padding: { desktop: 80, tablet: 60, mobile: 40 },
        cardBackgroundColor: "white",
        cardBorderColor: "#f1f5f9",
        titleColor: "#1e293b",
        descriptionColor: "#64748b",
        quoteColor: "#475569",
        authorColor: "#1e293b",
        roleColor: "#94a3b8",
    },
    render: ({
        title,
        description,
        scrollMode,
        columns,
        items = [],
        titleFont = 'inherit',
        quoteFont = 'inherit',
        limit = 6,
        backgroundColor = '#ffffff',
        padding = { desktop: 80, tablet: 60, mobile: 40 },
        cardBackgroundColor = "white",
        cardBorderColor = "#f1f5f9",
        titleColor = "#1e293b",
        descriptionColor = "#64748b",
        quoteColor = "#475569",
        authorColor = "#1e293b",
        roleColor = "#94a3b8",
    }) => {
        const isHorizontal = scrollMode === "horizontal";
        const [apiItems, setApiItems] = React.useState<any[]>([]);
        const [mounted, setMounted] = React.useState(false);
        const id = useId().replace(/:/g, '');
        const uniqueClass = `testimonials-${id}`;

        const getPadding = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.desktop ?? fallback;
        };
        const getTabletPadding = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.tablet ?? val?.desktop ?? fallback;
        };
        const getMobilePadding = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.mobile ?? val?.tablet ?? val?.desktop ?? fallback;
        };

        React.useEffect(() => {
            setMounted(true);
            const fetchTestimonials = async () => {
                try {
                    const res = await fetch("/api/testimonials");
                    const data = await res.json();
                    if (data.success) {
                        setApiItems(data.testimonials);
                    }
                } catch (e) {
                    console.error("Failed to fetch testimonials", e);
                }
            };
            fetchTestimonials();
        }, []);

        // Prefer API items, fallback to manual items if no API items
        const finalItems = (apiItems.length > 0 ? apiItems : items).slice(0, limit);

        const TestimonialCard = ({ item, i }: any) => (
            <div
                key={i}
                style={{
                    backgroundColor: cardBackgroundColor,
                    borderRadius: '16px',
                    padding: 'clamp(28px, 5vw, 40px)',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    border: `2px solid ${cardBorderColor}`,
                    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                    cursor: 'default',
                    position: 'relative',
                    fontFamily: quoteFont !== 'inherit' ? `"${quoteFont}", sans-serif` : 'inherit',
                    ...(isHorizontal && {
                        flexShrink: 0,
                        width: 'clamp(280px, 40vw, 380px)',
                        scrollSnapAlign: 'start',
                    }),
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.15)';
                    e.currentTarget.style.borderColor = '#fecaca';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = cardBorderColor;
                }}
            >
                <div style={{
                    fontSize: '3rem',
                    color: '#dc2626',
                    lineHeight: 0.5,
                    marginBottom: '20px',
                    opacity: 0.3,
                }}>
                    "
                </div>
                <p style={{
                    fontStyle: 'italic',
                    marginBottom: '24px',
                    color: quoteColor,
                    lineHeight: '1.7',
                    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                }}>
                    {item.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        flexShrink: 0,
                    }}>
                        {item.author?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                        <div style={{ fontWeight: '700', color: authorColor, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>{item.author}</div>
                        <div style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)', color: roleColor }}>{item.role || 'Member'}</div>
                    </div>
                </div>
            </div>
        );

        if (!mounted) return <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>Loading Testimonials...</div>;

        return (
            <section className={uniqueClass} style={{ backgroundColor: backgroundColor }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .${uniqueClass} {
                            padding: ${getPadding(padding, 80)}px 20px;
                        }
                        @media (max-width: 1024px) {
                            .${uniqueClass} {
                                padding: ${getTabletPadding(padding, 60)}px 20px;
                            }
                        }
                        @media (max-width: 640px) {
                            .${uniqueClass} {
                                padding: ${getMobilePadding(padding, 40)}px 20px;
                            }
                        }
                    `
                }} />

                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                        marginBottom: '1rem',
                        fontWeight: '800',
                        color: titleColor,
                        fontFamily: titleFont !== 'inherit' ? `"${titleFont}", sans-serif` : 'inherit'
                    }}>
                        {title}
                    </h2>
                    {description && (
                        <p style={{
                            textAlign: 'center',
                            color: descriptionColor,
                            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
                            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                        }}>
                            {description}
                        </p>
                    )}

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
                                {finalItems.map((item, i) => <TestimonialCard key={i} item={item} i={i} />)}
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`,
                            gap: 'clamp(20px, 4vw, 30px)',
                        }}>
                            {finalItems.map((item, i) => <TestimonialCard key={i} item={item} i={i} />)}
                        </div>
                    )}
                </div>
            </section>
        );
    },
};

