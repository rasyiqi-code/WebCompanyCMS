import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ProfileForm } from "./profile-form";
import { PageHeader } from "@/components/dashboard/ui/DataTable";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/login");
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <PageHeader 
                title="Personal Identity" 
                subtitle="Manage your digital presence, access credentials, and security settings." 
            />

            <div className="bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-blue-500/50"></div>
                <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-3xl font-black border border-indigo-500/20 shadow-inner">
                        {(user.name?.[0] || "U").toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-white tracking-tight">{user.name || "Anonymous User"}</h2>
                        <p className="text-white font-medium mt-0.5">{user.email}</p>
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20 mt-3">
                            {user.role} Archive Access
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <ProfileForm user={user} />
                </div>
            </div>
        </div>
    );
}
