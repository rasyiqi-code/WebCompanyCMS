import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const res = NextResponse.next();

    if (req.method === "GET") {
      // Rewrite routes that match "/[...puckPath]/edit" to "/puck/[...puckPath]"
      if (req.nextUrl.pathname.endsWith("/edit")) {
        const pathWithoutEdit = req.nextUrl.pathname.slice(
          0,
          req.nextUrl.pathname.length - 5
        );
        const pathWithEditPrefix = `/puck${pathWithoutEdit}`;

        return NextResponse.rewrite(new URL(pathWithEditPrefix, req.url));
      }

      // Disable "/puck/[...puckPath]" if accessed directly (optional check)
      // if (req.nextUrl.pathname.startsWith("/puck")) {
      //   return NextResponse.redirect(new URL("/", req.url));
      // }
    }

    return res;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Protect Dashboard, Puck, and Edit routes
        if (
          path.startsWith("/dashboard") ||
          path.startsWith("/puck") ||
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
