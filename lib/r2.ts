import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    console.warn("R2 Credentials missing!");
}

const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID!,
        secretAccessKey: R2_SECRET_ACCESS_KEY!,
    },
});

export async function uploadToR2(file: Buffer, filename: string, mimeType: string) {
    const key = `${crypto.randomUUID()}-${filename.replace(/\s+/g, '-')}`;

    await S3.send(new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: mimeType,
    }));

    return `${R2_PUBLIC_DOMAIN}/${key}`;
}

export async function deleteFromR2(fileUrl: string) {
    try {
        // Use URL API to robustly parse the URL
        let urlStringToParse = fileUrl;
        if (!fileUrl.match(/^https?:\/\//)) {
            urlStringToParse = `https://${fileUrl}`;
        }

        const urlObj = new URL(urlStringToParse);

        // Remove the leading slash from pathname to get the key
        const key = urlObj.pathname.substring(1);

        if (!key) {
            console.warn("Could not extract key from URL:", fileUrl);
            return;
        }

        // If domain doesn't match, we log a warning but STILL TRY to delete if it looks like a valid key
        if (!fileUrl.startsWith(R2_PUBLIC_DOMAIN!)) {
            console.warn("WARNING: File URL domain does not match R2_PUBLIC_DOMAIN. Attempting delete anyway using extracted key.");
        }

        await S3.send(new DeleteObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
        }));
    } catch (error) {
        console.error("Failed to delete from R2:", error);
    }
}
