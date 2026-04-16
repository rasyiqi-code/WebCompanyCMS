
"use client";

import { useState, useEffect } from "react";

import { formatPrice, getCurrencySymbol } from "@/lib/currency";

export function useCurrency() {
    const [currency, setCurrency] = useState("USD");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Try to get from local storage first for immediate render
        const saved = localStorage.getItem("storeCurrency");
        if (saved) {
            setCurrency(saved);
        }

        // Fetch authoritative setting from server
        fetch("/api/settings/payments")
            .then(res => {
                const contentType = res.headers.get("content-type");
                if (res.ok && contentType && contentType.includes("application/json")) {
                    return res.json();
                }
                return null;
            })
            .then(data => {
                if (data && data.currency) {
                    setCurrency(data.currency);
                    localStorage.setItem("storeCurrency", data.currency);
                }
            })
            .catch(err => console.error("Currency fetch error:", err))
            .finally(() => setLoading(false));
    }, []);

    const format = (price: number | string) => {
        return formatPrice(price, currency);
    };

    const symbol = getCurrencySymbol(currency);

    return { currency, formatPrice: format, symbol, loading };
}
