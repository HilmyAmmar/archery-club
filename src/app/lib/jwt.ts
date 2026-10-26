// src/app/lib/jwt.ts
// Satu-satunya tempat yang membaca JWT_SECRET. Sengaja TANPA nilai fallback: kalau env tidak diatur,
// semua autentikasi gagal tertutup (fail-closed) alih-alih memakai secret yang bisa ditebak.

export const SESSION_COOKIE = 'token';
export const SESSION_TTL_SECONDS = 60 * 60 * 24; // 24 jam, dipakai bersama oleh JWT dan cookie

const MIN_SECRET_LENGTH = 32;

export function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`JWT_SECRET wajib diatur dan minimal ${MIN_SECRET_LENGTH} karakter`);
  }
  return new TextEncoder().encode(secret);
}
