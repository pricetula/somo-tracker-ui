import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE } from '@/shared/lib/constants';

// Define public routes (routes that don't require authentication)
const publicPaths = ['/signin', '/signup', '/verify'];

// export function proxy(request: NextRequest) {
//     // Get the auth cookie
//     const authCookie = request.cookies.get(COOKIE.AUTH);

//     // check if route is public
//     const isPublicPath = publicPaths.some(path =>
//         request.nextUrl.pathname.startsWith(path)
//     );

//     // If user is authenticated and trying to access public routes
//     if (authCookie && isPublicPath) {
//         return NextResponse.redirect(new URL('/', request.url));
//     }
//     // If user is not authenticated and trying to access protected route, redirect them to signin page
//     else if (!authCookie && !isPublicPath) {
//         const signinUrl = new URL('/signin', request.url);
//         // Optional: Add redirect parameter to return after signin
//         signinUrl.searchParams.set('redirect', request.nextUrl.pathname);
//         return NextResponse.redirect(signinUrl);
//     }

//     // If user is authenticated and trying to access protected route, continue with the request
//     // Add the pathname to the request headers for later use in the application
//     const requestHeaders = new Headers(request.headers)
//     requestHeaders.set('x-pathname', request.nextUrl.pathname)

//     return NextResponse.next({
//         request: {
//             headers: requestHeaders,
//         },
//     });
// }

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionToken = request.cookies.get('stytch_session_jwt')?.value;

    // 1. Is public routes
    const isPublicPath = publicPaths.some((path) =>
        pathname.startsWith(path)
    );

    // 2. Optimistic Auth Check: If no cookie on a protected route, redirect to login
    if (!isPublicPath && !sessionToken) {
        const loginUrl = new URL('/signin', request.url);
        // Optional: save the current path to redirect back after login
        loginUrl.searchParams.set('return_to', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 4. API Forwarding: If request is for /api/*, forward to Go Backend
    if (pathname.startsWith('/api')) {
        const requestHeaders = new Headers(request.headers);

        requestHeaders.set('Authorization', `Bearer ${sessionToken}`);

        // 4. Set the backend destination (Go Fiber)
        const backendUrl = new URL(
            pathname.replace(/^\/api/, '/api/v1'),
            'http://localhost:3030'
        );
        backendUrl.search = request.nextUrl.search;

        // 5. Rewrite with the NEW headers
        return NextResponse.rewrite(backendUrl, {
            request: {
                headers: requestHeaders,
            },
        });
    }

    return NextResponse.next();
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

