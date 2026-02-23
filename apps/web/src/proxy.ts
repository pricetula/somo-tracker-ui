import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest): NextResponse | undefined {
  const sessionToken = request.cookies.get("session_token");

  // 1. Handle Redirect Logic
  if (!sessionToken?.value) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  // 2. Inject the Pathname into Headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-current-path", request.nextUrl.pathname);

  // 3. Return NextResponse.next with the updated headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/institute/:path*"],
};