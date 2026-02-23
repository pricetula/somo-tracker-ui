import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest): NextResponse | undefined {
  const sessionToken = request.cookies.get("session_token");

  if (!sessionToken?.value) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  return undefined;
}

export const config = {
  matcher: ["/institute/:path*"],
};
