"use client";

import React, { useState, useEffect } from "react";
import { SiteSettings } from "../../../../lib/settings";
import { Loader2, Save } from "lucide-react";

export default function FooterSettingsPage() {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!settings) return;
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
    if (!settings) return <div className="p-10">Error loading settings</div>;

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            {message && <div className={`px-4 py-2 rounded text-sm font-medium ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{message}</div>}

            {/* Footer Content */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Footer Content</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">About Text (Footer)</label>
                        <textarea name="footerAboutText" value={settings.footerAboutText || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" rows={2} />
                        <p className="text-xs text-gray-500 mt-1">Displayed in the footer to give a brief company overview.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address / Location</label>
                        <textarea name="footerAddress" value={settings.footerAddress || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" rows={2} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
                        <input name="footerCopyright" value={settings.footerCopyright || ""} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
                    </div>
                </div>
            </div>


            {/* Footer Colors */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Footer Colors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                name="footerBackgroundColor"
                                value={settings.footerBackgroundColor || "#CE1111"}
                                onChange={handleChange}
                                className="h-10 w-20 border rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                name="footerBackgroundColor"
                                value={settings.footerBackgroundColor || "#CE1111"}
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
                                name="footerTextColor"
                                value={settings.footerTextColor || "#ffffff"}
                                onChange={handleChange}
                                className="h-10 w-20 border rounded cursor-pointer"
                            />
                            <input
                                type="text"
                                name="footerTextColor"
                                value={settings.footerTextColor || "#ffffff"}
                                onChange={handleChange}
                                className="flex-1 px-3 py-2 border rounded-md uppercase"
                                maxLength={7}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
                    Save Footer Settings
                </button>
            </div>
        </form >
    );
}
