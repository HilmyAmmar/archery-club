import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Initialize the JWT secret key for verification
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'secret-key-for-jwt'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Define route categories
  const isAuthPage = pathname === '/admin';
  const isProtectedRoute = pathname.startsWith('/admin') && !isAuthPage;

  // Handle access to protected routes
  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login (/admin) if no token is found
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      // Verify the JWT token
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Clear the invalid token and redirect to login (/admin)
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  // Handle access to the authentication page
  if (isAuthPage && token) {
    try {
      // Redirect to dashboard if the user is already authenticated
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch (error) {
      // Proceed to login page if the existing token is invalid
      return NextResponse.next();
    }
  }

  // Allow requests to public routes
  return NextResponse.next();
}

// Restrict middleware execution to /admin paths
export const config = {
  matcher: ['/admin/:path*'],
};