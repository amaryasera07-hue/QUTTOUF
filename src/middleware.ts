import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    let user = null;

    if (session) {
        try {
            const payload = await decrypt(session);
            user = payload.user;
        } catch (error) {
            // Invalid session
        }
    }

    // Admin Route Protection
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user || user.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Member Route Protection (e.g. PDF downloads if we had a specific route, or profile)
    // For now, we'll check PDF access in the component or a specific API route if needed.
    // But let's say we want to protect a member profile page if we had one.

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/profile/:path*'],
};
