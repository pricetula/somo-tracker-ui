"use server"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    const publicPaths = ["/signin", "/signup"]

    const isPublic = publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))

    if (!isPublic && !session?.user?.id) {
        const loginUrl = new URL("/signin", req.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    runtime: "nodejs",
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
}
