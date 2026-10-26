// src/i18n/achievements.ts
// Penerjemah rule-based untuk baris prestasi member (memberData), supaya 400+ baris
// tidak perlu ditulis ulang. Hanya bagian kategori (sebelum " - ") yang diterjemahkan;
// nama event setelah " - " dibiarkan apa adanya karena merupakan nama diri.

import type { Language } from './dictionary';

const MEDAL: Record<string, string> = { Emas: 'Gold', Perak: 'Silver', Perunggu: 'Bronze' };

// Frasa dicocokkan lebih dulu daripada kata tunggal. Urutan penting.
const PHRASES: [RegExp, string][] = [
  [/\bBeregu Putra\b/g, "Men's Team"],
  [/\bBeregu Putri\b/g, "Women's Team"],
  [/\bBeregu Campuran\b/g, 'Mixed Team'],
  [/\bStandar Nasional\b/g, 'National Standard'],
  [/\bDivisi Nasional\b/g, 'National Division'],
];

const WORDS: Record<string, string> = {
  Kualifikasi: 'Qualification',
  Eliminasi: 'Elimination',
  Beregu: 'Team',
  Individu: 'Individual',
  Perorangan: 'Individual',
  Putra: 'Men',
  Putri: 'Women',
  Umum: 'Open',
  Campuran: 'Mixed',
  Nasional: 'National',
  Standar: 'Standard',
  Divisi: 'Division',
  Pelajar: 'Student',
  Mahasiswa: 'University',
  Pemula: 'Beginner',
  Lanjutan: 'Advanced',
  Bantalan: 'Target Mat',
  Aduan: 'Match',
  Sesi: 'Session',
  Kategori: 'Category',
  Peringkat: 'Rank',
  Mewakili: 'Representing',
  pada: 'at',
  SD: 'Elementary',
  SMP: 'Junior High',
  SMA: 'Senior High',
  SN: 'National Standard',
  Prestasi: 'Performance',
};

const WORD_PATTERN = new RegExp(`\\b(${Object.keys(WORDS).join('|')})\\b`, 'g');

function translateCategory(text: string): string {
  let out = text;

  // "Medali Emas, Perak, & Perunggu X" -> "Gold, Silver, & Bronze Medals X"
  out = out.replace(/Medali Emas, Perak, & Perunggu/g, 'Gold, Silver, & Bronze Medals');

  // "2 Medali Emas" -> "2 Gold Medals", "Medali Emas" -> "Gold Medal"
  out = out.replace(/(\d+) Medali (Emas|Perak|Perunggu)/g, (_, n: string, m: string) =>
    `${n} ${MEDAL[m]} Medal${Number(n) === 1 ? '' : 's'}`
  );
  out = out.replace(/Medali (Emas|Perak|Perunggu)/g, (_, m: string) => `${MEDAL[m]} Medal`);
  out = out.replace(/\((\d+) Medali\)/g, (_, n: string) => `(${n} Medal${Number(n) === 1 ? '' : 's'})`);

  for (const [pattern, replacement] of PHRASES) out = out.replace(pattern, replacement);
  return out.replace(WORD_PATTERN, (w) => WORDS[w]);
}

const cache = new Map<string, string>();

export function translateAchievement(text: string, lang: Language): string {
  if (lang === 'id') return text;

  const cached = cache.get(text);
  if (cached !== undefined) return cached;

  const sep = ' - ';
  const idx = text.indexOf(sep);
  const translated =
    idx === -1
      ? translateCategory(text)
      : translateCategory(text.slice(0, idx)) + text.slice(idx);

  cache.set(text, translated);
  return translated;
}
