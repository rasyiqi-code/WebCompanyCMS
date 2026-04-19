"use client";

import React, { useState, useEffect } from "react";
import { Save, CreditCard, Loader2 } from "lucide-react";
import { 
    PageHeader,
    Skeleton,
    FormSection,
    FormInput,
    FormSelect,
    FormTextArea
} from "@/components/dashboard/ui/DataTable";

export default function PaymentSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        bankName: "",
        accountNumber: "",
        accountHolder: "",
        currency: "USD",
        instructions: "",
    });

    useEffect(() => {
        // Fetch existing settings
        setInitialLoading(true);
        fetch("/api/settings/payments")
            .then(res => res.json())
            .then(data => {
                if (data && data.bankName) {
                    setFormData({
                        bankName: data.bankName,
                        accountNumber: data.accountNumber,
                        accountHolder: data.accountHolder,
                        currency: data.currency || "USD",
                        instructions: data.instructions || "",
                    });
                }
                setInitialLoading(false);
            })
            .catch(err => {
                console.error(err);
                setInitialLoading(false);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSaved(false);

        try {
            const res = await fetch("/api/settings/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            } else {
                alert("Failed to save settings");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving settings");
        } finally {
            setIsLoading(false);
        }
    };

    if (initialLoading) return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4 space-y-8">
            <PageHeader title="Payments" subtitle="Configure your bank transfer details and currency." />
            <div className="bg-[#202020] rounded border border-[#2f2f2f] p-6 space-y-6">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="w-full pb-20 px-4 space-y-8 animate-in fade-in duration-700">
            <PageHeader 
                title="Payments" 
                subtitle="Configure your bank transfer details and foundational currency for the platform." 
            />

            <FormSection 
                title="Bank Details" 
                description="These details will be shown to customers during the final stages of the checkout ecosystem."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSelect 
                        label="Currency" 
                        name="currency" 
                        value={formData.currency} 
                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                        options={[
                            { label: "USD ($)", value: "USD" },
                            { label: "IDR (Rp)", value: "IDR" },
                            { label: "EUR (€)", value: "EUR" },
                            { label: "GBP (£)", value: "GBP" },
                            { label: "SGD (S$)", value: "SGD" },
                            { label: "AUD (A$)", value: "AUD" }
                        ]}
                    />

                    <FormInput label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} required placeholder="Bank Central Asia (BCA)" />
                    <FormInput label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required className="font-mono" />
                    <FormInput label="Account Holder" name="accountHolder" value={formData.accountHolder} onChange={handleChange} required />
                    
                    <FormTextArea label="Payment Instructions" name="instructions" value={formData.instructions} onChange={handleChange} rows={3} className="md:col-span-2" />
                </div>

                <div className="flex items-center justify-between pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center px-6 py-2 bg-[#2eaadc] text-white rounded hover:bg-[#1a99cc] disabled:opacity-50 text-xs font-bold transition-colors"
                    >
                        {isLoading ? <Loader2 size={14} className="animate-spin mr-2" /> : <Save size={14} className="mr-2" />} 
                        Save Payments
                    </button>
                </div>
            </FormSection>

            {saved && (
                <div className="fixed bottom-8 right-8 px-6 py-3 bg-[#2eaadc] text-white rounded-lg shadow-2xl text-xs font-bold border border-[#2eaadc]/20 animate-in slide-in-from-bottom-4 duration-500 z-50">
                    Payment Gateway Synchronized
                </div>
            )}
        </form>
    );
}
