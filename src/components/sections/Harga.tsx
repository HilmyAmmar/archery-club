'use client'; 

export default function Harga() {
  const adminWhatsApp = '6281188037673';

  const monthlyPackages = [
    {
      id: 1,
      name: 'WEEK END',
      price: '600.000',
      period: 'per bulan',
      isPopular: false,
      features: [
        'Jadwal: Sabtu & Minggu',
        'Jam Latihan: 07.00 - 12.00',
        'Fasilitas lapangan standar',
        'Program latihan dasar',
      ],
      btnText: 'Daftar Week End',
      pkgCode: 'Week End',
    },
    {
      id: 2,
      name: 'REGULER',
      price: '700.000',
      period: 'per bulan',
      isPopular: false,
      features: [
        'Jadwal: 3x Seminggu (Rabu, Sabtu, Minggu)',
        'Rabu: 13.00 - 17.00',
        'Weekend: 07.00 - 12.00',
        'Program latihan terstruktur',
      ],
      btnText: 'Daftar Reguler',
      pkgCode: 'Reguler',
    },
    {
      id: 3,
      name: 'PRESTASI',
      price: '800.000',
      period: 'per bulan',
      isPopular: true, 
      features: [
        'Jadwal Latihan: Bebas (Setiap Hari)',
        'Jam Latihan Fleksibel',
        'Fokus pembinaan atlet kompetitif',
        'Prioritas fasilitas & lapangan',
      ],
      btnText: 'Daftar Prestasi',
      pkgCode: 'Prestasi',
    },
  ];

  const handleRegister = (pkgCode: string) => {
    const message = `Halo Admin FAST, saya ingin mendaftar dengan data berikut:\n\nNama :\nAlamat :\nTempat & tgl lahir :\nAsal sekolah :\nNo HP :\nNama Ayah/Ibu :\nNo HP Ayah/Ibu :\n\nPilihan Membership : ${pkgCode}`;
    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handlePrivat = () => {
    window.open(`https://wa.me/${adminWhatsApp}`, '_blank');
  };

  return (
    <section id="pricing" className="relative flex flex-col items-center pt-24 pb-32 px-4 bg-gradient-to-b from-[#153bb5] to-[#0a1e66]">
      
      {/* SVG Curve Atas */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 -translate-y-[99%]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-[#153bb5]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.72,201,110.15c61.4-9.2,118.2-31,175-53.71Z"></path>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center mt-8">
        
        {/* Badge Header */}
        <div className="border border-white/20 bg-white/10 text-blue-100 px-5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] mb-6 flex items-center gap-2 uppercase backdrop-blur-sm">
          <svg className="w-3.5 h-3.5 text-[#eab308]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582c.277.11.464.395.464.716v4.3c0 1.944-1.121 3.655-2.822 4.457l-.596.28v1.842a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1.842l-.596-.28A5.002 5.002 0 015 10.92V6.621c0-.321.187-.606.464-.716L9 4.323V3a1 1 0 011-1zm-1 3.323L5.954 6.54l3.046 1.218 3.046-1.218L9 5.323z" clipRule="evenodd" />
          </svg>
          Pendaftaran Member
        </div>

        <h2 className="text-4xl md:text-[3.5rem] font-black text-white tracking-tight mb-4">
          Pilih Membership <span className="text-[#eab308]">Terbaikmu</span>
        </h2>

        <p className="text-blue-100/80 text-sm md:text-base max-w-2xl font-medium mb-16 leading-relaxed">
          Tiga pilihan membership bulanan yang dirancang untuk memaksimalkan perkembangan atlet di semua level, dari pemula hingga kompetitif.
        </p>

        {/* --- Grid 3 Card Bulanan --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl items-center mb-8">
          {monthlyPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`relative rounded-[2rem] text-left flex flex-col h-full transition-all duration-300
                ${pkg.isPopular 
                  ? 'bg-[#0a1128] border border-[#eab308]/40 shadow-[0_10px_40px_rgba(234,179,8,0.15)] scale-100 lg:scale-105 z-20 py-10 px-8'
                  : 'bg-white/10 border border-white/20 backdrop-blur-md scale-100 z-10 py-8 px-7 hover:bg-white/15'
                }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg">
                  Paling Populer
                </div>
              )}

              <h3 className={`text-xs font-black tracking-[0.2em] mb-4 ${pkg.isPopular ? 'text-[#eab308]' : 'text-blue-200'}`}>
                {pkg.name}
              </h3>
              
              <div className="flex items-end gap-1 mb-8">
                <span className="text-white text-lg font-bold pb-2">Rp</span>
                <span className="text-white text-4xl md:text-5xl font-black tracking-tight">{pkg.price}</span>
              </div>
              
              <div className={`w-full h-px mb-8 ${pkg.isPopular ? 'bg-white/10' : 'bg-white/20'}`}></div>

              <div className="flex flex-col gap-5 mb-10 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <svg className={`w-5 h-5 shrink-0 mt-0.5 ${pkg.isPopular ? 'text-[#eab308]' : 'text-blue-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className={`text-base font-semibold leading-relaxed ${pkg.isPopular ? 'text-blue-50' : 'text-white'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* --- ACTION CLICK REGISTER --- */}
              <button 
                onClick={() => handleRegister(pkg.pkgCode)}
                className={`w-full py-3.5 rounded-xl text-sm font-black transition-all active:scale-95 flex items-center justify-center gap-2
                ${pkg.isPopular 
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg hover:shadow-orange-500/40' 
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                {pkg.btnText}
              </button>
            </div>
          ))}
        </div>

        {/* --- Banner Paket Privat --- */}
        <div className="w-full max-w-5xl bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-16 hover:bg-white/10 transition-colors">
          <div className="text-left flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg md:text-xl font-black text-white tracking-wide">Membership Privat</h3>
              <span className="bg-blue-500/20 text-blue-200 border border-blue-400/30 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">1-on-1</span>
            </div>
            <p className="text-blue-100/90 text-base font-medium">Jadwal sesuai permintaan. Fokus personal selama 2 jam per sesi. <span className="font-bold text-[#eab308] whitespace-nowrap">(Max 4 orang/sesi)</span>.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
            <div className="text-center md:text-right w-full md:w-auto">
              <span className="text-white text-2xl md:text-3xl font-black">Rp300.000</span>
              <span className="text-blue-200/80 text-xs font-bold block mt-0.5 tracking-wider">/ SESI (2 JAM)</span>
            </div>
            
            {/* --- ACTION CLICK PRIVAT --- */}
            <button 
              onClick={handlePrivat}
              className="w-full md:w-auto whitespace-nowrap bg-white text-[#0a1e66] px-8 py-3 rounded-xl text-sm font-black hover:bg-gray-100 transition-all active:scale-95 shadow-lg"
            >
              Booking Privat
            </button>
          </div>
        </div>

        {/* --- Footer Disclaimer --- */}
        <div className="text-center space-y-3 max-w-2xl px-4 mx-auto">
          <p className="text-blue-100/80 text-xs md:text-sm font-medium">
            Harga membership bulanan di atas belum termasuk biaya pendaftaran awal.
          </p>
          
          <p className="text-blue-50 font-bold bg-white/10 inline-block px-5 py-3 rounded-xl border border-white/20 shadow-lg text-sm md:text-base">
            Biaya Pendaftaran Perdana: <span className="text-yellow-400 font-black tracking-wide">Rp750.000</span> <br className="md:hidden" /> <span className="text-blue-100/80 font-medium text-xs md:text-sm">(Sumbangan bantalan, Kaos Katun, Buku Scoring).</span>
          </p>
        </div>

      </div>

      {/* SVG Curve Bawah */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-[#0f172a]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.72,201,110.15c61.4-9.2,118.2-31,175-53.71Z"></path>
        </svg>
      </div>

    </section>
  );
}