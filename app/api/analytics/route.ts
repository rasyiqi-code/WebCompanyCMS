
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
    try {
        const stats = await db.siteStatistics.findFirst();

        if (!stats) {
            // Initialize if not exists
            const newStats = await db.siteStatistics.create({
                data: {
                    totalViews: 1,
                    todayViews: 1,
                    lastUpdated: new Date(),
                }
            });
            return NextResponse.json(newStats);
        }

        const currentStats = stats;
        const lastDate = new Date(currentStats.lastUpdated);
        const today = new Date();
        const isSameDay = lastDate.getDate() === today.getDate() &&
            lastDate.getMonth() === today.getMonth() &&
            lastDate.getFullYear() === today.getFullYear();

        let updatedStats;

        if (isSameDay) {
            updatedStats = await db.siteStatistics.update({
                where: { id: currentStats.id },
                data: {
                    totalViews: { increment: 1 },
                    todayViews: { increment: 1 },
                    lastUpdated: new Date()
                }
            });
        } else {
            updatedStats = await db.siteStatistics.update({
                where: { id: currentStats.id },
                data: {
                    totalViews: { increment: 1 },
                    todayViews: 1, // Reset for new day
                    lastUpdated: new Date()
                }
            });
        }

        return NextResponse.json(updatedStats);

    } catch (error) {
        console.error("Analytics Error:", error);
        return NextResponse.json({ totalViews: 0, todayViews: 0 }, { status: 500 });
    }
}
