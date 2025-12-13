
import type { ComponentConfig } from "@measured/puck";
import React from "react";

export type ContactFormProps = {
    title: string;
    description: string;
    submitText: string;
    emailTo?: string;
};

export const ContactForm: ComponentConfig<ContactFormProps> = {
    label: "Contact Form",
    fields: {
        title: { type: "text", label: "Heading" },
        description: { type: "textarea", label: "Description" },
        submitText: { type: "text", label: "Button Text" },
        emailTo: { type: "text", label: "Send To Email (Optional)" },
    },
    defaultProps: {
        title: "Hubungi Kami",
        description: "Adalah kehormatan bagi kami untuk melayani Anda. Silakan hubungi kami untuk informasi lebih lanjut.",
        submitText: "Kirim Pesan",
        emailTo: "info@example.com",
    },
    render: ({ title, description, submitText }) => {
        const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setStatus("loading");
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (!res.ok) throw new Error("Failed");
                setStatus("success");
                (e.target as HTMLFormElement).reset();
            } catch (err) {
                setStatus("error");
            }
        };

        return (
            <section className="py-16 px-4 bg-white font-sans">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
                    </div>

                    {status === "success" ? (
                        <div className="max-w-2xl mx-auto bg-green-50 p-8 rounded-xl text-center text-green-800 border border-green-200">
                            <h3 className="text-xl font-bold mb-2">Pesan Terkirim!</h3>
                            <p>Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda.</p>
                            <button onClick={() => setStatus("idle")} className="mt-4 text-sm underline hover:text-green-900">Kirim pesan lain</button>
                        </div>
                    ) : (
                        <form className="max-w-2xl mx-auto space-y-6 bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm" onSubmit={onSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                                    <input required name="name" type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="Masukkan nama anda" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input required name="email" type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="email@contoh.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
                                <input name="subject" type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="Perihal pesanan..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                                <textarea required name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" placeholder="Tulis pesan anda disini..."></textarea>
                            </div>
                            <div className="pt-2">
                                <button disabled={status === "loading"} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition-transform active:scale-95 shadow-lg shadow-blue-500/30">
                                    {status === "loading" ? "Mengirim..." : submitText}
                                </button>
                                {status === "error" && <p className="text-red-500 text-center mt-2 text-sm">Gagal mengirim pesan. Silakan coba lagi.</p>}
                            </div>
                        </form>
                    )}
                </div>
            </section>
        )
    }
}
