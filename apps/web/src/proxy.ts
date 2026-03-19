import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/logout", "/login", "/verify", "/confirm-invite"];

export function proxy(request: NextRequest) {
    const sessionToken = request.cookies.get("session_token")?.value;

    const { pathname } = request.nextUrl;

    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
    const isLogoutRoute = pathname === "/logout";

    // Redirect authenticated users away from public routes (e.g. /login → /)
    if (isPublicRoute && !isLogoutRoute && sessionToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-current-path", pathname);

    return NextResponse.next({
        request: { headers: requestHeaders },
    });
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
