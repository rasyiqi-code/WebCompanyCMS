"use client";

import React, { useState, useEffect } from "react";
import { SiteSettings } from "../../../../lib/settings";
import { Loader2, Save } from "lucide-react";
import { 
    PageHeader,
    Skeleton,
    FormSection,
    FormInput,
    FormSelect
} from "@/components/dashboard/ui/DataTable";

const CURATED_FONTS = [
    { label: "Inter (Sans)", value: "Inter" },
    { label: "Roboto (Sans)", value: "Roboto" },
    { label: "Outfit (Professional)", value: "Outfit" },
    { label: "Playfair Display (Serif)", value: "Playfair Display" },
    { label: "Montserrat (Modern)", value: "Montserrat" },
    { label: "Poppins (Clean)", value: "Poppins" },
    { label: "Open Sans (Friendly)", value: "Open Sans" },
    { label: "Syne (Avant-garde)", value: "Syne" },
    { label: "Unbounded (Wide Bold)", value: "Unbounded" },
    { label: "Space Grotesk (Tech)", value: "Space Grotesk" },
];

export default function BrandingSettingsPage() {
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

            setMessage("Branding identity synchronized!");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage("Error updating identity.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!settings) return;
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    if (loading) return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8">
            <PageHeader title="Branding" subtitle="Manage and maintain the visual resonance of your brand ecosystem." />
            <div className="space-y-6">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[200px] w-full" />
            </div>
        </div>
    );
    if (!settings) return <div className="p-10">Error loading settings</div>;

    return (
        <form onSubmit={handleSubmit} className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8">
            <PageHeader 
                title="Branding" 
                subtitle="Coordinate the aesthetic palette and identifiers that define your brand voice." 
            />

            {/* Visual Assets */}
            <FormSection 
                title="Visual Assets" 
                description="Manage the primary graphic identifiers and icons of your digital brand ecosystem."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Logo URL" name="logoUrl" value={settings.logoUrl || ""} onChange={handleChange} placeholder="https://..." className="font-mono" />
                    <FormInput label="Favicon URL" name="faviconUrl" value={settings.faviconUrl || ""} onChange={handleChange} placeholder="https://..." className="font-mono" />
                </div>
            </FormSection>

            {/* Aesthetic Palette */}
            <FormSection 
                title="Aesthetic Palette" 
                description="Define the chromatic schema and atmospheric tones of your project's digital interface."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {["brandPrimaryColor", "brandSecondaryColor", "brandAccentColor", "brandBackgroundColor", "brandTextColor"].map((color) => (
                        <div key={color} className="space-y-1.5">
                            <label className="text-[10px] font-bold text-white uppercase tracking-widest pl-0.5">{color.replace("brand", "").replace("Color", "")}</label>
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

            {/* Communication Schema */}
            <FormSection 
                title="Communication Schema" 
                description="Fine-tune the narrative and functional identifiers of your brand's voice."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSelect 
                        label="Primary Font" 
                        name="brandFontPrimary" 
                        value={settings.brandFontPrimary || "Inter"} 
                        onChange={handleChange}
                        options={CURATED_FONTS}
                    />
                    <FormSelect 
                        label="Secondary Font" 
                        name="brandFontSecondary" 
                        value={settings.brandFontSecondary || "Inter"} 
                        onChange={handleChange}
                        options={CURATED_FONTS}
                    />
                    <FormInput label="Footer Branding" name="brandFooterText" value={settings.brandFooterText || ""} onChange={handleChange} />
                    <FormInput label="Support Identifier" name="brandSupportEmail" value={settings.brandSupportEmail || ""} onChange={handleChange} />
                </div>
            </FormSection>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center justify-center px-6 py-2 bg-[#2eaadc] text-white rounded hover:bg-[#1a99cc] disabled:opacity-50 text-xs font-bold transition-colors"
                >
                    {saving ? <Loader2 className="animate-spin mr-2" size={14} /> : <Save className="mr-2" size={14} />}
                    Save Identity
                </button>
            </div>

            {message && (
                <div className={`fixed bottom-8 right-8 px-6 py-3 rounded-lg shadow-2xl text-xs font-bold border animate-in slide-in-from-bottom-4 duration-500 z-50 ${
                    message.includes("Error") 
                        ? "bg-red-500 text-white border-red-600" 
                        : "bg-[#2eaadc] text-white border-[#2eaadc]/20"
                }`}>
                    {message}
                </div>
            )}
        </form>
    );
}
