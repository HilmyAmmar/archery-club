// src/components/sections/Coach.tsx
export default function Coach() {
  const sertifikat = [
    {
      id: 1,
      badge: 'Lisensi Resmi',
      badgeColor: 'bg-blue-600',
      title: 'Lisensi Pelatih Level II',
      issuer: 'Komite Olimpiade Indonesia (KOI)',
      date: 'SERTIFIKAT · 2022',
      img: '/bg-hero.jpg', 
    },
    {
      id: 2,
      badge: 'Piagam Resmi',
      badgeColor: 'bg-orange-500',
      title: 'Instruktur Nasional Panahan',
      issuer: 'Persatuan Panahan Indonesia (Perpani)',
      date: 'SERTIFIKAT · 2021',
      img: '/bg-hero.jpg',
    },
    {
      id: 3,
      badge: 'World Archery',
      badgeColor: 'bg-green-600',
      title: 'Pelatihan Kepelatihan Internasional',
      issuer: 'World Archery Federation (WA) — Seoul, Korea',
      date: 'BUKTI PELATIHAN · 2023',
      img: '/bg-hero.jpg',
    },
  ];

  return (
    <section id="coach" className="relative flex flex-col items-center pt-28 pb-40 px-4 bg-[#f8fafc]">
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* --- Header Section --- */}
        <div className="bg-blue-100 text-blue-700 border border-blue-200 px-5 py-1.5 rounded-full text-[11px] font-black tracking-[0.2em] mb-6 flex items-center gap-2 uppercase shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Head Coach FAST
        </div>

        <h2 className="text-4xl md:text-[3.5rem] font-black text-[#000b3d] tracking-tight mb-16 text-center">
          Dibimbing oleh <span className="text-blue-600">Yang Terbaik</span>
        </h2>

        {/* --- Main Coach Card --- */}
        <div className="w-full bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col overflow-hidden mb-24">
          
          <div className="flex flex-col md:flex-row">
            {/* Kiri: Foto Coach */}
            <div className="w-full md:w-[45%] relative min-h-[400px] md:min-h-full bg-gray-900 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                style={{ backgroundImage: `url('/bg-hero.jpg')` }} 
              ></div>
              
              {/* Gradasi gelap dasar biar Tag di pojok bawah tetep kebaca */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              
              {/* 1. Efek pudar putih di BAWAH (hanya aktif di HP/Mobile saat fotonya ada di atas teks) */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent md:hidden"></div>
              
              {/* 2. Efek pudar putih di KANAN (hanya aktif di Desktop/Tablet saat fotonya ada di kiri teks) */}
              <div className="absolute top-0 right-0 h-full w-28 bg-gradient-to-l from-white to-transparent hidden md:block"></div>
              {/* ----------------------------------------------------------- */}

              {/* Tags Style Panahan */}
              <div className="absolute bottom-6 left-6 flex flex-wrap gap-2 z-10">
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider shadow-md">Recurve</span>
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider shadow-md">Olympic Style</span>
                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider shadow-md">Compound</span>
              </div>
            </div>

            {/* Kanan: Info Coach */}
            <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col text-left relative z-10 bg-transparent">
              <h3 className="text-3xl md:text-[2.5rem] font-black text-gray-900 leading-tight mb-2">Budi Santoso, S.Or</h3>
              <p className="text-blue-600 font-bold text-sm tracking-wide mb-8">Head Coach — FAST Archery Sport Team</p>

              {/* Grid Kotak Pengalaman & Atlet */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex flex-col justify-center">
                  <div className="text-blue-700 font-black text-2xl md:text-3xl mb-1">12 Tahun</div>
                  <div className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">Pengalaman</div>
                </div>
                <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 flex flex-col justify-center">
                  <div className="text-orange-600 font-black text-2xl md:text-3xl mb-1">50+</div>
                  <div className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">Atlet Nasional</div>
                </div>
              </div>

              {/* Banner Sertifikasi Resmi */}
              <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-4 flex items-center gap-4 mb-6">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Sertifikasi Resmi</div>
                  <div className="text-gray-800 text-sm font-black">Level II KOI (Komite Olimpiade Indonesia)</div>
                </div>
              </div>

              <p className="text-gray-600 text-[15px] leading-relaxed mb-8 font-medium">
                Budi Santoso adalah kepala pelatih FAST dengan pengalaman 12 tahun membina atlet panahan. Alumni Pendidikan Kepelatihan Olahraga ini telah berhasil mengantarkan puluhan atlet ke tingkat nasional dan internasional, termasuk di PON, Kejurnas, dan kompetisi Asia Tenggara.
              </p>

              {/* Bullet Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                {[
                  'Head Coach PON 2022 & 2024',
                  '50+ Atlet Nasional Binaan',
                  'Instruktur Nasional KOI',
                  'Pelatih Terbaik Nasional 2023'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span className="text-gray-700 text-[13px] font-bold">{item}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Bagian Quote di dalam Card tapi di area bawah */}
          <div className="border-t border-gray-100 bg-[#fbfcfd] p-8 md:px-12 md:py-8 flex items-start gap-6">
            <svg className="w-12 h-12 text-blue-300 shrink-0 rotate-180" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            <p className="text-gray-600 text-base md:text-lg font-medium italic leading-relaxed pt-1">
              "Panahan bukan hanya soal teknik melepas anak panah. Ini tentang membangun fokus, ketangguhan mental, dan karakter — itulah yang membuat atlet FAST berbeda."
            </p>
          </div>

        </div>


        {/* --- SERTIFIKAT & BUKTI PELATIHAN --- */}
        <div className="w-full flex items-center justify-start text-left mb-8 pl-2">
          <div className="w-1.5 h-8 bg-[#000b3d] rounded-full mr-4"></div>
          <h3 className="text-2xl md:text-[1.8rem] font-black text-[#000b3d] tracking-tight">
            Sertifikat & Bukti Pelatihan
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {sertifikat.map((item) => (
            <div key={item.id} className="bg-white rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col text-left group">
              <div className="relative h-48 w-full p-2 pb-0">
                <div className="w-full h-full rounded-[1.2rem] bg-cover bg-center border border-gray-100" style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="absolute top-4 left-4 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center opacity-95">
                  <span className={`${item.badgeColor} absolute inset-0 rounded-lg opacity-90`}></span>
                  <span className="relative z-10">{item.badge}</span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-gray-400 text-[10px] font-black mb-2 tracking-widest">{item.date}</span>
                <h4 className="text-gray-900 font-black text-[15px] mb-1 leading-tight">{item.title}</h4>
                <p className="text-gray-500 text-xs font-semibold">{item.issuer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* SVG Curve at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-[#000b3d]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.72,201,110.15c61.4-9.2,118.2-31,175-53.71Z"></path>
        </svg>
      </div>

    </section>
  );
}