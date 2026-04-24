import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'precision-grade-secret-key-2024',
);
const COOKIE_NAME = 'pg-auth-token';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public auth API routes
  if (
    pathname.startsWith('/api/auth/login') ||
    pathname.startsWith('/api/auth/logout')
  ) {
    return NextResponse.next();
  }

  // Redirect root to login
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;

  // Redirect authenticated users away from login
  if (pathname === '/login') {
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/dashboard', req.url));
      } catch {
        // Token invalid — let them reach the login page
      }
    }
    return NextResponse.next();
  }

  // Protect /dashboard and /api (except auth routes above)
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL('/login', req.url));
      res.cookies.delete(COOKIE_NAME);
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*', '/api/:path*'],
};
