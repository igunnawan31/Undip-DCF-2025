import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import withAuth from "./middleware/withAuth";

const middleware = async (req: NextRequest, event: NextFetchEvent) => {
  return NextResponse.next();
};

// Konfigurasi middleware dengan halaman yang memerlukan autentikasi
export default withAuth(middleware, ["/admin", "/dashboard"]);
