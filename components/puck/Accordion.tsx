import type { ComponentConfig } from "@measured/puck";
import { ColorPickerField } from "./fields/ColorPickerField";
import React, { useId } from "react";

export type AccordionProps = {
    title: string;
    titleFont?: string;
    bodyFont?: string;
    items: { question: string; answer: string }[];
    backgroundColor?: string;
    titleColor?: string;
    itemBgColor?: string;
    textColor?: string;
    activeColor?: string;
};

export const Accordion: ComponentConfig<AccordionProps> = {
    label: "FAQ Accordion",
    fields: {
        title: { type: "text", label: "📝 Title" },
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
        items: {
            type: "array",
            arrayFields: {
                question: { type: "text", label: "Question" },
                answer: { type: "textarea", label: "Answer" },
            },
            getItemSummary: (item) => item.question || "Question",
        },
        backgroundColor: {
            type: "custom",
            label: "Section Background",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        titleColor: {
            type: "custom",
            label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        itemBgColor: {
            type: "custom",
            label: "Item Background",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        textColor: {
            type: "custom",
            label: "Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        activeColor: {
            type: "custom",
            label: "Active Icon Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
    },
    defaultProps: {
        title: "Pertanyaan Umum",
        items: [
            { question: "Bagaimana cara mengirim naskah?", answer: "Kirim via email atau form website kami. Pastikan naskah sudah rapi dan lengkap." },
            { question: "Berapa lama proses penerbitan?", answer: "Standar 3-4 minggu untuk paket reguler, namun bisa lebih cepat dengan paket ekspres." },
            { question: "Apakah ada biaya tersembunyi?", answer: "Tidak ada. Semua biaya transparan dan tertera di paket harga." },
        ],
        backgroundColor: "#ffffff",
        titleColor: "#1e293b",
        itemBgColor: "#f8fafc",
        activeColor: "#2563eb",
        textColor: "#475569",
    },
    render: ({ title, items, titleFont = 'inherit', bodyFont = 'inherit', backgroundColor, titleColor, itemBgColor, textColor, activeColor }) => {
        const id = "accordion-" + useId().replace(/:/g, "");
        const finalActiveColor = activeColor || "#2563eb";

        return (
            <section className={id} style={{ padding: 'clamp(50px, 8vw, 80px) 20px', backgroundColor: backgroundColor || '#ffffff' }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .${id} details > summary {
                        list-style: none;
                    }
                    .${id} details > summary::-webkit-details-marker {
                        display: none;
                    }
                    .${id} details[open] summary ~ * {
                        animation: slideDown 0.2s ease-in-out;
                    }
                    .${id} details[open] .icon {
                        transform: rotate(180deg);
                        color: ${finalActiveColor};
                    }
                    @keyframes slideDown {
                        0% { opacity: 0; transform: translateY(-10px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                `}} />

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{
                        textAlign: 'center',
                        fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                        marginBottom: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: '800',
                        color: titleColor || '#1e293b',
                        fontFamily: titleFont !== 'inherit' ? `"${titleFont}", sans-serif` : 'inherit',
                        lineHeight: 1.2,
                    }}>
                        {title}
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {items.map((item, i) => (
                            <details
                                key={i}
                                style={{
                                    backgroundColor: itemBgColor || '#f8fafc',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    fontFamily: bodyFont !== 'inherit' ? `"${bodyFont}", sans-serif` : 'inherit',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                                    transition: 'background-color 0.2s, box-shadow 0.2s',
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.05)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.02)';
                                }}
                            >
                                <summary style={{
                                    padding: 'clamp(16px, 3vw, 20px) clamp(20px, 4vw, 24px)',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                                    color: titleColor || '#1e293b',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '16px',
                                    userSelect: 'none',
                                    WebkitTapHighlightColor: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                }}>
                                    <span style={{ lineHeight: 1.4 }}>{item.question}</span>
                                    <svg
                                        className="icon"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s',
                                            flexShrink: 0,
                                            color: '#94a3b8'
                                        }}
                                    >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </summary>
                                <div style={{
                                    padding: '0 clamp(20px, 4vw, 24px) clamp(20px, 4vw, 24px)',
                                    color: textColor || '#475569',
                                    lineHeight: '1.7',
                                    fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                                }}>
                                    {item.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        );
    },
};
