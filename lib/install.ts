import { db } from "./db";

export const isInstalled = async () => {
    try {
        // We consider it installed if there is at least one admin user
        const adminCount = await db.user.count({
            where: {
                role: "admin"
            }
        });
        
        return adminCount > 0;
    } catch (error) {
        // If DB is not ready or table doesn't exist, it's not installed
        console.error("[INSTALL_CHECKER] Error checking installation status:", error);
        return false;
    }
};

export const checkDatabaseConnection = async () => {
    try {
        await db.$queryRaw`SELECT 1`;
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Could not connect to database" 
        };
    }
};

export const checkTablesExist = async () => {
    try {
        // Check for core table 'SiteSettings'
        // Using raw query for maximum compatibility across providers
        await db.$queryRaw`SELECT id FROM "SiteSettings" LIMIT 1`;
        return true;
    } catch (error) {
        // If query fails, usually means table doesn't exist
        return false;
    }
};
