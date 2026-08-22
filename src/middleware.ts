import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/reglamento") {
    const referer = request.headers.get("referer") || "";
    if (referer.includes("/registro")) {
      const url = request.nextUrl.clone();
      url.pathname = "/bienvenido-campamento";
      return NextResponse.redirect(url);
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/admin/:path*", "/reglamento"],
};
