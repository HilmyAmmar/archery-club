// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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
    { name: 'Home', href: '#home' },
    { name: 'Prestasi', href: '#prestasi' },
    { name: 'Coach', href: '#coach' },
    { name: 'Member', href: '#member' },
    { name: 'Galeri', href: '#galeri' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#000b3d]/95 backdrop-blur-sm shadow-xl py-2' 
          : 'bg-transparent pt-4 pb-1'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo Section */}
          <Link href="#home" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
              <Image 
                src="/logo.png" 
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

          {/* Navigation Links & CTA Button */}
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
              href="#pricing" 
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2 rounded-lg text-[13px] font-black shadow-lg shadow-orange-600/20 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-white p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}