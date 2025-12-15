
"use client";

import { useState, useEffect } from "react";

export function useCurrency() {
    const [currency, setCurrency] = useState("USD");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Try to get from local storage first for immediate render
        const saved = localStorage.getItem("storeCurrency");
        if (saved) {
            setCurrency(saved);
            setLoading(false);
        }

        // Fetch authoritative setting from server
        fetch("/api/settings/payments")
            .then(res => res.json())
            .then(data => {
                if (data.currency) {
                    setCurrency(data.currency);
                    localStorage.setItem("storeCurrency", data.currency);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(price);
    };

    return { currency, formatPrice, loading };
}
