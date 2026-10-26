'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useLanguage } from '@/i18n/LanguageProvider';
import LanguageSwitcher from '@/i18n/LanguageSwitcher';

export default function AdminLogin() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  // Versi lama menyimpan token di localStorage (bisa dicuri lewat XSS). Sesi kini hanya di cookie httpOnly.
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.admin.login.failed);
      }

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      router.push('/admin/dashboard');
      router.refresh();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b1121] font-sans selection:bg-blue-500/30 relative">
      <div className="absolute top-5 right-5">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md px-6 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        
        <img src="/favicon.ico" alt="FAST Logo" className="w-20 h-20 object-contain mb-8" />
        <h1 className="text-[1.75rem] font-bold text-white mb-2 tracking-tight">{t.admin.login.title}</h1>
        <p className="text-blue-100/60 text-[15px] mb-8">{t.admin.login.subtitle}</p>

        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
          >
            {t.admin.login.signIn}
          </button>
        ) : (
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl text-left font-medium">
                {error}
              </div>
            )}

            <div className="flex flex-col text-left gap-1.5">
              <label className="text-sm font-medium text-white/70 ml-1">{t.admin.login.username}</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.admin.login.username}
                autoComplete="username"
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#2563eb] focus:bg-white/10 transition-all shadow-inner disabled:opacity-50"
                required
              />
            </div>

            <div className="flex flex-col text-left gap-1.5">
              <label className="text-sm font-medium text-white/70 ml-1">{t.admin.login.password}</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                autoComplete="current-password"
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#2563eb] focus:bg-white/10 transition-all shadow-inner disabled:opacity-50"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3.5 rounded-xl font-bold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] mt-2 active:scale-[0.98] disabled:bg-blue-800 disabled:cursor-not-allowed"
            >
              {isLoading ? t.admin.login.checking : t.admin.login.submit}
            </button>

            <button 
              type="button"
              disabled={isLoading}
              onClick={() => {
                setShowForm(false);
                setError('');
                setUsername('');
                setPassword('');
              }}
              className="text-white/40 hover:text-white/80 text-sm font-medium transition-colors disabled:opacity-50"
            >
              {t.admin.login.cancel}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}