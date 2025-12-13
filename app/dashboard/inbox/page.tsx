
"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Calendar } from "lucide-react";

type Submission = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
};

export default function InboxPage() {
    const [messages, setMessages] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/contact")
            .then(res => res.json())
            .then(data => {
                setMessages(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Inbox / Messages</h1>

            {messages.length === 0 ? (
                <div className="bg-white p-10 rounded-xl border text-center text-gray-500">
                    <Mail size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No messages yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {messages.map(msg => (
                        <div key={msg.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{msg.subject || "(No Subject)"}</h3>
                                    <p className="text-sm text-blue-600 font-medium">{msg.name} &lt;{msg.email}&gt;</p>
                                </div>
                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString()}
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-gray-700 text-sm whitespace-pre-wrap">
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
