import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { isInstalled } from "../../../../lib/install";

const execAsync = promisify(exec);

export async function POST(req: Request) {
    try {
        // 1. Security Check: Only allow sync if NOT installed
        const alreadyInstalled = await isInstalled();
        if (alreadyInstalled) {
            return NextResponse.json({ error: "Access Denied: Application already initialized" }, { status: 403 });
        }

        console.log("[SYNC_DB] Starting schema synchronization...");

        // 2. Run Prisma DB Push
        // We use db push instead of migrations for a smoother "Universal" setup experience
        // --accept-data-loss is used because this is an installer context
        const { stdout, stderr } = await execAsync("npx prisma db push --accept-data-loss");

        console.log("[SYNC_DB] Stdout:", stdout);
        if (stderr) console.error("[SYNC_DB] Stderr:", stderr);

        return NextResponse.json({ 
            success: true, 
            message: "Database schema synchronized successfully.",
            output: stdout
        });
    } catch (error) {
        console.error("[SYNC_DB] Critical Failure:", error);
        return NextResponse.json({ 
            error: "Schema Sync Failed", 
            details: error instanceof Error ? error.message : "Internal system error during database synchronization" 
        }, { status: 500 });
    }
}
