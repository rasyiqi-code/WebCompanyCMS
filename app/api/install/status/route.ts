import { NextResponse } from "next/server";
import { isFileSystemWritable } from "../../../../lib/env-manager";
import { checkDatabaseConnection, checkTablesExist } from "../../../../lib/install";

export async function GET() {
    try {
        const isWritable = await isFileSystemWritable();
        const dbUrlExists = !!process.env.DATABASE_URL;
        const dbConnection = await checkDatabaseConnection();
        const tablesExist = dbConnection.success ? await checkTablesExist() : false;

        return NextResponse.json({
            success: true,
            status: {
                isWritable,
                dbUrlExists,
                dbConnected: dbConnection.success,
                tablesExist,
                dbError: dbConnection.error || null,
                nodeEnv: process.env.NODE_ENV,
                isVercel: !!process.env.VERCEL
            }
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to fetch system status" 
        }, { status: 500 });
    }
}
