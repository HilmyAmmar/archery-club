// src/components/sections/Hero.tsx
'use client'; 
import { useState, useEffect } from 'react';

export default function Hero() {
  const ADMIN_WHATSAPP = '6281188037673';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1a3680]">
      
      {/* 1. Base Image */}
      <div className="absolute inset-0 bg-[url('/bg-hero.jpg')] bg-cover bg-[center_top_10%] md:bg-[center_top_20%]" />
      
      {/* 2. Blue Filter Overlay */}
      <div className="absolute inset-0 bg-[#1a3680] opacity-65 mix-blend-multiply" />
      
      {/* 3. Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* 4. Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-[20vh] md:h-[35vh] bg-gradient-to-t from-[#eab308] via-[#eab308]/80 via-15% md:via-30% to-transparent z-10 translate-y-[1px]" />

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center text-center w-full px-4 max-w-5xl">
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-[4.5rem] font-extrabold text-white mb-5 leading-[1.1] tracking-tight">
          Fokus, Bidik, <span className="relative inline-block pb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
              dan Juara
            </span>
            <span className="absolute left-0 bottom-0 w-full h-[5px] bg-gradient-to-r from-yellow-400 to-red-500 rounded-full opacity-90"></span>
          </span> <br />
          Bersama <span className="text-[#60a5fa]">FAST</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-blue-50 text-base md:text-lg max-w-3xl mb-12 font-medium leading-relaxed drop-shadow-sm">
          Menjadikan memanah sebagai budaya kebanggaan Bangsa. Kami hadir untuk memasyarakatkan, memberikan pelatihan terbaik, serta mencetak atlet pemanah yang handal dan profesional.
        </p>

        {/* Action Buttons - PERUBAHAN DI SINI: mb-16 diubah jadi mb-8 md:mb-16 biar di HP lebih rapet */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-16">
          <a href={`https://wa.me/${ADMIN_WHATSAPP}`} target="_blank" rel="noreferrer" className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-7 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-green-500/20 text-sm">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            Chat WA: Konsultasi & Daftar
          </a>
          <a href="#prestasi" className="border border-white/20 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-semibold transition-all backdrop-blur-sm flex items-center justify-center text-sm min-w-[200px]">
            Lihat Prestasi Kami
          </a>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3 sm:gap-8 md:gap-32 w-full max-w-3xl relative z-30">
          <div className="text-center">
            <div className="text-[2.2rem] md:text-[3rem] font-black text-[#fbbf24] mb-1 drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]">50+</div>
            <div className="text-white text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Juara Umum</div>
          </div>
          <div className="text-center">
            <div className="text-[2.2rem] md:text-[3rem] font-black text-[#60a5fa] mb-1 drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]">50+</div>
            <div className="text-white text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Member Aktif</div>
          </div>
          <div className="text-center">
            <div className="text-[2.2rem] md:text-[3rem] font-black text-[#f97316] mb-1 drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]">10+</div>
            <div className="text-white text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Tahun Berdiri</div>
          </div>
        </div>

      </div>

      {/* Down Arrow - Dengan Animasi Menghilang Saat di-Scroll */}
      <div 
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 z-30 transition-all duration-500 ease-in-out
        ${isScrolled ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 animate-bounce'}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>

    </section>
  );
}