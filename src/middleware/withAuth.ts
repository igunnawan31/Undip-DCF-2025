import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const onlyAdmin = ["/admin"];
const authPage = ["/"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1]; // Mendapatkan path root
    console.log(pathname);

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // Jika tidak ada token, arahkan ke login atau sign-up
      if (!token) {
        const isLoginPage = pathname === "auth/login";
        const redirectUrl = isLoginPage
          ? "/auth/register"
          : "/auth/login"; // Redirect ke signup jika login belum berhasil

        const url = new URL(redirectUrl, req.url);
        url.searchParams.set("callbackurl", encodeURIComponent(req.url));
        return NextResponse.redirect(url);
      }

      // Jika token ada, cek halaman yang diakses
      if (token) {
        
        // Jika pengguna mencoba mengakses halaman login tetapi sudah login, arahkan ke home
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }

        // Jika pengguna bukan admin dan mencoba mengakses halaman admin, arahkan ke home
        if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }

    return middleware(req, next);
  };
}
