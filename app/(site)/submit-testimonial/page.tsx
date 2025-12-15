"use client";

import React, { useState } from "react";
import { Star, Send, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SubmitTestimonialPage() {
    const [formData, setFormData] = useState({
        author: "",
        role: "",
        quote: "",
        rating: 5
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                const data = await res.json();
                setError(data.error || "Gagal mengirim testimoni");
            }
        } catch (err) {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Terima Kasih!</h1>
                    <p className="text-gray-600 mb-8">
                        Testimoni Anda telah kami terima dan akan ditampilkan setelah melalui proses moderasi.
                    </p>
                    <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
            <div className="max-w-xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8">
                    <ArrowLeft size={18} className="mr-2" /> Kembali
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Kirim Testimoni</h1>
                    <p className="text-gray-600">Bagikan pengalaman Anda bekerja sama dengan kami.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                            <input
                                required
                                type="text"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                placeholder="Contoh: Budi Santoso"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Peran / Jabatan (Opsional)</label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                placeholder="Contoh: CEO di Tech Company"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className={`transition ${formData.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                                    >
                                        <Star size={32} fill={formData.rating >= star ? "currentColor" : "currentColor"} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Testimoni Anda <span className="text-red-500">*</span></label>
                            <textarea
                                required
                                value={formData.quote}
                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-40 resize-none transition"
                                placeholder="Ceritakan pengalaman Anda..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Mengirim..." : (
                                <>
                                    <Send size={20} /> Kirim Testimoni
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
