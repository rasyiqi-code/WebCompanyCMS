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
import Link from "next/link";

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

    if (loading) return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8">
            <PageHeader title="Header Architecture" subtitle="Define the structural layout of your navigation interface." />
            <div className="space-y-6">
                <Skeleton className="h-[150px] w-full" />
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[250px] w-full" />
            </div>
        </div>
    );
    if (!settings) return <div className="p-10">Error loading settings</div>;

    return (
        <form onSubmit={handleSubmit} className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8">
            <PageHeader 
                title="Header Architecture" 
                subtitle="Design and structure the structural layout and aesthetics of your primary navigation interface." 
            />

            {/* Header Style */}
            <FormSection 
                title="Architecture" 
                description="Define the structural layout and primary navigation paradigm of your project interface."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSelect 
                        label="Layout Paradigm" 
                        name="headerStyle" 
                        value={settings.headerStyle || "simple"} 
                        onChange={handleChange}
                        options={[
                            { label: "Canonical (Logo L, Menu R)", value: "simple" },
                            { label: "Symmetric (Logo C, Menu Split)", value: "centered" },
                            { label: "Minimalist (Logo L, Hidden Menu)", value: "minimal" }
                        ]}
                    />
                </div>
            </FormSection>

            {/* Header Colors */}
            <FormSection 
                title="Chromatic Schema" 
                description="Coordinate the aesthetic palette and atmospheric tones of the header ecosystem."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {["headerBackgroundColor", "headerTextColor", "headerMobileBackgroundColor"].map((color) => (
                        <div key={color} className="space-y-1.5">
                            <label className="text-[10px] font-bold text-white uppercase tracking-widest pl-0.5">{color.replace("header", "").replace("Color", "")}</label>
                            <div className="flex gap-2">
                                <div className="relative w-8 h-8 rounded border border-[#2f2f2f] overflow-hidden shrink-0">
                                    <input
                                        type="color"
                                        name={color}
                                        value={(settings as any)[color] || "#ffffff"}
                                        onChange={handleChange}
                                        className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name={color}
                                    value={(settings as any)[color] || "#ffffff"}
                                    onChange={handleChange}
                                    className="w-full px-2.5 py-1.5 bg-white/5 border border-[#2f2f2f] rounded text-sm text-white outline-none focus:border-gray-500 transition-all font-mono uppercase"
                                    maxLength={7}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </FormSection>

            {/* Features & Integrations */}
            <FormSection 
                title="Modules" 
                description="Activate auxiliary functional extensions and link external services."
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setSettings({ ...settings, showCart: settings.showCart === false })}>
                        <div className={`flex-shrink-0 w-8 h-4 rounded-full relative transition-colors ${settings.showCart !== false ? 'bg-[#2eaadc]' : 'bg-white/10'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${settings.showCart !== false ? 'left-[1.125rem]' : 'left-0.5'}`} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white cursor-pointer">Shopping Cart</label>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setSettings({ ...settings, showFloatingChat: !settings.showFloatingChat })}>
                        <div className={`flex-shrink-0 w-8 h-4 rounded-full relative transition-colors ${settings.showFloatingChat ? 'bg-[#2eaadc]' : 'bg-white/10'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${settings.showFloatingChat ? 'left-[1.125rem]' : 'left-0.5'}`} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white cursor-pointer">WhatsApp Chat</label>
                        </div>
                    </div>

                    {settings.showFloatingChat && (
                        <div className="pl-12 pt-2 animate-in slide-in-from-top-2 duration-300">
                            <FormInput label="WhatsApp Number" name="whatsappNumber" value={settings.whatsappNumber || ""} onChange={handleChange} placeholder="628XXXXXXXXXX" className="max-w-xs" />
                        </div>
                    )}
                </div>
            </FormSection>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                <p className="text-xs text-white">
                    Heads up: Menu items are managed in the <Link href="/dashboard/menus" className="text-[#2eaadc] hover:underline">Menus</Link> section.
                </p>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center justify-center px-6 py-2 bg-[#2eaadc] text-white rounded hover:bg-[#1a99cc] disabled:opacity-50 text-xs font-bold transition-colors"
                >
                    {saving ? <Loader2 className="animate-spin mr-2" size={14} /> : <Save className="mr-2" size={14} />}
                    Save Header
                </button>
            </div>

            {message && (
                <div className={`fixed bottom-8 right-8 px-6 py-3 bg-[#2eaadc] text-white rounded-lg shadow-2xl text-xs font-bold border border-[#2eaadc]/20 animate-in slide-in-from-bottom-4 duration-500 z-50`}>
                    Header Architecture Updated
                </div>
            )}
        </form>
    );
}
