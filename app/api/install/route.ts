import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { isInstalled } from "../../../lib/install";
import { updateEnv, generateNextAuthSecret } from "../../../lib/env-manager";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        // 1. Security check: Prevent re-installation
        // Note: If this is the very first run, isInstalled will be false.
        const alreadyInstalled = await isInstalled();
        if (alreadyInstalled) {
            return NextResponse.json({ error: "Application already installed" }, { status: 403 });
        }

        const body = await req.json();
        const { admin, site, env } = body;

        if (!admin?.email || !admin?.password || !site?.siteName || !env?.databaseUrl) {
            return NextResponse.json({ error: "Missing required setup data" }, { status: 400 });
        }

        // 2. Persist Infrastructure Config to .env
        const envUpdates: Record<string, string> = {
            DATABASE_URL: env.databaseUrl,
            R2_ACCOUNT_ID: env.r2AccountId,
            R2_ACCESS_KEY_ID: env.r2AccessKeyId,
            R2_SECRET_ACCESS_KEY: env.r2SecretAccessKey,
            R2_BUCKET_NAME: env.r2BucketName,
            R2_PUBLIC_DOMAIN: env.r2PublicDomain,
            NEXTAUTH_URL: env.nextauthUrl,
            NEXT_PUBLIC_APP_URL: env.nextPublicAppUrl,
        };

        // Auto-generate NEXTAUTH_SECRET if missing
        if (!process.env.NEXTAUTH_SECRET) {
            envUpdates.NEXTAUTH_SECRET = generateNextAuthSecret();
        }

        const envSuccess = await updateEnv(envUpdates);
        
        // In read-only environments (like Vercel), updateEnv will fail.
        // We only throw if we don't already have critical vars in the system env.
        if (!envSuccess && !process.env.DATABASE_URL) {
            throw new Error("Failed to persist environment configuration and no system variables detected. Please set DATABASE_URL in your hosting provider's dashboard.");
        }

        if (!envSuccess) {
            console.warn("[INSTALLER_API] Could not write to .env, but continuing as system variables may be present.");
        }

        // 3. Clear potentially half-initialized data (Safety)
        // ... (existing logic)
        
        // 4. Create Admin User
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        const user = await db.user.create({
            data: {
                name: admin.name || "Administrator",
                email: admin.email,
                password: hashedPassword,
                role: "admin"
            }
        });

        // 5. Initialize Site Settings
        await db.siteSettings.upsert({
            where: { id: "main_settings" },
            update: {
                siteName: site.siteName,
                tagline: site.tagline || "Built with Next CMS",
                description: site.description || "A professional Next.js CMS",
                contactEmail: admin.email,
            },
            create: {
                id: "main_settings",
                siteName: site.siteName,
                tagline: site.tagline || "Built with Next CMS",
                description: site.description || "A professional Next.js CMS",
                contactEmail: admin.email,
                footerCopyright: `© ${new Date().getFullYear()} ${site.siteName}. All Rights Reserved.`
            }
        });

        // 6. Seed Content: Default Home Page (CredBuildPage)
        await db.credBuildPage.upsert({
            where: { path: "/" },
            update: {},
            create: {
                path: "/",
                title: "Home",
                description: "Welcome to your new website.",
                isPublished: true,
                useBuilder: true,
                data: {} 
            }
        });

        // 7. Seed Content: Default Menu
        const mainMenu = await db.menu.upsert({
            where: { slug: "main-menu" },
            update: {},
            create: {
                name: "Main Menu",
                slug: "main-menu"
            }
        });

        await db.menuItem.create({
            data: {
                menuId: mainMenu.id,
                label: "Home",
                url: "/",
                order: 0
            }
        });

        // 8. Seed Content: Hello World Post
        await db.post.create({
            data: {
                title: "Hello World!",
                slug: "hello-world",
                content: {
                    type: "doc",
                    content: [
                        {
                            type: "paragraph",
                            content: [{ type: "text", text: "Welcome to your new Next CMS blog. This is your first post!" }]
                        }
                    ]
                },
                published: true,
                authorId: user.id
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[INSTALLER_API] Critical Error:", error);
        return NextResponse.json({ 
            error: "Failed to initialize installation", 
            details: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}
