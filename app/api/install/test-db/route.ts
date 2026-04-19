import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
    let testClient: PrismaClient | null = null;
    try {
        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ error: "Missing database connection string" }, { status: 400 });
        }

        // Instantiate a temporary PrismaClient to verify the connection
        testClient = new PrismaClient({
            datasources: {
                db: {
                    url: url
                }
            }
        });

        // Test connectivity
        await testClient.$queryRaw`SELECT 1`;

        return NextResponse.json({ success: true, message: "Database connection verified successfully." });
    } catch (error) {
        let message = "Could not connect to database.";
        if (error instanceof Error) {
            message = error.message;
            // Clean up common Prisma error messages for better UX
            if (message.includes("Can't reach database server")) {
                message = "Persistence layer unreachable. Check binary host/port.";
            } else if (message.includes("Authentication failed")) {
                message = "Identity validation failure. Check credentials.";
            }
        }
        
        return NextResponse.json({ 
            error: "Connection Failed", 
            details: message 
        }, { status: 400 });
    } finally {
        if (testClient) {
            await testClient.$disconnect();
        }
    }
}
