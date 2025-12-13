import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "../../fields/SliderField";
import { ResponsiveSliderField } from "../../fields/ResponsiveSliderField";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type HeroWeddingProps = {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    secondaryButtonText?: string;
    happyClientsText?: string;
    imageUrl1?: string;
    imageUrl2?: string;

    // Stats
    stat1Value?: string;
    stat1Label?: string;
    stat2Value?: string;
    stat2Label?: string;
    stat3Value?: string;
    stat3Label?: string;

    // Typography
    titleFont: string;
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;
    titleColor: string;

    subtitleSize: { desktop?: number; tablet?: number; mobile?: number };
    subtitleColor: string;

    // Styling
    backgroundColor: string;
    accentColor: string; // Buttons, icons
    secondaryColor: string; // Secondary button border/text
    btnPaddingVertical: string;
    btnPaddingHorizontal: string;

    // Layout
    paddingTop: { desktop?: number; tablet?: number; mobile?: number };
    paddingBottom: { desktop?: number; tablet?: number; mobile?: number };
    imageOverlap: { desktop?: number; tablet?: number; mobile?: number };
};

export const HeroWedding: ComponentConfig<HeroWeddingProps> = {
    label: "Hero - Wedding/Events",
    fields: {
        // Content
        title: { type: "text", label: "📝 Title" },
        subtitle: { type: "textarea", label: "📄 Subtitle" },
        ctaText: { type: "text", label: "🔘 Primary Button" },
        ctaLink: { type: "text", label: "🔗 Primary Link" },
        secondaryButtonText: { type: "text", label: "🔘 Secondary Button" },
        happyClientsText: { type: "text", label: "👥 Clients Text" },
        imageUrl1: { type: "text", label: "🖼️ Photo 1 (Front)" },
        imageUrl2: { type: "text", label: "🖼️ Photo 2 (Back/Top)" },

        // Stats Content
        stat1Value: { type: "text", label: "Stat 1 Value" },
        stat1Label: { type: "text", label: "Stat 1 Label" },
        stat2Value: { type: "text", label: "Stat 2 Value" },
        stat2Label: { type: "text", label: "Stat 2 Label" },
        stat3Value: { type: "text", label: "Stat 3 Value" },
        stat3Label: { type: "text", label: "Stat 3 Label" },

        // Typography
        titleFont: {
            type: "select", label: "Title Font",
            options: [
                { label: "Playfair Display", value: "Playfair Display" },
                { label: "Cinzel", value: "Cinzel" },
                { label: "Montserrat", value: "Montserrat" },
                { label: "Lora", value: "Lora" },
                { label: "Merriweather", value: "Merriweather" },
            ]
        },
        titleSize: {
            type: "custom", label: "Title Size (rem)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={6} step={0.1} defaultValue={3.5} />
        },
        titleWeight: {
            type: "select", label: "Title Weight",
            options: [
                { label: "Regular", value: "400" },
                { label: "Medium", value: "500" },
                { label: "SemiBold", value: "600" },
                { label: "Bold", value: "700" },
            ]
        },
        titleColor: {
            type: "custom", label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        subtitleSize: {
            type: "custom", label: "Subtitle Size (rem)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={2} step={0.1} defaultValue={1} />
        },
        subtitleColor: {
            type: "custom", label: "Subtitle Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Styling
        backgroundColor: {
            type: "custom", label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        accentColor: {
            type: "custom", label: "Accent Color (Btn)",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        secondaryColor: {
            type: "custom", label: "Secondary Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnPaddingVertical: {
            type: "custom", label: "Button Padding (Vertical)",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={40} defaultValue="14px" />
        },
        btnPaddingHorizontal: {
            type: "custom", label: "Button Padding (Horizontal)",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={80} defaultValue="32px" />
        },

        // Layout
        paddingTop: {
            type: "custom", label: "Padding Top",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={80} />
        },
        paddingBottom: {
            type: "custom", label: "Padding Bottom",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={60} />
        },
        imageOverlap: {
            type: "custom", label: "Image Overlap",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={100} defaultValue={40} />
        },
    },
    defaultProps: {
        title: "Creating Forever New Beginning",
        subtitle: "We Believe That Crafting The Perfect Wedding Goes Beyond Mere Coordination - It's About Curating An Experience That Echoes Your Unique Love Story.",
        ctaText: "Book Now",
        ctaLink: "#booking",
        secondaryButtonText: "Contact Us",
        happyClientsText: "2,718 Happy Clients",

        imageUrl1: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
        imageUrl2: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&w=600&q=80",

        stat1Value: "500+", stat1Label: "Event Organized",
        stat2Value: "24/7", stat2Label: "We're Available",
        stat3Value: "100+", stat3Label: "Team Members",

        titleFont: "Playfair Display",
        titleSize: { desktop: 3.5 },
        titleWeight: "700",
        titleColor: "#6b4423",

        subtitleSize: { desktop: 1 },
        subtitleColor: "#64748b",

        backgroundColor: "#fff9f5", // Soft cream
        accentColor: "#d4a574", // Gold/Bronze
        secondaryColor: "#6b4423", // Dark Brown
        btnPaddingVertical: "14px",
        btnPaddingHorizontal: "32px",

        paddingTop: { desktop: 80 },
        paddingBottom: { desktop: 60 },
        imageOverlap: { desktop: 40 },
    },
    render: ({
        title, subtitle, ctaText, ctaLink, secondaryButtonText, happyClientsText,
        imageUrl1, imageUrl2,
        stat1Value, stat1Label, stat2Value, stat2Label, stat3Value, stat3Label,
        titleFont, titleSize, titleWeight, titleColor,
        subtitleSize, subtitleColor,
        backgroundColor, accentColor, secondaryColor, btnPaddingVertical, btnPaddingHorizontal,
        paddingTop, paddingBottom, imageOverlap
    }) => {
        const id = useId();
        const getVal = (obj: { desktop?: number; tablet?: number; mobile?: number } | undefined, key: 'desktop' | 'tablet' | 'mobile') => {
            return obj?.[key] ?? obj?.desktop ?? 0;
        };

        return (
            <section className={id} style={{ backgroundColor }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                .${id} {
                    padding-top: ${getVal(paddingTop, 'desktop')}px;
                    padding-bottom: ${getVal(paddingBottom, 'desktop')}px;
                    padding-left: 24px;
                    padding-right: 24px;
                }
                .${id} .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .${id} .header-row {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 60px;
                    margin-bottom: 60px;
                    align-items: flex-start;
                }
                .${id} h1 {
                    font-size: ${getVal(titleSize, 'desktop')}rem;
                    line-height: 1.1;
                    margin: 0;
                }
                .${id} .subtitle {
                    font-size: ${getVal(subtitleSize, 'desktop')}rem;
                    line-height: 1.6;
                    margin: 0;
                    margin-top: 10px;
                }
                .${id} .content-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    align-items: center;
                }
                .${id} .left-column {
                    display: flex;
                    flex-direction: column;
                    gap: 48px;
                }
                .${id} .button-group {
                    display: flex;
                    gap: 16px;
                }
                .${id} .clients-section {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .${id} .client-avatars {
                    display: flex;
                }
                .${id} .client-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #ddd;
                    border: 2px solid white;
                    margin-left: -12px;
                }
                .${id} .client-avatar:first-child {
                    margin-left: 0;
                }
                .${id} .stats-grid {
                    display: flex;
                    gap: 40px;
                    padding-top: 20px;
                }
                .${id} .overlap-img-1 { transform: translate(0, ${getVal(imageOverlap, 'desktop')}px); }
                .${id} .overlap-img-2 { transform: translate(20%, -${getVal(imageOverlap, 'desktop')}px); }

                @media (max-width: 1024px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'tablet')}px;
                        padding-bottom: ${getVal(paddingBottom, 'tablet')}px;
                    }
                    .${id} h1 { font-size: ${getVal(titleSize, 'tablet')}rem; }
                    .${id} .subtitle { font-size: ${getVal(subtitleSize, 'tablet')}rem; }
                    .${id} .overlap-img-1 { transform: translate(0, ${getVal(imageOverlap, 'tablet')}px); }
                    .${id} .overlap-img-2 { transform: translate(20%, -${getVal(imageOverlap, 'tablet')}px); }
                }

                @media (max-width: 768px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'mobile')}px;
                        padding-bottom: ${getVal(paddingBottom, 'mobile')}px;
                        padding-left: 24px;
                        padding-right: 24px;
                    }
                    .${id} .header-row {
                        grid-template-columns: 1fr;
                        gap: 20px;
                        margin-bottom: 40px;
                    }
                    .${id} .content-row {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }
                    .${id} .content-row > div:nth-child(2) {
                        order: -1; 
                    }
                    .${id} h1 { 
                        font-size: ${getVal(titleSize, 'mobile')}rem;
                        line-height: 1.2;
                    }
                    .${id} .subtitle { 
                        font-size: ${getVal(subtitleSize, 'mobile')}rem;
                    }
                    .${id} .button-group {
                        flex-direction: column;
                        width: 100%;
                    }
                    .${id} .button-group > * {
                        width: 100%;
                        text-align: center;
                    }
                    .${id} .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 12px;
                        text-align: center;
                    }
                    .${id} .overlap-img-1 { 
                        transform: translate(0, 0);
                        margin: 0 auto;
                        position: relative;
                        width: 85%;
                    }
                    .${id} .overlap-img-2 { 
                        transform: translate(0, -30px);
                        margin: 0 auto;
                        width: 85%;
                    }
                    .${id} .image-container { 
                        display: flex;
                        flex-direction: column-reverse;
                    }
                }
                `}} />

                <div className="container">
                    <div className="header-row">
                        <h1 style={{ fontFamily: titleFont, fontWeight: titleWeight, color: titleColor }}>
                            {title}
                        </h1>
                        <p className="subtitle" style={{ fontFamily: 'Montserrat', color: subtitleColor }}>
                            {subtitle}
                        </p>
                    </div>

                    <div className="content-row">
                        <div className="left-column">
                            <div className="button-group">
                                <a href={ctaLink} style={{
                                    display: 'inline-block', backgroundColor: accentColor, color: 'white', padding: `${btnPaddingVertical} ${btnPaddingHorizontal}`, borderRadius: '4px', textDecoration: 'none', fontWeight: '600', fontSize: '1rem', letterSpacing: '0.05em', transition: 'opacity 0.2s', border: 'none', cursor: 'pointer', boxSizing: 'border-box'
                                }}>
                                    {ctaText}
                                </a>
                                {secondaryButtonText && (
                                    <button style={{
                                        backgroundColor: 'transparent', color: secondaryColor, padding: `${btnPaddingVertical} ${btnPaddingHorizontal}`, borderRadius: '4px', border: `1px solid ${secondaryColor}`, cursor: 'pointer', fontWeight: '600', fontSize: '1rem', letterSpacing: '0.05em', boxSizing: 'border-box'
                                    }}>
                                        {secondaryButtonText}
                                    </button>
                                )}
                            </div>

                            <div className="clients-section">
                                <div className="client-avatars">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="client-avatar">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt={`Client ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                        </div>
                                    ))}
                                    <div className="client-avatar" style={{ backgroundColor: accentColor, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>2k+</div>
                                </div>
                                <span style={{ fontSize: '0.9rem', color: subtitleColor, fontWeight: '500' }}>{happyClientsText}</span>
                            </div>

                            <div className="stats-grid">
                                {[
                                    { value: stat1Value, label: stat1Label },
                                    { value: stat2Value, label: stat2Label },
                                    { value: stat3Value, label: stat3Label },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div style={{ fontFamily: titleFont, fontSize: '2rem', fontWeight: '700', color: secondaryColor, marginBottom: '4px' }}>{stat.value}</div>
                                        <div style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', color: subtitleColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="image-container" style={{ position: 'relative', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="overlap-img-2" style={{
                                position: 'relative', width: '65%', aspectRatio: '3/4', borderRadius: '100px 100px 0 0', overflow: 'hidden', zIndex: 1, border: `4px solid white`, boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                            }}>
                                {imageUrl2 ? <img src={imageUrl2} alt="Wedding 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', backgroundColor: '#eee' }} />}
                            </div>

                            <div className="overlap-img-1" style={{
                                position: 'absolute', left: 0, bottom: 0, width: '60%', aspectRatio: '1', borderRadius: '4px', overflow: 'hidden', zIndex: 2, border: `8px solid white`, boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                            }}>
                                {imageUrl1 ? <img src={imageUrl1} alt="Wedding 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', backgroundColor: '#e2e8f0' }} />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    },
};
