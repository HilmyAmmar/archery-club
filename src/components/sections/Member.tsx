'use client';

import { useState } from 'react';
import Link from 'next/link';
import { membersData } from '@/data/memberData';

// --- SUB-KOMPONEN UNTUK GALERI FOTO ---
function MemberGallery({ images, isCenter }: { images: string[], isCenter: boolean }) {
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
    <div className="relative w-full h-[220px] shrink-0 bg-[#1a234f] flex items-center justify-center group overflow-hidden">
      
      {images.map((img, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 bg-cover bg-top ${
            idx === imgIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      
      {isCenter && (
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0f173b] via-[#0f173b]/60 to-transparent z-20 pointer-events-none transition-opacity duration-500"></div>
      )}
      {!isCenter && <div className="absolute inset-0 bg-[#000b3d]/70 z-20 pointer-events-none transition-opacity duration-500"></div>}

      {isCenter && (
        <div className="absolute top-4 right-4 text-[#eab308] bg-black/30 p-2 rounded-full backdrop-blur-md z-30 pointer-events-none transition-all duration-500 animate-in fade-in zoom-in">
          <svg className="w-5 h-5 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      )}

      {isCenter && images.length > 1 && (
        <>
          <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 transition-opacity duration-500 animate-in fade-in slide-in-from-bottom-2">
            {images.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === imgIndex ? 'w-4 bg-[#eab308]' : 'w-1.5 bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// --- KOMPONEN UTAMA MEMBER ---
export default function Member() {
  
  const topThreeMembers = membersData.slice(0, 3);
  
  const carouselData = [
    ...topThreeMembers,
    {
      id: 'cta-card',
      isCTA: true,
      name: '',
      achievements: [],
      images: [], 
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < carouselData.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const getVisibleMembers = () => {
    const prev = activeIndex > 0 ? carouselData[activeIndex - 1] : null;
    const current = carouselData[activeIndex];
    const next = activeIndex < carouselData.length - 1 ? carouselData[activeIndex + 1] : null;
    return [prev, current, next];
  };

  const visibleMembers = getVisibleMembers();

  return (
    <section id="member" className="relative flex flex-col items-center pt-24 pb-40 px-4 bg-[#000b3d]">
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* --- Header Section --- */}
        <div className="border border-[#eab308]/30 bg-[#eab308]/10 text-[#eab308] px-5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] mb-6 flex items-center gap-2 uppercase">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Hall of Fame
        </div>

        <h2 className="text-4xl md:text-[3.5rem] font-black text-white tracking-tight mb-4">
          Member <span className="text-[#eab308]">Berprestasi</span>
        </h2>

        <p className="text-blue-100/70 text-sm md:text-base max-w-xl font-medium mb-16 leading-relaxed">
          Para juara yang telah mengharumkan nama FAST di berbagai kejuaraan tingkat nasional dan internasional.
        </p>

        {/* --- Carousel Grid --- */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-5xl mb-12 min-h-[480px]">
          {visibleMembers.map((member, idx) => {
            if (!member) {
              return <div key={`empty-${idx}`} className="hidden md:block w-[320px] h-[480px] opacity-0 pointer-events-none transition-all duration-500"></div>;
            }

            const isCenter = idx === 1;

            return (
              <div 
                key={`${member.id}-${idx}`} 
                className={`relative rounded-[2rem] overflow-hidden transition-all duration-500 ease-out flex-col w-[90%] max-w-[340px] md:w-[320px] h-[480px]
                  ${isCenter 
                    ? 'flex scale-100 z-20 shadow-[0_0_40px_rgba(234,179,8,0.2)] border-2 border-[#eab308] bg-gradient-to-b from-[#1a234f] to-[#0f173b] opacity-100 translate-y-0' 
                    : 'hidden md:flex scale-90 z-10 opacity-40 hover:opacity-70 border border-white/5 bg-[#0a1128] cursor-pointer translate-y-2'
                  }`}
                onClick={() => {
                  if (!isCenter) {
                    idx === 0 ? handlePrev() : handleNext();
                  }
                }}
              >
                {member.isCTA ? (
                   isCenter ? (
                    <div className="text-center px-8 flex flex-col items-center justify-center h-full w-full animate-in fade-in zoom-in duration-500">
                      <div className="w-20 h-20 bg-[#eab308]/20 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-[#eab308]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-3">Atlet Berprestasi Lainnya</h3>
                      <p className="text-blue-100/70 text-sm font-medium mb-8">Jelajahi seluruh rekam jejak juara dari keluarga besar FAST.</p>
                      
                      <a 
                        href="/atlet" 
                        className="bg-[#eab308] hover:bg-yellow-400 text-[#000b3d] px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-yellow-500/20 w-full"
                      >
                        Eksplor Galeri Member
                      </a>
                    </div>
                  ) : (
                    <div className="text-center px-4 flex flex-col items-center justify-center h-full w-full">
                      <svg className="w-12 h-12 text-white/50 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                      <h3 className="text-lg font-bold text-white/80">Lihat Semua Member</h3>
                    </div>
                  )
                ) : (
                  <div className={`flex flex-col h-full w-full ${isCenter ? 'animate-in fade-in zoom-in duration-500' : ''}`}>
                    <MemberGallery images={member.images} isCenter={isCenter} />

                    <div className="p-7 flex flex-col flex-grow overflow-hidden text-left bg-transparent relative z-30">
                      <h4 className={`font-black transition-colors duration-500 ${isCenter ? 'text-2xl text-white' : 'text-xl text-white/80'} mb-4 shrink-0`}>
                        {member.name}
                      </h4>
                      
                      <div className="flex flex-col gap-3.5 flex-grow overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40 transition-colors">
                        {member.achievements.map((achieve, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <svg className={`w-4 h-4 shrink-0 mt-0.5 transition-colors duration-500 ${isCenter ? 'text-[#eab308]' : 'text-white/30'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582c.277.11.464.395.464.716v4.3c0 1.944-1.121 3.655-2.822 4.457l-.596.28v1.842a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1.842l-.596-.28A5.002 5.002 0 015 10.92V6.621c0-.321.187-.606.464-.716L9 4.323V3a1 1 0 011-1zm-1 3.323L5.954 6.54l3.046 1.218 3.046-1.218L9 5.323z" clipRule="evenodd" />
                            </svg>
                            <span className={`text-[13px] font-semibold leading-relaxed transition-colors duration-500 ${isCenter ? 'text-white/90' : 'text-white/50'}`}>
                              {achieve}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* --- Carousel Controls --- */}
        <div className="flex items-center justify-center gap-6 mt-4 relative z-30">
          <button 
            onClick={handlePrev}
            disabled={activeIndex === 0} 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeIndex === 0 
                ? 'bg-white/5 border border-white/5 text-white/20 cursor-not-allowed' 
                : 'bg-white/5 border border-white/10 text-white hover:bg-[#eab308] hover:text-[#000b3d] hover:scale-105 active:scale-95 cursor-pointer'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="flex items-center gap-2.5">
            {carouselData.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === index ? 'w-8 bg-[#eab308]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              ></button>
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={activeIndex === carouselData.length - 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              activeIndex === carouselData.length - 1 
                ? 'bg-white/5 border border-white/5 text-white/20 cursor-not-allowed' 
                : 'bg-white/5 border border-white/10 text-white hover:bg-[#eab308] hover:text-[#000b3d] hover:scale-105 active:scale-95 cursor-pointer'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.72,201,110.15c61.4-9.2,118.2-31,175-53.71Z" fill="#f8fafc"></path>
        </svg>
      </div>
      
    </section>
  );
}