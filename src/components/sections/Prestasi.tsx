export default function Prestasi() {
  const allPrestasi = [
    "Juara Umum SMESCO Open 2016, oleh Kementrian Koperasi & UKM di Grand Smesco Hill, Cisarua, Puncak, Bogor.",
    "Juara Umum Piala Walikota Bekasi 2016.",
    "Juara Umum Bascot Open 2017, Mako Brimob Depok.",
    "Juara Umum UI National Open 2018 (1100 peserta).",
    "Juara Umum Ganesha Indoor National Open 2017, Bandung.",
    "Juara Umum Piala Gubernur DKI Jakarta di FAST National Open 2018 (1150 peserta).",
    "Juara Umum Piala Presiden di Bogor Open 2018.",
    "Juara Umum Ramadhan Archery Competition III - 2018, Bandung.",
    "Juara Umum Danpaskhas Open 2017 di Jakarta.",
    "Juara Umum Dandim 0503 Open 2018 Jakarta Timur.",
    "Juara Umum Piala Kemenpora - Cikal Open 2018 di Tangerang.",
    "Juara Umum Bupati Kebumen Open 2017, Jawa Tengah.",
    "Juara Umum Braders Archery Competition 2017, Jakarta.",
    "Pelatih Pelatda DKI divisi Ronde Nasional di Kejurnas Panahan Senior Aceh 2017, meraih 3 medali emas.",
    "Pelatih Pelatda DKI divisi Ronde Nasional di Kejurnas Jakarta 2018. Divisi Ronde Nasional meraih 1 emas, 7 perak, 3 perunggu.",
    "Juara Umum Piala Komandan Marinir 2019 di Cilandak, Jakarta Selatan.",
    "Juara Umum Piala Kapolda Jabar 2019 di Sentul, Jawa Barat.",
    "Juara Umum Piala Pangdam Jaya 2019 di Jakarta.",
    "Juara Umum Piala Gubernur AAU 2019 di Yogyakarta.",
    "Juara Umum Piala Panglima TNI 2019 di Mabes TNI Cilangkap, Jakarta.",
    "Juara Umum Malaysia Open 2019 di Perak, Malaysia.",
    "Juara Umum Piala Presiden di Bogor Open 2019.",
    "Juara Umum Piala Walikota Tangerang Selatan 2019.",
    "Juara Umum Kejuaraan Tingkat Nasional FAST OPEN 2 2019 di Jakarta.",
    "Juara Umum HDAC Open - Piala Komandan Paskhas TNI AU 2020 di Bogor.",
    "Pelatih Pelatda DKI divisi Ronde Nasional di PRA PON 2019, meraih posisi Peringkat 1 & 2 divisi Ronde Nasional Putra.",
    "Juara Umum Piala Komandan Marinir II 2020 di Cilandak, Jakarta.",
    "PON Papua 2021 dari 2 atlet FAST meraih 2 emas & 2 perunggu.",
    "Juara Umum Piala Gubernur KEPRI 2021 di Batam.",
    "Juara Umum Piala Bupati Bogor - ASCI 2021 di Sentul, Jawa Barat.",
    "Juara Umum King's III, 2022 di Jakarta.",
    "Juara Umum Muflih Championship 2022 di Jakarta.",
    "Juara Umum Jakarta Series 1 2022.",
    "Atlet FAST mewakili DKI di Kejurnas Panahan Senior 2022 di Palangkaraya divisi Ronde Nasional meraih 5 emas, 11 perak, 8 perunggu.",
    "Juara Umum Jakarta Series 3 - Piala Panglima Armada 1, 2022 di Jakarta.",
    "Juara Umum Jakarta Series 4 - Piala Gubernur DKI Jakarta 2022.",
    "Juara Umum Kaajendam IV Diponegoro Januari 2023 di Purwokerto, Jawa Tengah.",
    "Juara Umum Jakarta Series 1 - Mei 2023.",
    "Juara Umum Piala Presiden yg ketiga kalinya di Bogor Open Juli 2023.",
    "Juara Umum Piala Ketum PB Perpani di HUB Archery Championship Agustus 2023 di Cibubur.",
    "Juara Umum Junior Grand Prix Stage 1, 2024.",
    "Juara Umum Junior Grand Prix Stage 2, 2024.",
    "Juara Umum Ramadhan Competition, Bandung 2024.",
    "Juara Umum Piala Kemenpora, Ciracas, Jakarta 2024.",
    "Juara Umum Piala Presiden keempat kalinya, Bogor 2024.",
    "Juara Umum Student Open, Cibubur 2024.",
    "Juara Umum ke 2, Jakarta Utara Open, 2024.",
    "Juara Umum Junior Grand Prix Stage 3, 2024.",
    "Juara Umum Banyumas Open, 2024.",
    "Juara Umum KASAU CUP, Lembang, April 2025.",
    "Juara Umum Jakarta Series Open, Ciracas, Mei 2025.",
    "Juara Umum Student Open 2025, Cibubur, Juni 2025.",
    "Juara Umum ke 3 di Kejurnas Junior Juni 2025, Kudus. 13 Atlet FAST mewakili DKI memperoleh 10 emas, 1 perak, 6 perunggu.",
    "Juara Umum Jakarta Series 2, Jakarta 2025.",
    "Juara Umum Segar Archery Open 2025, Jakarta Barat.",
    "Juara Umum Nalaria Archery Open Januari 2026, Depok, Jabar.",
    "Juara Umum Liga Kendal Seri 1 2026, Jateng."
  ];

  const liputan = [
    {
      id: 1,
      media: 'DelikAsia.com',
      date: '28 Apr 2025',
      title: 'Berlangsung di Lembang, FAST Kodamar Archery Sabet Juara Umum Kasau Cup 2025',
      desc: 'FAST Kodamar Archery tampil gemilang dengan menyabet gelar Juara Umum dalam Kejuaraan Panahan Kasau Cup 2025 kategori umum yang digelar di Lembang. Klub ini memborong total 39 medali.',
      link: 'https://www.delikasia.com/headline-news/berlangsung-di-lembang-fast-kodamar-archery-sabet-juara-umum-kasau-cup-2025'
    }
  ];

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
            {allPrestasi.map((text, idx) => (
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
          {liputan.map((item) => (
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

      {/* --- SVG Curve --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.72,201,110.15c61.4-9.2,118.2-31,175-53.71Z" fill="#f8fafc"></path>
        </svg>
      </div>

    </section>
  );
}