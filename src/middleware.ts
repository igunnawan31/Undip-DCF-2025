import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import withAuth from "./middleware/withAuth";

const middleware = async (req: NextRequest, event: NextFetchEvent) => {
  // Middleware sederhana ini hanya meneruskan permintaan
  // Logika autentikasi akan ditangani di withAuth
  return NextResponse.next();
};

// Konfigurasi middleware dengan halaman yang memerlukan autentikasi
export default withAuth(middleware, [
  "/admin",  // Memerlukan peran admin
  "/dashboard"  // Memerlukan pengguna yang terautentikasi
]);

// Tentukan konfigurasi untuk next.js agar middleware bekerja pada path yang sesuai
export const config = {
  matcher: [
    // Jalankan middleware pada semua path yang perlu dilindungi
    '/admin/:path*',
    '/dashboard/:path*',
    // Jalankan juga pada path autentikasi untuk redirect pengguna terautentikasi
    '/auth/:path*',
    // Tambahkan public path yang perlu diakses tanpa autentikasi
    '/',
    '/about',
    '/contact',
  ],
};