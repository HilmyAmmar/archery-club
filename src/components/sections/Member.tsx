// src/components/sections/Member.tsx
'use client';

import { useState } from 'react';

export default function Member() {
  const members = [
    {
      id: 1,
      name: 'Kholidin',
      achievements: ['Medali Emas Asean Para Games 2025', 'Medali Emas Asia Para Cup 2025', 'Medali Perak PON 2022'],
      // Saran: pastikan background foto aslinya udah transparan/rapi ya
      img: '/hall-of-fame/foto-1.png', 
    },
    {
      id: 2,
      name: 'Yuki Widiyanto',
      achievements: [
        'Medali Emas Beregu Nasional Putra PON XX Papua 2021', 
        'Medali Perunggu Perorangan Nasional Putra PON XX Papua 2021',
        'Medali Perunggu Beregu Campuran Nasional pada PON XX Papua 2021', 
        'Medali Emas Perorangan Nasional Putra Jarak 30M Kejurnas Panahan 2017 Aceh',
        'Medali Emas Perorangan Nasional Putra Jarak 40M Kejurnas Panahan 2017 Aceh',
        'Medali Emas Perorangan Nasional Putra Jarak 50M Kejurnas Panahan 2017 Aceh',
        'Medali Perak Beregu campuran Nasional Kejurnas Panahan 2018 Jakarta', 
        'Medali Perak Beregu Putra Nasional Kejurnas Panahan 2018 Jakarta',
        'Medali Emas Nasional Putra Jarak 30M Kejurnas Panahan 2018 Jakarta', 
        'Medali Perak Total Kualifikasi Nasional Putra Kejurnas Panahan 2018 Jakarta',
        'Medali Perak Nasional Putra Jarak 50 M Kejurnas Panahan 2018 Jakarta', 
        'Medali Perak Kualifikasi Beregu Putra Nasional Kejurnas Panahan 2018 Jakarta',
        'Medali Perunggu Nasional Putra Jarak 40M pada Kejurnas Panahan 2018 Jakarta'
      ],
      img: '/hall-of-fame/foto-2.png',
    },
    {
      id: 3,
      name: 'Zaki Malique Iyadin',
      achievements: ['Medali Perak Nasional Putra Perorangan PON XXI Aceh-Sumut 2024', 'Medali Emas Nasional Putra Individu PON XX Papua 2021'],
      img: '/hall-of-fame/foto-3.png',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % members.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
  };

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
            const isCenter = idx === 1; 

            return (
              <div 
                key={`${member.id}-${idx}`} 
                className={`relative rounded-[2rem] overflow-hidden transition-all duration-500 ease-in-out flex-col w-[90%] max-w-[340px] md:w-[320px] h-[480px]
                  ${isCenter 
                    ? 'flex scale-100 z-20 shadow-[0_0_40px_rgba(234,179,8,0.15)] border border-[#eab308]/40 bg-[#0f173b]' 
                    : 'hidden md:flex scale-90 z-10 opacity-40 hover:opacity-70 border border-white/5 bg-[#0a1128] cursor-pointer'
                  }`}
                onClick={() => {
                  if (!isCenter) {
                    idx === 0 ? handlePrev() : handleNext();
                  }
                }}
              >
                {/* --- Bagian Foto --- */}
                {/* Gw kasih bg-[#1a234f] biar kalo fotonya transparan/contain, pinggirannya ngga keliatan kosong */}
                <div className="relative w-full h-[220px] shrink-0 bg-[#1a234f] flex items-center justify-center">
                  <div 
                    // PERUBAHAN UTAMA DI SINI: ganti bg-cover jadi bg-contain bg-no-repeat
                    className="w-[90%] h-[90%] bg-contain bg-no-repeat bg-center" 
                    style={{ backgroundImage: `url(${member.img})` }}
                  ></div>
                  
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f173b] via-[#0f173b]/10 to-transparent"></div>
                  )}

                  {!isCenter && <div className="absolute inset-0 bg-[#000b3d]/70"></div>}

                  {isCenter && (
                    <div className="absolute top-4 right-4 text-[#eab308] bg-black/30 p-2 rounded-full backdrop-blur-md">
                      <svg className="w-5 h-5 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Bagian Info Bawah */}
                <div className="p-7 flex flex-col flex-grow overflow-hidden text-left bg-[#0f173b]">
                  <h4 className={`font-black ${isCenter ? 'text-2xl text-white' : 'text-xl text-white/80'} mb-4 shrink-0`}>
                    {member.name}
                  </h4>
                  
                  <div className="flex flex-col gap-3.5 flex-grow overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40 transition-colors">
                    {member.achievements.map((achieve, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg className={`w-4 h-4 shrink-0 mt-0.5 ${isCenter ? 'text-[#eab308]' : 'text-white/30'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582c.277.11.464.395.464.716v4.3c0 1.944-1.121 3.655-2.822 4.457l-.596.28v1.842a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1.842l-.596-.28A5.002 5.002 0 015 10.92V6.621c0-.321.187-.606.464-.716L9 4.323V3a1 1 0 011-1zm-1 3.323L5.954 6.54l3.046 1.218 3.046-1.218L9 5.323z" clipRule="evenodd" />
                        </svg>
                        <span className={`text-[13px] font-semibold leading-relaxed ${isCenter ? 'text-white/90' : 'text-white/50'}`}>
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
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#eab308] hover:text-[#000b3d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
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
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#eab308] hover:text-[#000b3d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
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