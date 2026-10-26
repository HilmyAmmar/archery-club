// src/i18n/LanguageProvider.tsx
'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
import { DEFAULT_LANGUAGE, dictionaries, LANGUAGES, type Dictionary, type Language } from './dictionary';

const STORAGE_KEY = 'lang';
const CHANGE_EVENT = 'languagechange';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (LANGUAGES as string[]).includes(stored)) return stored as Language;
  } catch {
    // localStorage bisa diblokir (mode privat, dll.) -> pakai bahasa default
  }
  return DEFAULT_LANGUAGE;
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Server & render hidrasi pertama selalu pakai bahasa default, lalu sinkron ke pilihan tersimpan.
  const lang = useSyncExternalStore(subscribe, readStoredLanguage, () => DEFAULT_LANGUAGE);

  const setLang = useCallback((next: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // abaikan; perubahan tetap berlaku untuk sesi ini lewat event di bawah
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage harus dipakai di dalam <LanguageProvider>');
  return ctx;
}
