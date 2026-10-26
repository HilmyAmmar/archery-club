import { loginAdmin } from '@/services/auth.service';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE, SESSION_TTL_SECONDS } from '@/app/lib/jwt';
import { checkBlocked, recordFailure, resetFailures } from '@/app/lib/rate-limit';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_ACCOUNT = 5;  // per kombinasi IP + username
const MAX_FAILURES_PER_IP = 20;      // per IP, semua username

const INVALID_CREDENTIALS = 'Username atau password salah';

function clientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    return forwarded || request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: Request) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ message: 'Permintaan tidak valid' }, { status: 400 });
    }

    const { username, password } = (body ?? {}) as Record<string, unknown>;
    if (
        typeof username !== 'string' || typeof password !== 'string' ||
        !username.trim() || !password ||
        username.length > 100 || password.length > 200
    ) {
        return NextResponse.json({ message: 'Username dan password wajib diisi' }, { status: 400 });
    }

    const user = username.trim();
    const ip = clientIp(request);
    const accountKey = `acct:${ip}|${user.toLowerCase()}`;
    const ipKey = `ip:${ip}`;

    const limited = [checkBlocked(accountKey, MAX_FAILURES_PER_ACCOUNT), checkBlocked(ipKey, MAX_FAILURES_PER_IP)]
        .find((r) => r.blocked);
    if (limited) {
        console.warn(`[auth] login diblokir sementara ip=${ip} user=${user.slice(0, 30)}`);
        return NextResponse.json(
            { message: 'Terlalu banyak percobaan login. Coba lagi beberapa menit lagi.' },
            { status: 429, headers: { 'Retry-After': String(limited.retryAfterSec) } }
        );
    }

    let result;
    try {
        result = await loginAdmin(user, password);
    } catch {
        // Kegagalan sistem bukan kesalahan pengguna: tidak dihitung sebagai percobaan gagal.
        return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
    }

    if (!result) {
        recordFailure(accountKey, WINDOW_MS);
        recordFailure(ipKey, WINDOW_MS);
        console.warn(`[auth] login gagal ip=${ip} user=${user.slice(0, 30)}`);
        return NextResponse.json({ message: INVALID_CREDENTIALS }, { status: 401 });
    }

    resetFailures(accountKey);

    // Token HANYA dikirim lewat cookie httpOnly; tidak ada di body, jadi tidak bisa dibaca JavaScript.
    const response = NextResponse.json({ message: 'Login Berhasil', user: result.user });
    response.cookies.set({
        name: SESSION_COOKIE,
        value: result.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: SESSION_TTL_SECONDS,
    });

    return response;
}
