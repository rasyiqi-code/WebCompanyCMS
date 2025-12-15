import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "../../fields/SliderField";
import { ResponsiveSliderField } from "../../fields/ResponsiveSliderField";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type HeroRealEstateProps = {
    title: string;
    description: string;
    searchPlaceholder?: string;
    searchButtonText?: string;
    avatarCount?: string;
    imageUrl?: string;
    stat1Value?: string;
    stat1Label?: string;
    stat2Value?: string;
    stat2Label?: string;
    stat3Value?: string;
    stat3Label?: string;

    // Styling
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;

    // Colors
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
    primaryColor: string; // Search Btn, Stats Value
    btnTextColor: string;
    secondaryColor: string; // Avatar Bg, etc.
    avatarRingColor: string;

    // Shapes
    searchRadius: number;
    imageRadius: number;
    btnRadius: number;

    // Spacing
    paddingTop: { desktop?: number; tablet?: number; mobile?: number };
    paddingBottom: { desktop?: number; tablet?: number; mobile?: number };
    gap: { desktop?: number; tablet?: number; mobile?: number };
};

export const HeroRealEstate: ComponentConfig<HeroRealEstateProps> = {
    label: "Hero - Real Estate",
    fields: {
        title: { type: "text", label: "📝 Main Title" },
        description: { type: "textarea", label: "📄 Description" },
        searchPlaceholder: { type: "text", label: "🔍 Search Placeholder" },
        searchButtonText: { type: "text", label: "🔘 Search Button" },
        avatarCount: { type: "text", label: "👥 Satisfied Buyers Count" },
        imageUrl: { type: "text", label: "🏠 House Image URL" },
        stat1Value: { type: "text", label: "📊 Stat 1 Value" },
        stat1Label: { type: "text", label: "📊 Stat 1 Label" },
        stat2Value: { type: "text", label: "📊 Stat 2 Value" },
        stat2Label: { type: "text", label: "📊 Stat 2 Label" },
        stat3Value: { type: "text", label: "📊 Stat 3 Value" },
        stat3Label: { type: "text", label: "📊 Stat 3 Label" },

        // Typography
        titleSize: {
            type: "custom", label: "Title Size",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={6} step={0.1} defaultValue={3.5} />
        },
        titleWeight: {
            type: "select", label: "Title Weight",
            options: [
                { label: "Normal", value: "400" },
                { label: "Semibold", value: "600" },
                { label: "Bold", value: "700" },
                { label: "ExtraBold", value: "800" },
            ]
        },

        // Colors
        backgroundColor: {
            type: "custom", label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        titleColor: {
            type: "custom", label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        descriptionColor: {
            type: "custom", label: "Description Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        primaryColor: {
            type: "custom", label: "Primary/Search Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        btnTextColor: {
            type: "custom", label: "Button Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        secondaryColor: {
            type: "custom", label: "Secondary/Avatar Bg",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        avatarRingColor: {
            type: "custom", label: "Avatar Ring Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Shapes
        searchRadius: {
            type: "custom", label: "Search Box Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={50} defaultValue={12} />
        },
        btnRadius: {
            type: "custom", label: "Btn Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={50} defaultValue={8} />
        },
        imageRadius: {
            type: "custom", label: "Image Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={50} defaultValue={24} />
        },

        // Spacing
        gap: {
            type: "custom", label: "Grid Gap",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={100} defaultValue={60} />
        },
        paddingTop: {
            type: "custom", label: "Padding Top",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={80} />
        },
        paddingBottom: {
            type: "custom", label: "Padding Bottom",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={80} />
        },
    },
    defaultProps: {
        title: "Start Your Journey To Home",
        description: "Guiding you through the process of finding your home, we understand that this journey is more than just a transaction.",
        searchPlaceholder: "Location",
        searchButtonText: "Search",
        avatarCount: "1,618 Satisfied Buyers",
        stat1Value: "15k+",
        stat1Label: "Happy Customer",
        stat2Value: "1200+", stat2Label: "Listed Properties",
        stat3Value: "2000+",
        stat3Label: "Expert Agents",

        titleSize: { desktop: 3.5 },
        titleWeight: "800",

        backgroundColor: "#ffffff",
        titleColor: "#1a2332",
        descriptionColor: "#64748b",
        primaryColor: "#3b5bdb",
        btnTextColor: "#ffffff",
        secondaryColor: "#e0e7ff",
        avatarRingColor: "#ffffff",

        searchRadius: 12,
        btnRadius: 8,
        imageRadius: 24,

        gap: { desktop: 60 },
        paddingTop: { desktop: 80 },
        paddingBottom: { desktop: 80 },
    },
    render: ({
        title, description, searchPlaceholder, searchButtonText, avatarCount, imageUrl,
        stat1Value, stat1Label, stat2Value, stat2Label, stat3Value, stat3Label,
        titleSize, titleWeight,
        backgroundColor, titleColor, descriptionColor, primaryColor, btnTextColor, secondaryColor, avatarRingColor,
        searchRadius, btnRadius, imageRadius,
        gap, paddingTop, paddingBottom
    }) => {
        const id = "real-estate-" + useId().replace(/:/g, "");

        // Smart scaling helper
        const getVal = (obj: { desktop?: number; tablet?: number; mobile?: number } | undefined, key: 'desktop' | 'tablet' | 'mobile') => {
            if (key === 'mobile' && obj && !obj.mobile && obj.desktop) {
                return obj.desktop * 0.6;
            }
            if (key === 'tablet' && obj && !obj.tablet && obj.desktop) {
                return obj.desktop * 0.8;
            }
            return obj?.[key] ?? obj?.desktop ?? 0;
        };

        return (
            <section className={id}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                .${id} {
                    background-color: ${backgroundColor};
                    padding-top: ${getVal(paddingTop, 'desktop')}px;
                    padding-bottom: ${getVal(paddingBottom, 'desktop')}px;
                    padding-left: 20px;
                    padding-right: 20px;
                    overflow-x: hidden;
                }
                .${id} .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: ${getVal(gap, 'desktop')}px;
                    align-items: center;
                }
                .${id} h1 {
                    font-size: ${getVal(titleSize, 'desktop')}rem;
                    font-weight: ${titleWeight};
                    color: ${titleColor};
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                }
                .${id} .description {
                    font-size: 1.05rem;
                    color: ${descriptionColor};
                    line-height: 1.7;
                    margin-bottom: 2.5rem;
                }
                .${id} .search-box {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 2rem;
                    padding: 8px;
                    background-color: white; /* Keep white usually for simple input, or make configurable if requested? Keeping white ensures contrast with possible colored bg */
                    border-radius: ${searchRadius}px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                }
                .${id} .input-wrapper {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    background-color: #f8fafc;
                    border-radius: ${searchRadius > 4 ? searchRadius - 4 : 4}px;
                }
                .${id} .search-input {
                    flex: 1;
                    border: none;
                    background-color: transparent;
                    font-size: 1rem;
                    outline: none;
                    color: ${titleColor};
                }
                .${id} .btn-search {
                    background-color: ${primaryColor};
                    color: ${btnTextColor};
                    padding: 12px 32px;
                    border-radius: ${btnRadius}px;
                    border: none;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                    box-sizing: border-box;
                    transition: opacity 0.3s;
                }
                .${id} .avatar-group {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .${id} .avatars {
                    display: flex;
                }
                .${id} .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: ${secondaryColor};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 3px solid ${avatarRingColor};
                    font-size: 1.2rem;
                    margin-left: -12px;
                }
                .${id} .avatar:first-child {
                    margin-left: 0;
                }
                .${id} .image-container {
                    aspect-ratio: 4/3;
                    background-color: ${secondaryColor};
                    border-radius: ${imageRadius}px;
                    overflow: hidden;
                    margin-bottom: 24px;
                }
                .${id} .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                }
                .${id} .stat-value {
                    font-size: 2rem;
                    font-weight: 800;
                    color: ${primaryColor};
                    margin-bottom: 4px;
                }
                .${id} .stat-label {
                    font-size: 0.85rem;
                    color: ${descriptionColor};
                }

                @media (max-width: 1024px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'tablet')}px;
                        padding-bottom: ${getVal(paddingBottom, 'tablet')}px;
                    }
                    .${id} h1 {
                        font-size: ${getVal(titleSize, 'tablet')}rem;
                    }
                     .${id} .container {
                        gap: ${getVal(gap, 'tablet')}px;
                    }
                }

                @media (max-width: 768px) {
                    .${id} {
                        padding-top: ${getVal(paddingTop, 'mobile')}px;
                        padding-bottom: ${getVal(paddingBottom, 'mobile')}px;
                        padding-left: 24px;
                        padding-right: 24px;
                    }
                    .${id} .container {
                        grid-template-columns: 1fr;
                        gap: ${getVal(gap, 'mobile') || 40}px;
                    }
                    .${id} .container > div:nth-child(2) {
                        order: -1;
                    }
                    .${id} h1 {
                        font-size: clamp(2rem, ${getVal(titleSize, 'mobile')}rem, 3rem);
                        text-align: center;
                        line-height: 1.2;
                        word-break: break-word;
                    }
                    .${id} .description {
                        text-align: center;
                    }
                    .${id} .search-box {
                        flex-direction: column;
                        padding: 16px;
                    }
                    .${id} .btn-search {
                        width: 100%;
                    }
                    .${id} .avatar-group {
                        justify-content: center;
                    }
                    .${id} .image-container {
                        margin-bottom: 24px;
                    }
                    .${id} .stats-grid {
                        gap: 12px;
                        text-align: center;
                    }
                    .${id} .stat-value {
                        font-size: 1.75rem;
                    }
                }
            `}} />
                <div className="container">
                    <div>
                        <h1>{title}</h1>
                        <p className="description">{description}</p>

                        <div className="search-box">
                            <div className="input-wrapper">
                                <span style={{ fontSize: '1.2rem' }}>📍</span>
                                <input type="text" placeholder={searchPlaceholder} className="search-input" />
                            </div>
                            <button className="btn-search">
                                {searchButtonText}
                            </button>
                        </div>

                        {avatarCount && (
                            <div className="avatar-group">
                                <div className="avatars">
                                    {['👤', '👤', '👤', '👤'].map((avatar, i) => (
                                        <div key={i} className="avatar">
                                            {avatar}
                                        </div>
                                    ))}
                                </div>
                                <span style={{ fontSize: '0.95rem', color: descriptionColor, fontWeight: '600' }}>{avatarCount}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="image-container">
                            {imageUrl ? (
                                <img src={imageUrl} alt="House" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '6rem' }}>🏘️</div>
                            )}
                        </div>

                        <div className="stats-grid">
                            {[
                                { value: stat1Value, label: stat1Label },
                                { value: stat2Value, label: stat2Label },
                                { value: stat3Value, label: stat3Label },
                            ].map((stat, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div className="stat-value">{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    },
};
