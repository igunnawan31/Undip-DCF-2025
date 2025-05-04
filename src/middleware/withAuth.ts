import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

interface UserToken {
  role?: string;
}

const adminPaths = ["/admin"];
const authPaths = ["/auth/login", "/auth/register"];
const publicPaths = ["/", "/about", "/contact"];


export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    // Allow public paths
    if (publicPaths.some(path => pathname.startsWith(path))) {
      return middleware(req, event);
    }

    // Block all non-public paths for unauthorized users
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET  // Fixed typo: was MEXTAUTH_SECRET
    }) as UserToken;

    if (!token) {
      if (authPaths.some(path => pathname.startsWith(path))) {
        return middleware(req, event);
      }
      const url = new URL("/auth/login", req.url);
      url.searchParams.set("callbackUrl", encodeURIComponent(req.url));  // Fixed: was encodeURLComponent
      return NextResponse.redirect(url);
    }

    // Redirect logged-in users away from auth pages
    if (authPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Admin path protection
    if (adminPaths.some(path => pathname.startsWith(path))) {
      if (token.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return middleware(req, event);
  };
}