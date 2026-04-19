import React from "react";
import DashboardShell from "../../components/dashboard/DashboardShell";
import { getSiteSettings } from "../../lib/settings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { isInstalled } from "../../lib/install";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    const installed = await isInstalled();
    if (!installed) {
        redirect("/installer");
    }

    if (!session) {
        redirect("/login");
    }

    const settings = await getSiteSettings();

    return (
        <DashboardShell initialSettings={settings}>
            {children}
        </DashboardShell>
    );
}
