import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { 
            accountId, 
            accessKeyId, 
            secretAccessKey, 
            bucketName 
        } = body;

        if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
            return NextResponse.json({ error: "Missing required S3/R2 credentials" }, { status: 400 });
        }

        // Initialize S3 client for Cloudflare R2
        const s3Client = new S3Client({
            region: "auto",
            endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
        });

        // Test connectivity by trying to list objects (light operation)
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            MaxKeys: 1
        });

        await s3Client.send(command);

        return NextResponse.json({ 
            success: true, 
            message: "Cloud storage credentials verified successfully." 
        });
    } catch (error) {
        console.error("[INSTALLER_R2_TEST] Error:", error);
        return NextResponse.json({ 
            error: "Storage Validation Failed", 
            details: error instanceof Error ? error.message : "Could not reach storage provider." 
        }, { status: 400 });
    }
}
