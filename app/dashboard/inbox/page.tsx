
"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Calendar } from "lucide-react";
import { 
    PageHeader,
    Skeleton,
    CardSkeleton
} from "@/components/dashboard/ui/DataTable";

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

    if (loading) return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4">
            <PageHeader title="Inbox" subtitle="Aggregate and read inbound communications from your website." />
            <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-[#202020] rounded border border-[#2f2f2f] p-6 space-y-4">
                        <div className="flex justify-between">
                            <Skeleton className="h-6 w-1/3" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4">
            <PageHeader 
                title="Inbox" 
                subtitle="Aggregate and read inbound communications from your website." 
            />

            {messages.length === 0 ? (
                <div className="bg-[#202020] py-32 rounded border border-[#2f2f2f] text-center">
                    <Mail size={40} className="mx-auto mb-4 text-gray-700" />
                    <p className="text-white text-xs font-medium">No messages found in your inbox.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {messages.map(msg => (
                        <div key={msg.id} className="bg-[#202020] rounded border border-[#2f2f2f] transition-all overflow-hidden w-full">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-6">
                                    <div>
                                        <h3 className="font-bold text-lg text-white tracking-tight mb-2">
                                            {msg.subject || "(Untitled Message)"}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-white font-bold text-[10px] border border-[#2f2f2f]">
                                                {msg.name[0].toUpperCase()}
                                            </div>
                                            <p className="text-[11px] font-medium text-white">
                                                {msg.name} <span className="mx-1 text-gray-800">•</span> <span className="text-white lowercase">{msg.email}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-medium text-white uppercase tracking-widest bg-white/[0.02] px-2 py-1 rounded border border-[#2f2f2f]">
                                        {new Date(msg.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </div>
                                </div>
                                <div className="p-4 bg-white/[0.01] rounded border border-[#2f2f2f] text-white text-sm leading-relaxed whitespace-pre-wrap font-medium">
                                    {msg.message}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
