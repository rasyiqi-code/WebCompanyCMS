"use client";

import React, { useState, useEffect } from "react";
import { Save, CreditCard } from "lucide-react";

export default function PaymentSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        bankName: "",
        accountNumber: "",
        accountHolder: "",
        instructions: "",
    });

    useEffect(() => {
        // Fetch existing settings
        fetch("/api/settings/payments")
            .then(res => res.json())
            .then(data => {
                if (data && data.bankName) {
                    setFormData({
                        bankName: data.bankName,
                        accountNumber: data.accountNumber,
                        accountHolder: data.accountHolder,
                        instructions: data.instructions || "",
                    });
                }
            })
            .catch(err => console.error(err));
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

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <CreditCard className="mr-2 text-indigo-600" size={20} />
                    Bank Transfer Information
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    This information will be displayed to customers during checkout for manual bank transfers.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                        <input
                            type="text" name="bankName" required
                            value={formData.bankName} onChange={handleChange}
                            placeholder="e.g. Bank Central Asia (BCA)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                            <input
                                type="text" name="accountNumber" required
                                value={formData.accountNumber} onChange={handleChange}
                                placeholder="e.g. 1234567890"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder</label>
                            <input
                                type="text" name="accountHolder" required
                                value={formData.accountHolder} onChange={handleChange}
                                placeholder="e.g. PT Example Indo"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Instructions</label>
                        <textarea
                            name="instructions" rows={4}
                            value={formData.instructions} onChange={handleChange}
                            placeholder="Additional instructions for the customer..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
                        >
                            {isLoading ? "Saving..." : <><Save size={18} className="mr-2" /> Save Settings</>}
                        </button>
                        {saved && <span className="ml-4 text-green-600 text-sm font-medium animate-fade-in">Settings saved successfully!</span>}
                    </div>
                </form>
            </div>
        </div>
    );
}
