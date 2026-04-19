
"use client";

import { useState } from "react";
import { Save, Lock, User, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileForm({ user }: { user: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password && password !== confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" });
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password }),
            });

            if (!res.ok) throw new Error("Failed to update profile");

            setMessage({ type: "success", text: "Profile updated successfully" });
            router.refresh();
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update profile" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10 p-8">
            {message.text && (
                <div className={`px-6 py-4 rounded-2xl text-sm font-bold shadow-2xl backdrop-blur-md border ${
                    message.type === "error" 
                        ? "bg-red-500/10 text-red-400 border-red-500/20" 
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                }`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-2">
                <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1">Universal Designation</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white group-focus-within:text-indigo-400 transition-colors" size={18} />
                    <input
                        name="name"
                        defaultValue={user.name || ""}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none text-white transition-all font-medium"
                    />
                </div>
            </div>

            <div className="pt-10 border-t border-white/5 space-y-8">
                <div>
                    <h3 className="text-lg font-extrabold text-white tracking-tight mb-1">Credential Rotation</h3>
                    <p className="text-white text-sm font-medium">Update account access tokens (optional).</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1">New Prototype</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white group-focus-within:text-indigo-400 transition-colors" size={18} />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none text-white transition-all font-mono"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1">Confirmation</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white group-focus-within:text-indigo-400 transition-colors" size={18} />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none text-white transition-all font-mono"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center px-10 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 disabled:opacity-50 text-sm font-bold transition-all shadow-xl shadow-indigo-600/20"
                >
                    {loading ? <Loader2 className="animate-spin mr-3" size={20} /> : <Save className="mr-3" size={20} />}
                    Synchronize Identity
                </button>
            </div>
        </form>
    );
}
