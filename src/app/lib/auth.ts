// src/app/lib/auth.ts
// Verifikasi sesi admin. Tidak mengimpor Supabase supaya aman dipakai di middleware (Edge runtime).
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { getJwtSecret, SESSION_COOKIE } from './jwt';

export interface AdminSession {
  id: string | number;
  username: string;
  name: string;
  role: string;
}

export function readCookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1 || part.slice(0, idx).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(idx + 1).trim());
    } catch {
      return undefined;
    }
  }
  return undefined;
}

/** Mengembalikan sesi kalau token valid (tanda tangan, algoritma HS256, belum kedaluwarsa); selain itu null. */
export async function verifySessionToken(token: string | undefined | null): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getJwtSecret(), { algorithms: ['HS256'] });
    if (typeof payload.username !== 'string' || typeof payload.name !== 'string') return null;
    return {
      id: payload.id as string | number,
      username: payload.username,
      name: payload.name,
      role: typeof payload.role === 'string' ? payload.role : 'admin',
    };
  } catch (error) {
    // Konfigurasi salah harus terlihat di log server, tapi tetap gagal tertutup (tidak ada akses).
    if (error instanceof Error && error.message.includes('JWT_SECRET')) {
      console.error('[auth]', error.message);
    }
    return null;
  }
}

export async function getAdminSession(request: Request): Promise<AdminSession | null> {
  return verifySessionToken(readCookie(request.headers.get('cookie'), SESSION_COOKIE));
}

/**
 * Pagar di dalam tiap route handler (lapis kedua setelah default-deny di middleware).
 * Pemakaian:  const auth = await requireAdmin(request);  if ('error' in auth) return auth.error;
 */
export async function requireAdmin(
  request: Request
): Promise<{ admin: AdminSession } | { error: NextResponse }> {
  const admin = await getAdminSession(request);
  if (!admin) {
    return {
      error: NextResponse.json(
        { success: false, message: 'Sesi tidak valid. Silakan login kembali.' },
        { status: 401 }
      ),
    };
  }
  return { admin };
}
