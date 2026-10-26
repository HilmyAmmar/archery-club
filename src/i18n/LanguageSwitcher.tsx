// src/i18n/LanguageSwitcher.tsx
'use client';

import { LANGUAGES } from './dictionary';
import { useLanguage } from './LanguageProvider';

export default function LanguageSwitcher({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const { lang, setLang, t } = useLanguage();
  const light = tone === 'light';

  return (
    <div
      role="group"
      aria-label={t.nav.switchLanguage}
      className={`inline-flex items-center rounded-lg border p-0.5 ${light ? 'border-slate-200 bg-slate-50' : 'border-white/20 bg-white/5'} ${className}`}
    >
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2.5 py-1 rounded-md text-[11px] font-black tracking-wider uppercase transition-colors ${
            lang === code ? 'bg-[#eab308] text-[#000b3d]' : light ? 'text-slate-500 hover:text-slate-800' : 'text-gray-300 hover:text-white'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
