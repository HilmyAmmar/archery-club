// src/components/sections/Prestasi.tsx
export default function Prestasi() {
  const kejuaraan = [
    {
      id: 1,
      title: 'PON (Pekan Olahraga Nasional)',
      desc: '3 Emas · 2 Perak · 1 Perunggu',
      year: '2022 & 2024',
      badge: 'JUARA UMUM',
      badgeColor: 'bg-orange-500',
      img: '/bg-hero.jpg',
    },
    {
      id: 2,
      title: 'Kejurnas Panahan Nasional',
      desc: 'Dominasi 3 Divisi Sekaligus',
      year: '2023',
      badge: 'JUARA UMUM',
      badgeColor: 'bg-orange-600',
      img: '/bg-hero.jpg',
    },
    {
      id: 3,
      title: 'PORPROV Antar Provinsi',
      desc: 'Atlet Terbaik + Juara Umum',
      year: '2023',
      badge: 'TIM TERBAIK',
      badgeColor: 'bg-red-500',
      img: '/bg-hero.jpg',
    },
    {
      id: 4,
      title: 'Kejuaraan Antar Klub Nasional',
      desc: '2019 · 2020 · 2021 · 2022 · 2023',
      year: '2019-2023',
      badge: '5X JUARA BERUNTUN',
      badgeColor: 'bg-orange-400',
      img: '/bg-hero.jpg',
    },
    {
      id: 5,
      title: 'Cup Nasional Open',
      desc: '12 Medali Emas se-Indonesia',
      year: '2024',
      badge: 'MEDALI TERBANYAK',
      badgeColor: 'bg-yellow-500',
      img: '/bg-hero.jpg',
    },
    {
      id: 6,
      title: 'Kejuaraan Pelajar Nasional',
      desc: 'Recurve & Compound Junior',
      year: '2024',
      badge: 'JUARA UMUM',
      badgeColor: 'bg-orange-500',
      img: '/bg-hero.jpg',
    },
  ];

  const liputan = [
    {
      id: 1,
      media: 'Kompas.com',
      date: '12 Nov 2024',
      title: 'Tim FAST Raih Juara Umum PON 2024, Dominasi 3 Divisi Sekaligus',
      desc: 'Klub panahan FAST kembali membuktikan kelasnya dengan meraih juara umum PON 2024, melanjutkan dominasi yang tela...',
      img: '/bg-hero.jpg',
    },
    {
      id: 2,
      media: 'Tribun Sports',
      date: '3 Sep 2023',
      title: 'FAST Cetak Sejarah: 5 Kali Berturut-turut Juara Umum Kejuaraan Antar Klub',
      desc: 'Prestasi luar biasa kembali ditorehkan oleh FAST Archery Sport Team yang berhasil merebut gelar juara umum untuk kelima...',
      img: '/bg-hero.jpg',
    },
    {
      id: 3,
      media: 'Detik Sport',
      date: '20 Jul 2024',
      title: 'Atlet Muda FAST Sabet 12 Emas di Cup Nasional Open 2024',
      desc: 'Regenerasi FAST terbukti berhasil. Atlet-atlet muda binaan FAST tampil gemilang di Cup Nasional Open 2024 dengan mengoleks...',
      img: '/bg-hero.jpg',
    },
  ];

  return (
    // Transisi background dari biru -> cokelat -> oranye karamel terang (#e36e14)
    <section id="prestasi" className="relative flex flex-col items-center pt-32 pb-32 px-4 bg-gradient-to-b from-[#000b3d] via-[#4a1c0d] via-25% to-[#e36e14]">
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* --- Bagian Atas (Statistik) --- */}
        <div className="border border-[#e59a59]/30 bg-[#e59a59]/5 text-[#e59a59] px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] mb-6 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M19 3v4M5 3a2 2 0 002 2h10a2 2 0 002-2M5 3h14M9 21h6M12 17v4M7 13h10V9A5 5 0 007 9v4z" />
          </svg>
          PRESTASI & KEJUARAAN
        </div>

        <h2 className="text-7xl md:text-[9rem] font-black text-white leading-none tracking-tighter mb-2 drop-shadow-lg">
          50+
        </h2>
        <h3 className="text-3xl md:text-5xl font-black text-[#de8b4e] tracking-widest mb-6 drop-shadow-md">
          JUARA UMUM
        </h3>

        <p className="text-gray-300 text-sm md:text-base max-w-2xl font-medium mb-12 leading-relaxed opacity-90">
          Dari kejuaraan regional hingga nasional, atlet FAST terus mendominasi arena <br className="hidden md:block" /> panahan Indonesia.
        </p>

        <div className="w-full bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2.5rem] py-10 px-4 shadow-2xl mb-24 max-w-5xl">
          
          {/* Grid Layout - Perubahan: divide-white/20 agar garis pemisah senada dengan border */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 divide-y md:divide-y-0 md:divide-x divide-white/20">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">50+</div>
              {/* Warna label tetap beige agar kontras terhadap putih kaca */}
              <div className="text-[#a87a5d] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-90">Juara Umum</div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">120+</div>
              <div className="text-[#a87a5d] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-90">Medali Emas</div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0 border-t border-white/10 md:border-t-0">
              <div className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">15+</div>
              <div className="text-[#a87a5d] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-90">Pelatih Berlisensi</div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0 border-t border-white/10 md:border-t-0">
              <div className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">200+</div>
              <div className="text-[#a87a5d] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-90">Member Aktif</div>
            </div>

          </div>
        </div>

        {/* --- REKAM JEJAK KEJUARAAN --- */}
        <div className="w-full flex items-center justify-start text-left mb-10 px-2">
          <div className="w-1.5 h-8 bg-[#f59e0b] rounded-full mr-4 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Rekam Jejak Kejuaraan
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-24 w-full">
          {kejuaraan.map((item) => (
            // Warna Card di Rekam Jejak (Coklat Kemerahan, tidak seterang Liputan Media)
            <div key={item.id} className="bg-[#4a1f0f]/80 rounded-[2rem] overflow-hidden border border-white/5 transition-all hover:scale-[1.02] flex flex-col text-left group">
              <div className="relative h-52 w-full p-3 pb-0">
                <div className="w-full h-full rounded-[1.5rem] bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="absolute inset-0 bg-black/20 rounded-[1.5rem] m-3"></div>
                <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-md text-white px-3.5 py-1 rounded-full text-[10px] font-black tracking-wider">
                  {item.year}
                </div>
              </div>
              <div className="p-7 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.badgeColor}`}></div>
                  <span className="text-[10px] font-black tracking-[0.15em] text-orange-200/80 uppercase">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-white font-black text-xl mb-2 leading-tight tracking-tight">{item.title}</h4>
                <p className="text-orange-100/60 text-sm mt-auto font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>


        {/* --- LIPUTAN MEDIA --- */}
        <div className="w-full flex items-center justify-start text-left mb-10 px-2">
          <div className="w-1.5 h-8 bg-[#f59e0b] rounded-full mr-4 shadow-[0_0_20px_rgba(245,158,11,0.7)]"></div>
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Liputan Media
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-20 w-full">
          {liputan.map((item) => (
            // Card Liputan Media - Oranye Cerah / Jahe (#f37a23)
            <div key={item.id} className="bg-[#f37a23] rounded-[2rem] overflow-hidden flex flex-col shadow-2xl border border-white/5 transition-transform hover:scale-[1.02] text-left">
              
              {/* Image Section */}
              <div className="relative h-48 w-full p-3 pb-0">
                <div 
                  className="w-full h-full rounded-[1.5rem] bg-cover bg-center shadow-inner" 
                  style={{ backgroundImage: `url(${item.img})` }}
                >
                  <div className="absolute inset-0 bg-black/10 rounded-[1.5rem]"></div>
                  
                  {/* Media Brand Badge (Sesuai Prototype) */}
                  <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-2 border border-white/10 opacity-90">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                    </svg>
                    {item.media}
                  </div>
                </div>
              </div>

              {/* Text Section */}
              <div className="p-7 pt-5 flex flex-col flex-grow">
                <span className="text-white/60 text-[11px] font-bold mb-2 uppercase tracking-wider">{item.date}</span>
                
                <h4 className="text-white font-black text-xl mb-3 leading-[1.2] tracking-tight">
                  {item.title}
                </h4>
                
                <p className="text-white/80 text-sm mb-6 leading-relaxed font-medium line-clamp-3">
                  {item.desc}
                </p>
                
                <a href="#" className="text-white text-[13px] font-black flex items-center gap-1.5 hover:text-white/80 transition-colors mt-auto group">
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

      {/* --- SVG Curve (Lengkungan Putih di bawah section) --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.72,201,110.15c61.4-9.2,118.2-31,175-53.71Z" fill="#f8fafc"></path>
        </svg>
      </div>

    </section>
  );
}