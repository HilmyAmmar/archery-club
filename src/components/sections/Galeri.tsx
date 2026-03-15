'use client';

export default function Galeri() {
  const galleryImages = [
    '/galeri/1.jpeg', '/galeri/2.jpeg', '/galeri/3.jpeg', '/galeri/4.jpeg', '/galeri/5.jpeg', '/galeri/6.jpeg',
    '/galeri/7.jpeg', '/galeri/8.jpeg', '/galeri/9.jpeg', '/galeri/10.jpeg', '/galeri/11.jpeg', '/galeri/12.jpeg',
  ];

  const row1 = [...galleryImages.slice(0, 6), ...galleryImages.slice(0, 6)];
  const row2 = [...galleryImages.slice(6, 12), ...galleryImages.slice(6, 12)];

  return (
    <section id="galeri" className="relative flex flex-col items-center pt-24 pb-40 px-4 bg-[#f8fafc] overflow-hidden">
      
      {/* --- Header Section --- */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center mb-14">
        <div className="border border-blue-200 bg-blue-50 text-blue-600 px-5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] mb-6 flex items-center gap-2 uppercase shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Galeri Aktivitas
        </div>

        <h2 className="text-4xl md:text-[3.5rem] font-black text-gray-900 tracking-tight mb-5">
          Keseruan <span className="text-[#1a3680]">Bersama FAST</span>
        </h2>

        <p className="text-gray-600 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
          Dari latihan rutin, kejuaraan bergengsi, hingga momen kebersamaan — semuanya ada di FAST.
        </p>
      </div>

      {/* --- Infinite Marquee Wrapper --- */}
      <div className="relative w-full max-w-[1600px] mx-auto flex flex-col gap-6 overflow-hidden z-10">
        
        {/* Gradient Blur Kiri & Kanan */}
        <div className="absolute top-0 left-0 w-16 md:w-40 h-full bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-40 h-full bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-20 pointer-events-none"></div>

        {/* ROW 1: ARAH KE KIRI */}
        <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
          {row1.map((imgUrl, index) => (
            <div key={`r1-${index}`} className="w-[260px] md:w-[380px] h-[180px] md:h-[240px] shrink-0 mx-3 group cursor-pointer overflow-hidden rounded-[2rem] shadow-sm border border-gray-200/50 bg-gray-200">
              <img src={imgUrl} alt="FAST Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            </div>
          ))}
        </div>

        {/* ROW 2: ARAH KE KANAN */}
        <div className="flex w-max animate-infinite-scroll-reverse hover:[animation-play-state:paused]">
          {row2.map((imgUrl, index) => (
            <div key={`r2-${index}`} className="w-[260px] md:w-[380px] h-[180px] md:h-[240px] shrink-0 mx-3 group cursor-pointer overflow-hidden rounded-[2rem] shadow-sm border border-gray-200/50 bg-gray-200">
              <img src={imgUrl} alt="FAST Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50%)); }
        }
        @keyframes infiniteScrollReverse {
          0% { transform: translateX(calc(-50%)); }
          100% { transform: translateX(0); }
        }
        .animate-infinite-scroll {
          animation: infiniteScroll 50s linear infinite;
        }
        .animate-infinite-scroll-reverse {
          animation: infiniteScrollReverse 50s linear infinite;
        }
      `}} />

      {/* --- SVG Curve Bawah --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-[#0f172a]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.72,201,110.15c61.4-9.2,118.2-31,175-53.71Z"></path>
        </svg>
      </div>

    </section>
  );
}