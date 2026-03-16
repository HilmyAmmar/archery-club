// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; 
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: isHome ? '#home' : '/#home' },
    { name: 'Prestasi', href: isHome ? '#prestasi' : '/#prestasi' },
    { name: 'Coach', href: isHome ? '#coach' : '/#coach' },
    { name: 'Member', href: isHome ? '#member' : '/#member' },
    { name: 'Galeri', href: isHome ? '#galeri' : '/#galeri' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-[#000b3d]/95 backdrop-blur-sm shadow-xl py-2' 
          : 'bg-transparent pt-4 pb-1'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex items-center justify-between h-14">
          
          {/* --- Logo Section --- */}
          <Link href={isHome ? '#home' : '/#home'} className="flex items-center gap-2.5 group relative z-50">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
              <Image 
                src="/favicon.ico" 
                alt="FAST Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-white font-black text-xl tracking-widest leading-none">FAST</h1>
              <span className="text-[#d97706] text-[8px] font-bold tracking-[0.2em] uppercase mt-1 transition-colors group-hover:text-orange-400">
                Focus Archery Sport Team
              </span>
            </div>
          </Link>

          {/* --- Navigation Links & CTA Button (Desktop) --- */}
          <div className="hidden md:flex items-center gap-7">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white text-[13px] font-bold tracking-wide transition-all hover:translate-y-[-1px]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <Link 
              href={isHome ? '#pricing' : '/#pricing'} 
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2 rounded-lg text-[13px] font-black shadow-lg shadow-orange-600/20 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="md:hidden flex items-center relative z-50">
            <button 
              className="text-white p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#000b3d]/95 backdrop-blur-md border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out shadow-2xl ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="flex flex-col items-center gap-5 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-gray-300 hover:text-white text-base font-bold tracking-wide transition-all w-full text-center py-2 border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href={isHome ? '#pricing' : '/#pricing'} 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-3.5 rounded-xl text-sm font-black shadow-lg shadow-orange-600/20 mt-2"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </nav>
  );
}