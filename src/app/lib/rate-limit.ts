// src/app/lib/rate-limit.ts
// Pembatas percobaan login berbasis memori.
//
// BATASAN: state hidup per instance server. Di hosting serverless (banyak instance) batasnya hanya
// berlaku per instance, jadi ini memperlambat brute force tapi belum menutupnya total. Untuk perlindungan
// penuh, ganti penyimpanan ke Redis/Upstash atau tabel database (antarmuka fungsi di bawah tetap sama).

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();
const MAX_ENTRIES = 5000;

function prune(now: number) {
  if (store.size < MAX_ENTRIES) return;
  for (const [key, entry] of store) if (entry.resetAt <= now) store.delete(key);
}

/** Cek tanpa menambah hitungan: apakah key sudah mencapai batas dalam jendela waktu ini? */
export function checkBlocked(key: string, limit: number): { blocked: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) return { blocked: false, retryAfterSec: 0 };
  return { blocked: entry.count >= limit, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
}

/** Catat satu kegagalan. Jendela dimulai saat kegagalan pertama. */
export function recordFailure(key: string, windowMs: number) {
  const now = Date.now();
  prune(now);
  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) store.set(key, { count: 1, resetAt: now + windowMs });
  else entry.count += 1;
}

export function resetFailures(key: string) {
  store.delete(key);
}

/** Hanya untuk pengujian. */
export function _clearAll() {
  store.clear();
}
