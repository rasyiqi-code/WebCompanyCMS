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

export default function GeneralSettingsPage() {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!settings) return;
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    if (loading) return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8">
            <PageHeader title="General Settings" subtitle="Define your project's foundational attributes." />
            <div className="space-y-6">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[300px] w-full" />
            </div>
        </div>
    );
    if (!settings) return <div className="p-10">Error loading settings</div>;

    return (
        <form onSubmit={handleSubmit} className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8">
            <PageHeader 
                title="General Settings" 
                subtitle="Define your project's foundational attributes and core site identity." 
            />

            {/* General Info */}
            <FormSection 
                title="Core Identity" 
                description="Define your project's foundational attributes and public-facing identity."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Site Name" name="siteName" value={settings.siteName || ""} onChange={handleChange} />
                    <FormInput label="Hero Tagline" name="tagline" value={settings.tagline || ""} onChange={handleChange} placeholder="e.g. Masterwork Engineering" />
                    <FormInput label="Brand Logo URL" name="logoUrl" value={settings.logoUrl || ""} onChange={handleChange} placeholder="https://..." />
                    <FormInput label="Contact Email" name="contactEmail" value={settings.contactEmail || ""} onChange={handleChange} />
                    <FormTextArea label="Description" name="description" value={settings.description || ""} onChange={handleChange} className="md:col-span-2" />
                </div>
            </FormSection>

            {/* Theme Selection */}
            <FormSection 
                title="Visual Engine" 
                description="Select the architectural theme that defines your site's presentation layer."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Active Theme</label>
                        <select 
                            name="activeTheme"
                            value={settings.activeTheme || "default"}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#2eaadc]/20 focus:border-[#2eaadc]/50 outline-none text-xs text-white transition-all appearance-none cursor-pointer"
                        >
                            <option value="default" className="bg-[#202020]">Default (Standard Next)</option>
                            <option value="luxury" className="bg-[#202020]">Luxury Dark (Premium Serif)</option>
                        </select>
                        <p className="text-[9px] text-gray-500 mt-1 italic">Switching themes instantly modifies fonts, colors, and layouts across the public site.</p>
                    </div>
                </div>
            </FormSection>

            {/* SEO Configuration */}
            <FormSection 
                title="Visibility Matrix" 
                description="Fine-tune your global search and discovery footprint for maximum engagement."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Meta Title Pattern" name="seoTitle" value={settings.seoTitle || ""} onChange={handleChange} placeholder="%s | Studio" />
                    <FormInput label="Global Keywords" name="seoKeywords" value={settings.seoKeywords || ""} onChange={handleChange} />
                    <FormInput label="Favicon URL" name="faviconUrl" value={settings.faviconUrl || ""} onChange={handleChange} />
                    <FormInput label="OG Image Reference" name="seoImage" value={settings.seoImage || ""} onChange={handleChange} />
                    <FormInput label="GSV ID" name="googleSiteVerificationId" value={settings.googleSiteVerificationId || ""} onChange={handleChange} />
                    <FormInput label="Analytics ID (GA4)" name="googleAnalyticsId" value={settings.googleAnalyticsId || ""} onChange={handleChange} />
                </div>
            </FormSection>

            {/* Social Media */}
            <FormSection 
                title="Social Ecosystem" 
                description="Link your presence across the digital landscape to foster multi-channel growth."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["socialFacebook", "socialTwitter", "socialInstagram", "socialLinkedin", "socialWhatsapp", "socialTelegram"].map((social) => (
                        <FormInput 
                            key={social}
                            label={social.replace("social", "")} 
                            name={social} 
                            value={(settings as any)[social] || ""} 
                            onChange={handleChange} 
                        />
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
                    Save Settings
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
