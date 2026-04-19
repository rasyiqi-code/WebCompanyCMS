"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    CheckCircle2, 
    Database, 
    User, 
    Settings, 
    Rocket, 
    Loader2, 
    ChevronRight,
    Lock,
    Mail,
    Globe,
    Server,
    Cloud,
    AlertCircle
} from "lucide-react";

export default function InstallerPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    // Status indicators
    const [dbTestStatus, setDbTestStatus] = useState<null | "testing" | "success" | "error">(null);
    const [r2TestStatus, setR2TestStatus] = useState<null | "testing" | "success" | "error">(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [testError, setTestError] = useState("");

    // Infrastructure Configuration
    const [envConfig, setEnvConfig] = useState({
        databaseUrl: "",
        r2AccountId: "",
        r2AccessKeyId: "",
        r2SecretAccessKey: "",
        r2BucketName: "",
        r2PublicDomain: "",
        nextauthUrl: "",
        nextPublicAppUrl: ""
    });

    const [siteInfo, setSiteInfo] = useState({
        siteName: "My Website",
        tagline: "Just another Next_CMS site",
        description: "A professional site built with Next_CMS"
    });

    const [adminInfo, setAdminInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    // System status
    const [systemStatus, setSystemStatus] = useState<any>(null);
    const [isPreConfigured, setIsPreConfigured] = useState(false);

    useEffect(() => {
        // 1. Auto-detect URLs
        if (typeof window !== "undefined") {
            const origin = window.location.origin;
            setEnvConfig(prev => ({
                ...prev,
                nextauthUrl: origin,
                nextPublicAppUrl: origin
            }));
        }

        // 2. Fetch System Status
        const checkStatus = async () => {
            try {
                const res = await fetch("/api/install/status");
                const data = await res.json();
                if (data.success) {
                    setSystemStatus(data.status);
                    if (data.status.dbUrlExists && data.status.dbConnected) {
                        setIsPreConfigured(true);
                        setDbTestStatus("success");
                    }
                }
            } catch (err) {
                console.error("Failed to fetch system status");
            }
        };
        checkStatus();
    }, []);

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const testDatabase = async () => {
        setDbTestStatus("testing");
        setTestError("");
        try {
            const res = await fetch("/api/install/test-db", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: envConfig.databaseUrl || undefined }) 
            });
            const data = await res.json();
            if (res.ok) setDbTestStatus("success");
            else {
                setDbTestStatus("error");
                setTestError(data.details || data.error);
            }
        } catch (err) {
            setDbTestStatus("error");
            setTestError("Network failure while testing database.");
        }
    };

    const handleSyncSchema = async () => {
        setIsSyncing(true);
        setError("");
        try {
            const res = await fetch("/api/install/sync-db", { method: "POST" });
            const data = await res.json();
            if (res.ok) {
                // Refresh status after sync
                const statusRes = await fetch("/api/install/status");
                const statusData = await statusRes.json();
                if (statusData.success) {
                    setSystemStatus(statusData.status);
                }
            } else {
                setError(data.details || data.error);
            }
        } catch (err) {
            setError("Failed to communicate with synchronization engine.");
        } finally {
            setIsSyncing(false);
        }
    };

    const testR2 = async () => {
        setR2TestStatus("testing");
        setTestError("");
        try {
            const res = await fetch("/api/install/test-r2", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    accountId: envConfig.r2AccountId,
                    accessKeyId: envConfig.r2AccessKeyId,
                    secretAccessKey: envConfig.r2SecretAccessKey,
                    bucketName: envConfig.r2BucketName
                })
            });
            const data = await res.json();
            if (res.ok) setR2TestStatus("success");
            else {
                setR2TestStatus("error");
                setTestError(data.details || data.error);
            }
        } catch (err) {
            setR2TestStatus("error");
            setTestError("Network failure while testing storage.");
        }
    };

    const runInstallation = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/install", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    env: envConfig,
                    admin: adminInfo,
                    site: siteInfo
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Installation failed");
            }

            setStep(4); // Success step
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong during installation");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#191919] text-white flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-[#202020] border border-[#2f2f2f] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <Rocket className="text-[#2eaadc]" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Next CMS Setup</h1>
                    <p className="text-gray-400 text-sm">Configure your infrastructure and identities.</p>
                    {systemStatus && (
                        <div className="flex items-center justify-center gap-2 mt-4">
                            {systemStatus.dbUrlExists && (
                                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-bold uppercase tracking-widest rounded">
                                    System Env Detected
                                </span>
                            )}
                            {!systemStatus.isWritable && (
                                <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-bold uppercase tracking-widest rounded">
                                    Read-only Environment
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Progress Indicators */}
                <div className="flex items-center justify-between mb-12 px-20相对">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2f2f2f] -z-1" />
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all z-10 ${
                            step >= i ? "bg-[#2eaadc] border-[#2eaadc] text-white" : "bg-[#191919] border-[#2f2f2f] text-gray-600"
                        }`}>
                            {step > i ? <CheckCircle2 size={16} /> : i}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="bg-[#202020] border border-[#2f2f2f] rounded-2xl p-8 shadow-2xl min-h-[500px] flex flex-col">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="pb-4 border-b border-[#2f2f2f]">
                                <h2 className="text-xl font-bold text-white mb-1">Infrastructure Config</h2>
                                <p className="text-gray-400 text-xs text-medium">Configure your database, storage, and application variables.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Database Section */}
                                <div className="md:col-span-2 space-y-4 p-4 bg-white/5 border border-[#2f2f2f] rounded-xl relative overflow-hidden">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Database size={16} className="text-[#2eaadc]" />
                                            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Database (PostgreSQL)</h3>
                                        </div>
                                        <button 
                                            onClick={testDatabase}
                                            disabled={!envConfig.databaseUrl || dbTestStatus === "testing"}
                                            className="text-[10px] font-bold text-[#2eaadc] hover:text-white transition-colors disabled:opacity-30"
                                        >
                                            {dbTestStatus === "testing" ? "AUTHENTICATING..." : "VERIFY CONNECTION"}
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={envConfig.databaseUrl}
                                        onChange={(e) => setEnvConfig({...envConfig, databaseUrl: e.target.value})}
                                        className="w-full px-3 py-2 bg-[#191919] border border-[#2f2f2f] rounded-lg text-xs text-white placeholder-gray-700 outline-none focus:border-[#2eaadc] transition-colors"
                                    />
                                    {dbTestStatus === "success" && <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">✔ Handshake Successful</p>}
                                    {dbTestStatus === "error" && <p className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">✘ {testError}</p>}
                                    
                                    {/* Schema Sync block */}
                                    {dbTestStatus === "success" && systemStatus && !systemStatus.tablesExist && (
                                        <div className="mt-4 p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-lg flex items-center justify-between animate-in zoom-in duration-300">
                                            <div>
                                                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Action Required: Initialize Schema</p>
                                                <p className="text-[9px] text-gray-500 mt-1">Found connected database but required tables are missing.</p>
                                            </div>
                                            <button 
                                                onClick={handleSyncSchema}
                                                disabled={isSyncing}
                                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all disabled:opacity-50"
                                            >
                                                {isSyncing ? "INITIALIZING..." : "SYNC SCHEMA NOW"}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* R2 Section */}
                                <div className="md:col-span-2 space-y-4 p-4 bg-white/5 border border-[#2f2f2f] rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Cloud size={16} className="text-[#2eaadc]" />
                                            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Cloud Storage (Cloudflare R2)</h3>
                                        </div>
                                        <button 
                                            onClick={testR2}
                                            disabled={!envConfig.r2AccountId || r2TestStatus === "testing"}
                                            className="text-[10px] font-bold text-[#2eaadc] hover:text-white transition-colors disabled:opacity-30"
                                        >
                                            {r2TestStatus === "testing" ? "PROBING..." : "VERIFY BUCKET"}
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                        <input
                                            type="text" placeholder="Account ID"
                                            value={envConfig.r2AccountId}
                                            onChange={(e) => setEnvConfig({...envConfig, r2AccountId: e.target.value})}
                                            className="w-full px-3 py-2 bg-[#191919] border border-[#2f2f2f] rounded-lg text-white"
                                        />
                                        <input
                                            type="text" placeholder="Bucket Name"
                                            value={envConfig.r2BucketName}
                                            onChange={(e) => setEnvConfig({...envConfig, r2BucketName: e.target.value})}
                                            className="w-full px-3 py-2 bg-[#191919] border border-[#2f2f2f] rounded-lg text-white"
                                        />
                                        <input
                                            type="text" placeholder="Access Key ID"
                                            value={envConfig.r2AccessKeyId}
                                            onChange={(e) => setEnvConfig({...envConfig, r2AccessKeyId: e.target.value})}
                                            className="w-full px-3 py-2 bg-[#191919] border border-[#2f2f2f] rounded-lg text-white"
                                        />
                                        <input
                                            type="password" placeholder="Secret Access Key"
                                            value={envConfig.r2SecretAccessKey}
                                            onChange={(e) => setEnvConfig({...envConfig, r2SecretAccessKey: e.target.value})}
                                            className="w-full px-3 py-2 bg-[#191919] border border-[#2f2f2f] rounded-lg text-white"
                                        />
                                        <input
                                            type="text" placeholder="Public Domain (https://...)"
                                            value={envConfig.r2PublicDomain}
                                            onChange={(e) => {
                                                let val = e.target.value;
                                                if (val && !val.startsWith("http")) val = `https://${val}`;
                                                setEnvConfig({...envConfig, r2PublicDomain: val})
                                            }}
                                            className="w-full md:col-span-2 px-3 py-2 bg-[#191919] border border-[#2f2f2f] rounded-lg text-white"
                                        />
                                    </div>
                                    {r2TestStatus === "success" && <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">✔ Persistence Verified</p>}
                                    {r2TestStatus === "error" && <p className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">✘ {testError}</p>}
                                </div>

                                {/* URLs Section */}
                                <div className="md:col-span-2 space-y-4 p-4 bg-white/5 border border-[#2f2f2f] rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <Server size={16} className="text-[#2eaadc]" />
                                        <h3 className="text-xs font-bold text-white uppercase tracking-widest">Global Application URLs</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[9px] text-gray-500 uppercase font-bold tracking-widest ml-1">NextAuth URL</label>
                                            <input
                                                type="text"
                                                value={envConfig.nextauthUrl}
                                                onChange={(e) => setEnvConfig({...envConfig, nextauthUrl: e.target.value})}
                                                className="w-full px-3 py-2 bg-[#191919] border border-[#2f2f2f] rounded-lg text-xs text-white"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] text-gray-500 uppercase font-bold tracking-widest ml-1">App Public URL</label>
                                            <input
                                                type="text"
                                                value={envConfig.nextPublicAppUrl}
                                                onChange={(e) => setEnvConfig({...envConfig, nextPublicAppUrl: e.target.value})}
                                                className="w-full px-3 py-2 bg-[#191919] border border-[#2f2f2f] rounded-lg text-xs text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 mt-auto">
                                <button
                                    onClick={handleNext}
                                    disabled={dbTestStatus !== "success" || (systemStatus && !systemStatus.tablesExist)}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#2eaadc] hover:bg-[#1a99cc] disabled:opacity-30 text-white rounded-xl font-bold text-sm transition-all"
                                >
                                    Proceed to Site Identity <ChevronRight size={18} />
                                </button>
                                {(dbTestStatus !== "success" || (systemStatus && !systemStatus.tablesExist)) && (
                                    <p className="text-center text-[10px] text-gray-600 mt-3 font-bold uppercase">
                                        {dbTestStatus !== "success" ? "DATABASE VERIFICATION REQUIRED" : "SCHEMA INITIALIZATION REQUIRED"}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="pb-4 border-b border-[#2f2f2f]">
                                <h2 className="text-xl font-bold text-white mb-1">Site Identity</h2>
                                <p className="text-gray-400 text-xs">Define how your site appears to the world.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Site Name</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input
                                            type="text"
                                            value={siteInfo.siteName}
                                            onChange={(e) => setSiteInfo({...siteInfo, siteName: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-[#191919] border border-[#2f2f2f] rounded-xl text-sm text-white placeholder-gray-700 outline-none focus:border-[#2eaadc] transition-colors"
                                            placeholder="Next CMS"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Catchphrase (Tagline)</label>
                                    <input
                                        type="text"
                                        value={siteInfo.tagline}
                                        onChange={(e) => setSiteInfo({...siteInfo, tagline: e.target.value})}
                                        className="w-full px-4 py-3 bg-[#191919] border border-[#2f2f2f] rounded-xl text-sm text-white placeholder-gray-700 outline-none focus:border-[#2eaadc] transition-colors"
                                        placeholder="Innovation Meets Reality"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Meta Description</label>
                                    <textarea
                                        value={siteInfo.description}
                                        onChange={(e) => setSiteInfo({...siteInfo, description: e.target.value})}
                                        className="w-full px-4 py-3 bg-[#191919] border border-[#2f2f2f] rounded-xl text-sm text-white placeholder-gray-700 outline-none focus:border-[#2eaadc] transition-colors resize-none"
                                        rows={3}
                                        placeholder="A professional site powered by Next_CMS..."
                                    />
                                </div>
                            </div>

                            <div className="pt-6 flex gap-3 mt-auto">
                                <button
                                    onClick={handleBack}
                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-sm transition-all border border-[#2f2f2f]"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="flex-1 py-3 bg-[#2eaadc] hover:bg-[#1a99cc] text-white rounded-xl font-bold text-sm transition-all"
                                >
                                    Define Admin Credentials
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="pb-4 border-b border-[#2f2f2f]">
                                <h2 className="text-xl font-bold text-white mb-1">Administrative Domain</h2>
                                <p className="text-gray-400 text-xs">Create your root identity for full system access.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Admin Account</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input
                                            type="text"
                                            value={adminInfo.name}
                                            onChange={(e) => setAdminInfo({...adminInfo, name: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-[#191919] border border-[#2f2f2f] rounded-xl text-sm text-white placeholder-gray-700 outline-none focus:border-[#2eaadc] transition-colors"
                                            placeholder="System Administrator"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Access Protocol (Email)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input
                                            type="email"
                                            value={adminInfo.email}
                                            onChange={(e) => setAdminInfo({...adminInfo, email: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-[#191919] border border-[#2f2f2f] rounded-xl text-sm text-white placeholder-gray-700 outline-none focus:border-[#2eaadc] transition-colors"
                                            placeholder="admin@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Security Key (Password)</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                        <input
                                            type="password"
                                            value={adminInfo.password}
                                            onChange={(e) => setAdminInfo({...adminInfo, password: e.target.value})}
                                            className="w-full pl-10 pr-4 py-3 bg-[#191919] border border-[#2f2f2f] rounded-xl text-sm text-white placeholder-gray-700 outline-none focus:border-[#2eaadc] transition-colors"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex gap-3 mt-auto">
                                <button
                                    onClick={handleBack}
                                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-sm transition-all border border-[#2f2f2f]"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={runInstallation}
                                    disabled={loading}
                                    className="flex-1 py-3 bg-[#2eaadc] hover:bg-[#1a99cc] text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>Initializing Architecture <Loader2 className="animate-spin" size={18} /></>
                                    ) : (
                                        "Deploy CMS"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-700 text-center py-10">
                            <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                                <CheckCircle2 size={48} />
                            </div>
                            
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">Architectural Success</h1>
                                <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                                    Next CMS has been fully deployed. {systemStatus?.isWritable ? "Environment config has been persisted to .env. Please restart your server to finalize." : "Configuration used from system environment variables."}
                                </p>
                            </div>

                            <div className="w-full pt-10">
                                <button
                                    onClick={() => router.push("/login")}
                                    className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-all shadow-xl shadow-white/5"
                                >
                                    Access Dashboard Entrance
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-[10px] uppercase font-bold tracking-widest text-gray-600">
                    Proprietary Setup Framework • Build 1.1.0
                </div>
            </div>
        </div>
    );
}
