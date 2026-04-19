"use client";

import React, { useState, useEffect } from "react";
import { SiteSettings } from "../../../../lib/settings";
import { Loader2, Save } from "lucide-react";
import { 
    PageHeader,
    Skeleton,
    FormSection,
    FormInput,
    FormTextArea
} from "@/components/dashboard/ui/DataTable";

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

    if (loading) return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8">
            <PageHeader title="Footer Architecture" subtitle="Coordinate the narrative and administrative anchors of your site's foundation." />
            <div className="space-y-6">
                <Skeleton className="h-[250px] w-full" />
                <Skeleton className="h-[200px] w-full" />
            </div>
        </div>
    );
    if (!settings) return <div className="p-10">Error loading settings</div>;

    return (
        <form onSubmit={handleSubmit} className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8">
            <PageHeader 
                title="Footer Architecture" 
                subtitle="Design and structure the narrative and administrative anchors of your website's foundation." 
            />

            {/* Footer Content */}
            <FormSection 
                title="Foundational Content" 
                description="Coordinate the narrative and administrative anchors of your site's foundation for maximum structural integrity."
            >
                <div className="space-y-4">
                    <FormTextArea label="About Text" name="footerAboutText" value={settings.footerAboutText || ""} onChange={handleChange} rows={2} />
                    <FormTextArea label="Address" name="footerAddress" value={settings.footerAddress || ""} onChange={handleChange} rows={2} />
                    <FormInput label="Copyright Notice" name="footerCopyright" value={settings.footerCopyright || ""} onChange={handleChange} />
                </div>
            </FormSection>

            {/* Footer Colors */}
            <FormSection 
                title="Atmospheric Schema" 
                description="Calibrate the visual resonance and atmospheric tones of the footer environment."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["footerBackgroundColor", "footerTextColor"].map((color) => (
                        <div key={color} className="space-y-1.5">
                            <label className="text-[10px] font-bold text-white uppercase tracking-widest pl-0.5">{color.replace("footer", "").replace("Color", "")}</label>
                            <div className="flex gap-2">
                                <div className="relative w-8 h-8 rounded border border-[#2f2f2f] overflow-hidden shrink-0">
                                    <input
                                        type="color"
                                        name={color}
                                        value={(settings as any)[color] || "#000000"}
                                        onChange={handleChange}
                                        className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name={color}
                                    value={(settings as any)[color] || "#000000"}
                                    onChange={handleChange}
                                    className="w-full px-2.5 py-1.5 bg-white/5 border border-[#2f2f2f] rounded text-sm text-white outline-none focus:border-gray-500 transition-all font-mono uppercase"
                                    maxLength={7}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </FormSection>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center justify-center px-6 py-2 bg-[#2eaadc] text-white rounded hover:bg-[#1a99cc] disabled:opacity-50 text-xs font-bold transition-colors"
                >
                    {saving ? <Loader2 className="animate-spin mr-2" size={14} /> : <Save className="mr-2" size={14} />}
                    Save Footer
                </button>
            </div>

            {message && (
                <div className={`fixed bottom-8 right-8 px-6 py-3 bg-[#2eaadc] text-white rounded-lg shadow-2xl text-xs font-bold border border-[#2eaadc]/20 animate-in slide-in-from-bottom-4 duration-500 z-50`}>
                    Footer Architecture Synchronized
                </div>
            )}
        </form>
    );
}
