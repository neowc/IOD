import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const pathname = req.nextUrl.pathname;

    // Protect routes that require authentication
    const protectedPaths = [
        '/',
        '/dashboard',
        '/profile',
        '/categories',
    ];

    // Check if the path is protected and user is not authenticated
    const isProtectedPath = protectedPaths.some(path =>
        pathname === path || pathname.startsWith(`${path}/`)
    );

    if (isProtectedPath && !token) {
        // Redirect to sign in page
        const url = new URL('/auth/signin', req.url);
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
    }

    // Redirect already authenticated users away from auth pages
    const authPaths = ['/auth/signin', '/auth/signup'];
    if (authPaths.includes(pathname) && token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

// Configure which routes to apply middleware to
export const config = {
    matcher: [
        /*
        * Match all request paths except:
        * - API routes that don't need auth (public API routes)
        * - Static files (assets, images, etc.)
        * - Favicon, manifest files, etc.
        */
        '/((?!api/public|_next/static|_next/image|favicon.ico).*)',
    ],
};