
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteStatistics } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
    try {
        const stats = await db.select().from(siteStatistics).limit(1);

        if (stats.length === 0) {
            // Initialize if not exists
            const newStats = await db.insert(siteStatistics).values({
                totalViews: 1,
                todayViews: 1,
                lastUpdated: new Date(),
            }).returning();
            return NextResponse.json(newStats[0]);
        }

        const currentStats = stats[0];
        const lastDate = new Date(currentStats.lastUpdated);
        const today = new Date();
        const isSameDay = lastDate.getDate() === today.getDate() &&
            lastDate.getMonth() === today.getMonth() &&
            lastDate.getFullYear() === today.getFullYear();

        let updatedStats;

        if (isSameDay) {
            updatedStats = await db.update(siteStatistics)
                .set({
                    totalViews: sql`${siteStatistics.totalViews} + 1`,
                    todayViews: sql`${siteStatistics.todayViews} + 1`,
                    lastUpdated: new Date()
                })
                .where(eq(siteStatistics.id, currentStats.id))
                .returning();
        } else {
            updatedStats = await db.update(siteStatistics)
                .set({
                    totalViews: sql`${siteStatistics.totalViews} + 1`,
                    todayViews: 1, // Reset for new day
                    lastUpdated: new Date()
                })
                .where(eq(siteStatistics.id, currentStats.id))
                .returning();
        }

        return NextResponse.json(updatedStats[0]);

    } catch (error) {
        console.error("Analytics Error:", error);
        return NextResponse.json({ totalViews: 0, todayViews: 0 }, { status: 500 });
    }
}
