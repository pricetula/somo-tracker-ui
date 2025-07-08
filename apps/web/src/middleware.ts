import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE } from '@/shared/lib/constants';

// Define public routes (routes that don't require authentication)
const publicPaths = ['/signin', '/signup', '/verify'];

export function middleware(request: NextRequest) {
    // Get the auth cookie
    const authCookie = request.cookies.get(COOKIE.AUTH);

    // check if route is public
    const isPublicPath = publicPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    );

    // If user is authenticated and trying to access public routes
    if (authCookie && isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    // If user is not authenticated and trying to access protected route, redirect them to signin page
    else if (!authCookie && !isPublicPath) {
        const signinUrl = new URL('/signin', request.url);
        // Optional: Add redirect parameter to return after signin
        signinUrl.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(signinUrl);
    }

    // If user is authenticated and trying to access protected route, continue with the request
    // Add the pathname to the request headers for later use in the application
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-pathname', request.nextUrl.pathname)

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|xml|txt|jpg|jpeg|gif|webp)$).*)',
    ],
}

