"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Shield, Save } from "lucide-react";

type UserData = {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: UserData | null;
};

export default function UserModal({ isOpen, onClose, onSuccess, initialData }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setEmail(initialData.email || "");
            setRole(initialData.role);
            setPassword(""); // Always reset password field on edit
        } else {
            setName("");
            setEmail("");
            setRole("user");
            setPassword("");
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const isEditing = !!initialData;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const method = isEditing ? "PATCH" : "POST";
            const body = isEditing
                ? { userId: initialData.id, name, email, role, password }
                : { name, email, role, password };

            const res = await fetch("/api/users", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                onSuccess();
                onClose();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to save user");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving user");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl w-full max-w-md overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                <div className="flex justify-between items-center p-6 border-b border-white/5">
                    <div>
                        <h3 className="text-xl font-extrabold text-white tracking-tight">
                            {isEditing ? "Edit User" : "Create User"}
                        </h3>
                        <p className="text-[10px] text-white font-bold uppercase tracking-widest mt-1">
                            User Management Details
                        </p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-white hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1 text-indigo-400">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white group-focus-within:text-indigo-400 transition-colors" size={18} />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none text-white transition-all font-medium"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1 text-indigo-400">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white group-focus-within:text-indigo-400 transition-colors" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none text-white transition-all font-medium"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1 text-indigo-400">User Role</label>
                        <div className="relative group">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-white group-focus-within:text-indigo-400 transition-colors" size={18} />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="appearance-none w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none text-white transition-all font-bold text-sm cursor-pointer"
                            >
                                <option value="user" className="bg-[#111]">User (Standard)</option>
                                <option value="editor" className="bg-[#111]">Editor (Content Lead)</option>
                                <option value="admin" className="bg-[#111]">Admin (Full Access)</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 space-y-1.5">
                        <label className="text-[10px] font-bold text-white uppercase tracking-[0.2em] ml-1 text-indigo-400">
                            {isEditing ? "Password (Optional)" : "Initial Password"}
                        </label>
                        <div className="relative group">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-white group-focus-within:text-indigo-400 transition-colors" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none text-white transition-all font-medium"
                                placeholder={isEditing ? "Omit to retain current" : "Set initial token"}
                            />
                        </div>
                        <p className="text-[10px] text-white font-bold uppercase tracking-widest mt-1 ml-1 opacity-50">
                            {isEditing ? "Only enter to change password." : "Default is 'change-me' if omitted."}
                        </p>
                    </div>

                    <div className="pt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-white font-bold hover:text-white transition-colors text-xs uppercase tracking-widest"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20 active:scale-95 text-xs uppercase tracking-widest flex items-center"
                        >
                            {loading ? "Saving..." : <><Save size={16} className="mr-2" /> {isEditing ? "Save User" : "Add User"}</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
