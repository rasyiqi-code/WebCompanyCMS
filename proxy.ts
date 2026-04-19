import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function proxy(req) {
        const { pathname } = req.nextUrl;

        // 1. Check Installation Status
        if (pathname.startsWith("/installer")) {
            try {
                // If we are on installer, check if we SHOULD be here
                const statusRes = await fetch(`${req.nextUrl.origin}/api/settings`);
                if (statusRes.ok) {
                    // Application is ALREADY installed, send to dashboard or home
                    return NextResponse.redirect(new URL("/dashboard", req.url));
                }
            } catch (e) {
                // Settings failed, safe to stay on installer
            }
        } else if (!pathname.startsWith("/api/install")) {
            // Protect everything else if NOT installed
            try {
                const statusRes = await fetch(`${req.nextUrl.origin}/api/settings`);
                if (!statusRes.ok) {
                    return NextResponse.redirect(new URL("/installer", req.url));
                }
            } catch (err) {
                console.error("[PROXY] Install check failed:", err);
            }
        }

        const res = NextResponse.next();

        if (req.method === "GET") {
            // Rewrite routes that match "/[...credbuildPath]/edit" to "/credbuild/[...credbuildPath]"
            if (req.nextUrl.pathname.endsWith("/edit")) {
                const pathWithoutEdit = req.nextUrl.pathname.slice(
                    0,
                    req.nextUrl.pathname.length - 5
                );
                const pathWithEditPrefix = `/credbuild${pathWithoutEdit}`;

                return NextResponse.rewrite(new URL(pathWithEditPrefix, req.url));
            }

            // Disable "/credbuild/[...credbuildPath]" if accessed directly (optional check)
            // if (req.nextUrl.pathname.startsWith("/credbuild")) {
            //   return NextResponse.redirect(new URL("/", req.url));
            // }
        }

        return res;
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;

                // Protect Dashboard, CredBuild, and Edit routes
                if (
                    path.startsWith("/dashboard") ||
                    path.startsWith("/credbuild") ||
                    path.endsWith("/edit")
                ) {
                    return !!token;
                }

                // Allow public access to other routes
                return true;
            },
        },
        pages: {
            signIn: "/login",
        },
    }
);

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
