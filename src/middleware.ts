import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from '@/app/lib/auth';
import { SESSION_COOKIE } from '@/app/lib/jwt';

// Satu-satunya endpoint API yang boleh diakses tanpa sesi.
const PUBLIC_API_PATHS = new Set(['/api/auth/login', '/api/auth/logout']);
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  // ==========================================================================
  // API: DEFAULT-DENY. Setiap route di /api/* wajib punya sesi valid, kecuali login & logout.
  // Route baru otomatis terlindungi tanpa perlu ingat menambahkan pengecekan.
  // ==========================================================================
  if (pathname.startsWith('/api/')) {
    // Perlindungan CSRF: request yang mengubah data harus berasal dari origin yang sama.
    if (!SAFE_METHODS.has(request.method)) {
      const origin = request.headers.get('origin');
      if (origin) {
        let originHost = '';
        try { originHost = new URL(origin).host; } catch { /* origin rusak -> ditolak di bawah */ }
        if (originHost !== request.nextUrl.host) {
          return NextResponse.json({ success: false, message: 'Origin tidak diizinkan' }, { status: 403 });
        }
      }
    }

    if (PUBLIC_API_PATHS.has(pathname)) return NextResponse.next();

    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Sesi tidak valid. Silakan login kembali.' },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // ==========================================================================
  // Halaman /admin
  // ==========================================================================
  const isAuthPage = pathname === '/admin';
  const isProtectedRoute = pathname.startsWith('/admin') && !isAuthPage;

  // Handle access to protected routes
  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login (/admin) if no token is found
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    if (await verifySessionToken(token)) {
      return NextResponse.next();
    }

    // Clear the invalid token and redirect to login (/admin)
    const response = NextResponse.redirect(new URL('/admin', request.url));
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  // Handle access to the authentication page
  if (isAuthPage && token && (await verifySessionToken(token))) {
    // Redirect to dashboard if the user is already authenticated
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Allow requests to public routes
  return NextResponse.next();
}

// Lindungi halaman admin DAN seluruh API
export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
