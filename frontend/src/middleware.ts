import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("clinic_token")?.value;
  const { pathname } = request.nextUrl;
  const isDashboard = pathname.startsWith("/dashboard");
  // const isLogin = pathname.startsWith("/login");
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*"],
};
