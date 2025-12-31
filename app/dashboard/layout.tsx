import React from "react";
import DashboardShell from "../../components/dashboard/DashboardShell";
import { getSiteSettings } from "../../lib/settings";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await getSiteSettings();

    return (
        <DashboardShell initialSettings={settings}>
            {children}
        </DashboardShell>
    );
}
