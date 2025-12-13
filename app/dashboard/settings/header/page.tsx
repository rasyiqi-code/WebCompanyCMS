"use client";

import React, { useState, useEffect } from "react";
import { SiteSettings } from "../../../../lib/settings";
import { Loader2, Save } from "lucide-react";

export default function HeaderSettingsPage() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                setSettings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (!res.ok) throw new Error("Failed to save");

            setMessage("Settings saved successfully!");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage("Error saving settings.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!settings) return;
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
    if (!settings) return <div className="p-10">Error loading settings</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            {message && <div className={`px-4 py-2 rounded text-sm font-medium ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{message}</div>}

            {/* Header Style */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Header Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Header Style</label>
                        <select
                            name="headerStyle"
                            value={settings.headerStyle || "simple"}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="simple">Simple (Logo Left, Menu Right)</option>
                            <option value="centered">Centered (Logo Center, Menu Split)</option>
                            <option value="minimal">Minimal (Logo Left, Menu Hidden/Hamburger)</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Choose the layout structure for your navigation bar.</p>
                    </div>
                </div>
            </div>

            {/* Header Colors */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Header Colors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                name="headerBackgroundColor"
                                value={settings.headerBackgroundColor || "#ffffff"}
                                onChange={handleChange}
                                className="h-10 w-20 border rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                name="headerBackgroundColor"
                                value={settings.headerBackgroundColor || "#ffffff"}
                                onChange={handleChange}
                                className="flex-1 px-3 py-2 border rounded-md uppercase"
                                maxLength={7}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                name="headerTextColor"
                                value={settings.headerTextColor || "#111827"}
                                onChange={handleChange}
                                className="h-10 w-20 border rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                name="headerTextColor"
                                value={settings.headerTextColor || "#111827"}
                                onChange={handleChange}
                                className="flex-1 px-3 py-2 border rounded-md uppercase"
                                maxLength={7}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Menu Background</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                name="headerMobileBackgroundColor"
                                value={settings.headerMobileBackgroundColor || "#f9fafb"}
                                onChange={handleChange}
                                className="h-10 w-20 border rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                name="headerMobileBackgroundColor"
                                value={settings.headerMobileBackgroundColor || "#f9fafb"}
                                onChange={handleChange}
                                className="flex-1 px-3 py-2 border rounded-md uppercase"
                                maxLength={7}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features & Integrations */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Features & Integrations</h2>
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="showCart"
                            name="showCart"
                            checked={settings.showCart !== false}
                            onChange={(e) => setSettings({ ...settings, showCart: e.target.checked })}
                            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div>
                            <label htmlFor="showCart" className="font-medium text-gray-700">Show Shopping Cart</label>
                            <p className="text-sm text-gray-500">Enable or disable the shopping bag icon in the header.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="showFloatingChat"
                            name="showFloatingChat"
                            checked={settings.showFloatingChat || false}
                            onChange={(e) => setSettings({ ...settings, showFloatingChat: e.target.checked })}
                            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <div>
                            <label htmlFor="showFloatingChat" className="font-medium text-gray-700">Floating WhatsApp Chat</label>
                            <p className="text-sm text-gray-500">Show a sticky WhatsApp button in the bottom right corner.</p>
                        </div>
                    </div>

                    {settings.showFloatingChat && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                            <input
                                type="text"
                                name="whatsappNumber"
                                value={settings.whatsappNumber || ""}
                                onChange={handleChange}
                                placeholder="628123456789 (Include country code, no +)"
                                className="w-full max-w-md px-3 py-2 border rounded-md"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
                    Save Header Settings
                </button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-sm text-blue-900 mt-6">
                <div>
                    <strong>Note:</strong> Menu items for the header are managed in the <a href="/dashboard/menus" className="underline font-semibold hover:text-blue-700">Menus Dashboard</a>.
                </div>
            </div>
        </form >
    );
}
