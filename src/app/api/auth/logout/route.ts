import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/app/lib/jwt';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Berhasil logout' });

  // Atribut harus sama dengan saat cookie dibuat supaya browser benar-benar menghapusnya.
  response.cookies.set({
    name: SESSION_COOKIE,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
