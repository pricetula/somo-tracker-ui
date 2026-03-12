import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/logout", "/login", "/verify", "/confirm-invite"];

export function proxy(request: NextRequest) {
    const sessionToken = request.cookies.get("session_token")?.value;

    const { pathname } = request.nextUrl;

    const isPublicRoutes = publicRoutes.some(
        (route) => pathname.startsWith(route) && pathname !== "/"
    );
    const isLogoutRoute = pathname === "/logout";

    if (!isPublicRoutes && !sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isPublicRoutes && !isLogoutRoute && sessionToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-current-path", pathname);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
