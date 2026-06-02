// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("clinic_token")?.value;

//   const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
//   const isLoginRoute = request.nextUrl.pathname === "/login";

//   // منع الوصول للداشبورد بدون تسجيل دخول
//   if (isDashboardRoute && !token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // لو المستخدم مسجل دخول بالفعل ومنتقل للوجين
//   if (isLoginRoute && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/login"],
// };

import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
