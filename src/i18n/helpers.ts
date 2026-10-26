// src/i18n/helpers.ts
import type { Language } from './dictionary';
import { MONTH_NAMES_EN } from './admin';

export const localeFor = (lang: Language) => (lang === 'en' ? 'en-US' : 'id-ID');

/** Ambil label tampilan dari peta; kalau tidak ada, pakai nilai aslinya (data lama / kategori custom). */
export const labelOf = (map: Record<string, string>, value: string | null | undefined) =>
  value ? map[value] ?? value : '';

/** Nama bulan dari database (Indonesia) -> bahasa aktif. */
export const monthNameFor = (lang: Language, indonesianName: string | undefined) =>
  !indonesianName ? '' : lang === 'en' ? MONTH_NAMES_EN[indonesianName] ?? indonesianName : indonesianName;

/** Daftar 12 nama bulan sesuai bahasa aktif (index 0 = Januari). */
export const monthList = (lang: Language) =>
  Array.from({ length: 12 }, (_, i) => new Date(2000, i, 1).toLocaleString(localeFor(lang), { month: 'long' }));
