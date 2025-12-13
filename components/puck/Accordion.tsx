import type { ComponentConfig } from "@measured/puck";
import { ColorPickerField } from "./fields/ColorPickerField";

export type AccordionProps = {
    title: string;
    titleFont?: string;
    bodyFont?: string;
    items: { question: string; answer: string }[];
    backgroundColor?: string;
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
            label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
    },
    defaultProps: {
        title: "Pertanyaan Umum",
        items: [
            { question: "Bagaimana cara mengirim naskah?", answer: "Kirim via email atau form website" },
            { question: "Berapa lama proses penerbitan?", answer: "Standar 3-4 minggu" },
        ],
        backgroundColor: "#ffffff",
    },
    render: ({ title, items, titleFont = 'inherit', bodyFont = 'inherit', backgroundColor = "#ffffff" }) => (
        <section style={{ padding: 'clamp(50px, 8vw, 80px) 20px', backgroundColor: backgroundColor }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                    marginBottom: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: '800',
                    color: '#1e293b',
                    fontFamily: titleFont !== 'inherit' ? `"${titleFont}", sans-serif` : 'inherit'
                }}>
                    {title}
                </h2>
                {items.map((item, i) => (
                    <details
                        key={i}
                        style={{
                            marginBottom: '16px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '12px',
                            border: '2px solid #e2e8f0',
                            overflow: 'hidden',
                            transition: 'border-color 0.2s',
                            fontFamily: bodyFont !== 'inherit' ? `"${bodyFont}", sans-serif` : 'inherit'
                        }}
                    >
                        <summary style={{
                            padding: 'clamp(18px, 4vw, 24px) clamp(20px, 5vw, 28px)',
                            minHeight: '48px',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                            color: '#1e293b',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            userSelect: 'none',
                            listStyle: 'none',
                            WebkitTapHighlightColor: 'transparent',
                        }}>
                            <span style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>▶</span>
                            {item.question}
                        </summary>
                        <div style={{
                            padding: '0 clamp(20px, 5vw, 28px) clamp(20px, 5vw, 28px)',
                            color: '#64748b',
                            lineHeight: '1.7',
                            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                        }}>
                            {item.answer}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    ),
};
