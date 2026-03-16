// src/app/atlet/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer';
import { membersData } from '@/data/memberData';

function MemberGallery({ images }: { images: string[] }) {
  const [imgIndex, setImgIndex] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full aspect-square shrink-0 bg-[#1a234f] flex items-center justify-center group overflow-hidden">
      {images.map((img, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 bg-cover bg-top ${
            idx === imgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1a234f] via-[#1a234f]/60 to-transparent z-20 pointer-events-none"></div>

      {images.length > 1 && (
        <>
          <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30">
            {images.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === imgIndex ? 'w-4 bg-[#eab308]' : 'w-1.5 bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function AtletPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = membersData.filter((member) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return member.name.toLowerCase().includes(lowerCaseQuery) || 
           member.achievements.some(achieve => achieve.toLowerCase().includes(lowerCaseQuery));
  });

  return (
    // REVISI GRADIENT: Biru Navbar (#000b3d) -> Oren (#e65c00) -> Kuning (#eab308) -> Merah (#8b1812)
    <div className="flex flex-col min-h-screen text-white selection:bg-[#eab308] selection:text-[#000b3d] bg-[linear-gradient(to_bottom,#000b3d_0%,#e65c00_45%,#eab308_75%,#8b1812_100%)]">
      
      <Navbar />

      <main className="flex-grow relative z-10 pt-28 pb-20 px-4">
        
        {/* Pattern Grid Tipis biar teksturnya kaya di landing page */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto mt-4 md:mt-10 relative z-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col items-start text-left">
              {/* Balik ke versi elegan tanpa background karena warnanya udah biru gelap */}
              <Link href="/" className="group flex items-center gap-2 text-white/60 hover:text-[#eab308] text-sm font-semibold transition-colors mb-6">
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Beranda
              </Link>
              
              <div className="border border-[#eab308]/30 bg-[#eab308]/10 text-[#eab308] px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] mb-4 uppercase">
                Hall of Fame
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3 drop-shadow-md">
                Daftar <span className="text-[#eab308]">Atlet Fast</span>
              </h1>
              <p className="text-white/80 text-sm md:text-base font-medium max-w-xl">
                Seluruh rekam jejak atlet kebanggaan FAST yang telah mengharumkan nama klub.
              </p>
            </div>

            <div className="relative w-full md:w-[350px] shrink-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Cari nama atau event..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // Search bar balikin ke versi transparan
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#eab308] transition-all backdrop-blur-sm"
              />
            </div>
          </div>

          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {filteredMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="flex flex-col rounded-[1.5rem] overflow-hidden border border-white/10 bg-[#1a234f] hover:border-[#eab308]/50 hover:shadow-[0_10px_40px_rgba(234,179,8,0.2)] hover:-translate-y-1 transition-all duration-300 group"
                >
                  <MemberGallery images={member.images} />
                  
                  <div className="p-6 pt-2 flex flex-col flex-grow h-[260px] relative z-30 bg-[#1a234f]">
                    <h4 className="font-black text-2xl text-white mb-4 shrink-0 border-b border-white/5 pb-4 group-hover:text-[#eab308] transition-colors">
                      {member.name}
                    </h4>
                    <div className="flex flex-col gap-3 flex-grow overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
                      {member.achievements.map((achieve, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#eab308]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582c.277.11.464.395.464.716v4.3c0 1.944-1.121 3.655-2.822 4.457l-.596.28v1.842a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1.842l-.596-.28A5.002 5.002 0 015 10.92V6.621c0-.321.187-.606.464-.716L9 4.323V3a1 1 0 011-1zm-1 3.323L5.954 6.54l3.046 1.218 3.046-1.218L9 5.323z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[13px] font-medium text-white/80 leading-relaxed">{achieve}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-[2rem] border border-dashed border-white/20">
              <p className="text-white/60 font-medium">Hasil tidak ditemukan.</p>
            </div>
          )}
        </div>
      </main>

      <div className="relative w-full overflow-hidden leading-none z-0 translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-[#0f172a]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.72,201,110.15c61.4-9.2,118.2-31,175-53.71Z"></path>
        </svg>
      </div>

      <Footer />

    </div>
  );
}