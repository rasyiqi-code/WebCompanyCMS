"use client";

import React, { useEffect, useState } from "react";
import { CreditCard, Copy, Check } from "lucide-react";

export default function PaymentMethodInfo() {
    const [settings, setSettings] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetch("/api/settings/payments")
            .then(res => res.json())
            .then(data => {
                if (data && data.bankName) {
                    setSettings(data);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const copyToClipboard = () => {
        if (settings?.accountNumber) {
            navigator.clipboard.writeText(settings.accountNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!settings) return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 opacity-60 pointer-events-none">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard className="mr-3 text-gray-500" />
                Payment
            </h2>
            <p className="text-sm text-gray-500">Payment is simulated for this demo. No card required.</p>
        </div>
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard className="mr-3 text-emerald-600" />
                Payment Method
            </h2>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Bank Transfer (Manual)</h3>
                <p className="text-sm text-gray-600 mb-4">Please transfer the total amount to:</p>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Bank Name</span>
                        <span className="font-medium text-gray-900">{settings.bankName}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Account Holder</span>
                        <span className="font-medium text-gray-900">{settings.accountHolder}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Account Number</span>
                        <div className="flex items-center">
                            <span className="font-mono font-bold text-gray-900 mr-2">{settings.accountNumber}</span>
                            <button
                                onClick={copyToClipboard}
                                className="text-indigo-600 hover:text-indigo-800"
                                title="Copy Account Number"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {settings.instructions && (
                <div className="text-xs text-gray-500 p-3 bg-blue-50 text-blue-800 rounded-lg">
                    <p className="font-semibold mb-1">Instructions:</p>
                    {settings.instructions}
                </div>
            )}
        </div>
    );
}
