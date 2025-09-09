// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // A more modern, edge-compatible JWT library

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow the login page to be accessed without authentication
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // Check for the access token in cookies
  const accessToken = req.cookies.get('accessToken')?.value;

  if (!accessToken) {
    // If no token, redirect to the login page
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(accessToken, secret);
    
    // If token is valid, allow the request to continue
    return NextResponse.next();
  } catch (err) {
    // If token is invalid or expired, redirect to login
    console.error('JWT Verification Error:', err.message);
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('from', pathname); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }
}

// Define which paths the middleware should apply to
export const config = {
  matcher: '/admin/:path*',
};