// src/components/sections/Prestasi.tsx
import { allPrestasiData, liputanData } from '@/data/prestasiData';

export default function Prestasi() {
  return (
    <section id="prestasi" className="relative flex flex-col items-center pt-24 pb-32 px-4 bg-gradient-to-b from-[#eab308] via-[#e65c00] via-40% to-[#8b1812]">
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* --- Badge Title --- */}
        <div className="border border-white/30 bg-white/10 text-white px-6 py-2 rounded-full text-[11px] font-bold tracking-[0.2em] mb-6 flex items-center gap-2 backdrop-blur-sm shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M19 3v4M5 3a2 2 0 002 2h10a2 2 0 002-2M5 3h14M9 21h6M12 17v4M7 13h10V9A5 5 0 007 9v4z" />
          </svg>
          PRESTASI & KEJUARAAN
        </div>

        {/* --- Intro Text --- */}
        <h2 className="text-4xl md:text-[3.5rem] font-black text-white tracking-tight mb-4 drop-shadow-md">
          Rekam Jejak <span className="text-white drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">Sang Juara</span>
        </h2>
        <p className="text-white/90 text-sm md:text-base max-w-2xl font-medium mb-12 leading-relaxed drop-shadow-sm">
          Menorehkan lebih dari 50+ gelar Juara Umum di berbagai ajang kompetisi dari tingkat regional hingga internasional sejak 2016.
        </p>

        {/* --- SCROLLABLE FULL ARCHIVE LIST --- */}
        <div className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-10 mb-24 backdrop-blur-md text-left shadow-2xl max-w-5xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-5">
            <svg className="w-6 h-6 text-[#facc15]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-wide">
              Arsip Prestasi Lengkap (2016 - 2026)
            </h3>
          </div>
          
          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/10 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40 transition-all">
            {allPrestasiData.map((text, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-black/10 hover:bg-black/20 transition-colors p-4 rounded-xl border border-white/5">
                <span className="text-[#facc15] font-black text-sm mt-0.5 min-w-[24px]">{idx + 1}.</span>
                <p className="text-white/80 text-sm md:text-[15px] font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- LIPUTAN MEDIA --- */}
        <div className="w-full flex items-center justify-start text-left mb-10 px-2 max-w-5xl mx-auto">
          <div className="w-1.5 h-8 bg-white rounded-full mr-4 shadow-[0_0_20px_rgba(255,255,255,0.7)]"></div>
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Liputan Media
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10 w-full max-w-5xl mx-auto">
          {liputanData.map((item) => (
            <div key={item.id} className="bg-black/30 rounded-[2rem] flex flex-col shadow-2xl border border-white/10 transition-transform hover:scale-[1.02] text-left p-8">
              
              <div className="bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-2 border border-white/10 opacity-90 self-start mb-5 shadow-inner">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                </svg>
                {item.media}
              </div>

              <div className="flex flex-col flex-grow">
                <span className="text-white/60 text-[11px] font-bold mb-2 uppercase tracking-wider">{item.date}</span>
                
                <h4 className="text-white font-black text-xl mb-3 leading-[1.2] tracking-tight">
                  {item.title}
                </h4>
                
                <p className="text-white/80 text-sm mb-6 leading-relaxed font-medium line-clamp-4 flex-grow">
                  {item.desc}
                </p>
                
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-white text-[13px] font-black flex items-center gap-1.5 hover:text-white/80 transition-colors mt-auto group self-start">
                  Baca selengkapnya 
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 translate-y-[1px]">
        <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.72,201,110.15c61.4-9.2,118.2-31,175-53.71Z" 
            fill="#f8fafc" 
          ></path>
        </svg>
      </div>

    </section>
  );
}