// src/components/sections/Member.tsx
'use client';

import { useState } from 'react';

export default function Member() {
  const members = [
    {
      id: 1,
      name: 'Andi Pratama',
      title: 'Atlet Terbaik Nasional 2024',
      category: 'Recurve Open',
      badgeColor: 'bg-[#eab308] text-[#422006]', // Emas
      achievements: ['Juara Nasional 2024', 'Juara Nasional 2023', 'Medali Perak PON 2022'],
      img: '/bg-hero.jpg', 
    },
    {
      id: 2,
      name: 'Rizky Maulana',
      title: 'Atlet Muda Paling Berbakat',
      category: 'Pelajar Recurve',
      badgeColor: 'bg-blue-600 text-white', 
      achievements: ['Juara Pelajar Nasional 2024', 'Juara PORPROV 2023', 'Medali Perak Kejurnas Junior'],
      img: '/bg-hero.jpg',
    },
    {
      id: 3,
      name: 'Sarah Winata',
      title: 'Best Female Archer 2023',
      category: 'Recurve Women',
      badgeColor: 'bg-orange-500 text-white',
      achievements: ['Juara Umum Regional 2024', 'Medali Perak PON 2023', 'Juara Kejurnas 2023'],
      img: '/bg-hero.jpg',
    },
    {
      id: 4,
      name: 'Dewi Kusuma',
      title: '3x Juara Beruntun',
      category: 'Standard Bow',
      badgeColor: 'bg-red-500 text-white',
      achievements: ['Juara Umum 2024', 'Juara Kejurnas 2023', 'Juara Cup Nasional 2022'],
      img: '/bg-hero.jpg',
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Fungsi Next & Prev
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % members.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  // Trik supaya card yang aktif selalu ada di tengah secara urutan
  const getVisibleMembers = () => {
    const prev = (activeIndex - 1 + members.length) % members.length;
    const next = (activeIndex + 1) % members.length;
    return [members[prev], members[activeIndex], members[next]];
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
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-5xl mb-12">
          {visibleMembers.map((member, idx) => {
            const isCenter = idx === 1; // Index 1 selalu yang di tengah (Active)

            return (
              <div 
                key={`${member.id}-${idx}`} 
                className={`relative rounded-[2rem] overflow-hidden transition-all duration-500 ease-in-out flex-col w-[90%] max-w-[340px] md:w-[320px] 
                  ${isCenter 
                    ? 'flex scale-100 z-20 shadow-[0_0_40px_rgba(234,179,8,0.15)] border border-[#eab308]/40 bg-[#0f173b]' // Center (Active)
                    : 'hidden md:flex scale-90 z-10 opacity-40 hover:opacity-70 border border-white/5 bg-[#0a1128] cursor-pointer' // Kiri Kanan (Inactive)
                  }`}
                onClick={() => {
                  if (!isCenter) {
                    idx === 0 ? handlePrev() : handleNext();
                  }
                }}
              >
                {/* --- Bagian Foto --- */}
                <div className={`relative w-full ${isCenter ? 'h-64' : 'h-56'}`}>
                  <div 
                    className="w-full h-full bg-cover bg-center" 
                    style={{ backgroundImage: `url(${member.img})` }}
                  ></div>
                  
                  {/* --- PERUBAHAN UTAMA: Gradient Overlay --- */}
                  {/* Div ini memberikan efek gradasi gelap dari bawah ke tengah foto */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f173b] via-[#0f173b]/60 to-transparent"></div>
                  )}

                  {/* Overlay gelap untuk inactive card (tetap pakai overlay solid biar makin redup) */}
                  {!isCenter && <div className="absolute inset-0 bg-[#000b3d]/70"></div>}
                  
                  {/* Badge Kategori */}
                  <div className={`absolute top-5 left-5 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wider shadow-lg ${member.badgeColor}`}>
                    {member.category}
                  </div>

                  {/* Bintang Emas untuk Center Card */}
                  {isCenter && (
                    <div className="absolute top-5 right-5 text-[#eab308] bg-black/20 p-2 rounded-full backdrop-blur-sm">
                      <svg className="w-5 h-5 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Bagian Info Bawah */}
                <div className="p-7 flex flex-col flex-grow text-left">
                  <h4 className={`font-black ${isCenter ? 'text-2xl text-white' : 'text-xl text-white/80'} mb-1`}>
                    {member.name}
                  </h4>
                  <p className={`text-[13px] font-bold tracking-wide mb-6 ${isCenter ? 'text-[#eab308]' : 'text-blue-400'}`}>
                    {member.title}
                  </p>
                  
                  <div className="flex flex-col gap-3.5 mt-auto">
                    {member.achievements.map((achieve, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg className={`w-4 h-4 shrink-0 mt-0.5 ${isCenter ? 'text-[#eab308]' : 'text-white/30'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582c.277.11.464.395.464.716v4.3c0 1.944-1.121 3.655-2.822 4.457l-.596.28v1.842a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1.842l-.596-.28A5.002 5.002 0 015 10.92V6.621c0-.321.187-.606.464-.716L9 4.323V3a1 1 0 011-1zm-1 3.323L5.954 6.54l3.046 1.218 3.046-1.218L9 5.323z" clipRule="evenodd" />
                        </svg>
                        <span className={`text-[13px] font-semibold leading-tight ${isCenter ? 'text-white/90' : 'text-white/50'}`}>
                          {achieve}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Carousel Controls --- */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="flex items-center gap-2.5">
            {members.map((_, index) => (
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
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

      </div>

    </section>
  );
}