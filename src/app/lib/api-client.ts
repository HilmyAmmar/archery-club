// src/app/lib/api-client.ts
// fetch untuk API admin dari browser. Sesi dibawa otomatis lewat cookie httpOnly (tidak ada token di JS).
// Kalau server menjawab 401 (sesi habis / tidak valid), arahkan ke halaman login.

export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const res = await fetch(input, { credentials: 'same-origin', ...init });
  if (res.status === 401 && typeof window !== 'undefined' && window.location.pathname !== '/admin') {
    window.location.assign('/admin');
  }
  return res;
}
