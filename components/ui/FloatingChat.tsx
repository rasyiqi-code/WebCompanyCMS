"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { SiteSettings } from "../../lib/settings";

export default function FloatingChat() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error(err));
    }, []);

    if (!settings?.showFloatingChat || !settings?.whatsappNumber) return null;

    const whatsappUrl = `https://wa.me/${settings.whatsappNumber}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-all hover:scale-110 flex items-center justify-center"
            aria-label="Chat with us on WhatsApp"
        >
            <MessageCircle size={28} />
        </a>
    );
}
