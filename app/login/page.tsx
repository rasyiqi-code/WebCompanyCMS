"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ChevronRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Access Denied: Invalid credentials provided.");
                setLoading(false);
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Authentication Protocol Failure");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#191919] p-6 font-sans">
            <div className="w-full max-w-[400px]">
                {/* Branding Section */}
                <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-14 h-14 bg-[#202020] border border-[#2f2f2f] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transition-transform hover:scale-105">
                        <ShieldCheck className="text-[#2eaadc]" size={28} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Workspace Portal</h1>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Secured Next_CMS Environment</p>
                </div>

                {/* Login Container */}
                <div className="bg-[#202020] border border-[#2f2f2f] rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-lg animate-in shake duration-500">
                                {error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Identity (Email)</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#2eaadc] transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-[#191919] border border-[#2f2f2f] rounded-xl text-sm text-white placeholder-gray-700 outline-none focus:border-[#2eaadc] transition-all"
                                    placeholder="admin@cms.internal"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Keyphrase (Password)</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#2eaadc] transition-colors" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-[#191919] border border-[#2f2f2f] rounded-xl text-sm text-white placeholder-gray-700 outline-none focus:border-[#2eaadc] transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2eaadc] hover:bg-[#1a99cc] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    Authorize Access <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Technical Info */}
                <div className="mt-8 flex items-center justify-center gap-4 text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                    <span>Build v1.0.4-Stable</span>
                    <span className="w-1 h-1 bg-gray-800 rounded-full" />
                    <span>Edge Encrypted</span>
                </div>
            </div>
        </div>
    );
}
