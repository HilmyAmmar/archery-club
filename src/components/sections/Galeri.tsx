// src/components/sections/Galeri.tsx
export default function Galeri() {
  // Array 6 foto untuk galeri (ukuran seragam)
  const photos = [
    { id: 1, img: '/bg-hero.jpg' },
    { id: 2, img: '/bg-hero.jpg' },
    { id: 3, img: '/bg-hero.jpg' },
    { id: 4, img: '/bg-hero.jpg' },
    { id: 5, img: '/bg-hero.jpg' },
    { id: 6, img: '/bg-hero.jpg' },
  ];

  return (
    // Background sangat terang/putih kebiruan sesuai screenshot
    <section id="galeri" className="relative flex flex-col items-center pt-24 pb-48 px-4 bg-[#f8fafc]">
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* --- Header Section --- */}
        <div className="bg-blue-50 text-blue-600 border border-blue-200 px-5 py-1.5 rounded-full text-[11px] font-black tracking-[0.2em] mb-6 flex items-center gap-2 uppercase shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Galeri Aktivitas
        </div>

        {/* Teks "Keseruan" warnanya abu-abu terang, "Bersama FAST" biru nyala */}
        <h2 className="text-4xl md:text-[3.5rem] font-black tracking-tight mb-5">
          <span className="text-gray-300">Keseruan</span> <span className="text-blue-600">Bersama FAST</span>
        </h2>

        <p className="text-gray-500 text-sm md:text-base max-w-xl font-medium mb-16 leading-relaxed">
          Dari latihan rutin, kejuaraan bergengsi, hingga momen kebersamaan — semuanya ada di FAST.
        </p>

        {/* --- Grid Galeri (Ukuran Sama Semua) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 w-full max-w-5xl">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              // aspect-[4/3] memaksa semua kotak punya rasio ukuran yang konsisten dan sama persis
              className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: `url(${photo.img})` }}
              ></div>
              
              {/* Overlay tipis pas di-hover biar keliatan interaktif */}
              <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

      </div>

      {/* --- SVG Curve Bawah (Transisi ke Footer Dark Blue) --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-[#000b3d]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.72,201,110.15c61.4-9.2,118.2-31,175-53.71Z"></path>
        </svg>
      </div>

    </section>
  );
}