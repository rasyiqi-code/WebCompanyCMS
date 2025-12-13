import type { ComponentConfig } from "@measured/puck";
import { SliderField } from "../../fields/SliderField";
import { ResponsiveSliderField } from "../../fields/ResponsiveSliderField";
import { ColorPickerField } from "../../fields/ColorPickerField";
import React, { useId } from "react";

export type HeroPublisherTwoProps = {
    title: string;
    description: string;
    imageUrl?: string;

    // Styling
    titleSize: { desktop?: number; tablet?: number; mobile?: number };
    titleWeight: string;
    titleFont?: string;
    descFont?: string;

    // Colors
    backgroundColor: string;
    textColor: string;
    descriptionColor: string;
    waveColor: string;

    // Spacing
    paddingTop: { desktop?: number; tablet?: number; mobile?: number };
    paddingBottom: { desktop?: number; tablet?: number; mobile?: number };
    gap: { desktop?: number; tablet?: number; mobile?: number };
    imageRadius: number;
};

export const HeroPublisherTwo: ComponentConfig<HeroPublisherTwoProps> = {
    label: "Hero - Book Publisher 2",
    fields: {
        title: { type: "text", label: "📝 Main Title" },
        description: { type: "textarea", label: "📄 Description" },
        imageUrl: { type: "text", label: "🖼️ Image URL" },

        // Typography
        titleSize: {
            type: "custom", label: "Title Size",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="rem" max={6} step={0.1} defaultValue={3.5} />
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
        descFont: {
            type: "select",
            label: "Desc Font",
            options: [
                { label: "Inherit", value: "inherit" },
                { label: "Inter", value: "Inter" },
                { label: "Lato", value: "Lato" },
                { label: "Montserrat", value: "Montserrat" },
                { label: "Playfair Display", value: "Playfair Display" },
                { label: "Roboto", value: "Roboto" },
            ]
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
        textColor: {
            type: "custom", label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        descriptionColor: {
            type: "custom", label: "Description Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        waveColor: {
            type: "custom", label: "Wave Divider Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },

        // Shapes
        imageRadius: {
            type: "custom", label: "Image Radius",
            render: ({ value, onChange }) => <SliderField value={value} onChange={onChange} unit="px" max={100} defaultValue={0} />
        },

        // Spacing
        gap: {
            type: "custom", label: "Grid Gap",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={100} defaultValue={40} />
        },
        paddingTop: {
            type: "custom", label: "Padding Top",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={80} />
        },
        paddingBottom: {
            type: "custom", label: "Padding Bottom",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} unit="px" max={200} defaultValue={120} />
        },
    },
    defaultProps: {
        title: "Bukumu Segera Terbit!",
        description: "Penerbit KBM telah menerbitkan lebih dari 3000 judul buku. Yuk, tingkatkan personal brandingmu dan torehkan sejarah anda dengan buku, sebab buku adalah kartu terbaik anda.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",

        titleSize: { desktop: 3.5 },
        titleWeight: "800",

        backgroundColor: "#dc2626", // Red base
        textColor: "#ffffff",
        descriptionColor: "#f3f4f6",
        waveColor: "#ffffff",

        imageRadius: 0,

        gap: { desktop: 60 },
        paddingTop: { desktop: 100 },
        paddingBottom: { desktop: 120 },
    },
    render: ({
        title, description, imageUrl,
        titleSize, titleWeight,
        backgroundColor, textColor, descriptionColor, waveColor,
        imageRadius,
        gap, paddingTop, paddingBottom,
        titleFont = 'inherit', descFont = 'inherit'
    }) => {
        const id = useId();

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
                    padding-bottom: ${getVal(paddingBottom, 'desktop')}px; /* Extra bottom padding for wave overlap if needed, or just visual space */
                    padding-left: 20px;
                    padding-right: 20px;
                    overflow-x: hidden;
                    position: relative;
                }
                .${id} .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: ${getVal(gap, 'desktop')}px;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                }
                .${id} h1 {
                    font-size: ${getVal(titleSize, 'desktop')}rem;
                    font-weight: ${titleWeight};
                    color: ${textColor};
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                    font-family: ${titleFont !== 'inherit' ? `"${titleFont}", sans-serif` : 'inherit'};
                }
                .${id} .description {
                    font-size: 1.1rem;
                    color: ${descriptionColor};
                    line-height: 1.6;
                    max-width: 500px;
                    font-family: ${descFont !== 'inherit' ? `"${descFont}", sans-serif` : 'inherit'};
                }
                .${id} .image-container {
                     border-radius: ${imageRadius}px;
                     overflow: hidden;
                     display: flex;
                     justify-content: flex-end;
                }
                .${id} img {
                    width: 100%;
                    height: auto;
                    max-width: 100%;
                }
                .${id} .wave-divider {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    overflow: hidden;
                    line-height: 0;
                    transform: rotate(180deg);
                    z-index: 1;
                }
                .${id} .wave-divider svg {
                    position: relative;
                    display: block;
                    width: calc(100% + 1.3px);
                    height: 80px;
                    transform: rotateY(180deg);
                }
                .${id} .wave-divider .shape-fill {
                    fill: ${waveColor};
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
                        text-align: center;
                    }
                    .${id} h1 {
                        font-size: clamp(2rem, ${getVal(titleSize, 'mobile')}rem, 3rem);
                        line-height: 1.2;
                        word-break: break-word;
                    }
                    .${id} .description {
                        margin: 0 auto;
                        text-align: center;
                    }
                    .${id} .image-container {
                        justify-content: center;
                    }
                     /* Image top or bottom? User image shows text Left, Image Right. 
                        Usually mobile puts Image First or Text First.
                        If "Promo", Text First is often better. Let's keep Text First (default grid order)
                        But I will add order shift if needed. Let's stick to default (Text top) as it's 'Bukumu Segera Terbit!' which is a hook.
                     */
                     .${id} .wave-divider svg {
                        height: 50px;
                     }
                }
            `}} />
                <div className="container">
                    <div>
                        <h1>{title}</h1>
                        <p className="description">{description}</p>
                    </div>

                    <div className="image-container">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Publisher" />
                        ) : (
                            <div style={{ height: '300px', width: '100%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>📚</div>
                        )}
                    </div>
                </div>

                <div className="wave-divider">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </section>
        )
    },
};
