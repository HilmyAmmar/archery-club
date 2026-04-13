import { coachesData } from "@/data/coachData";
import Image from "next/image";

const coaches = coachesData; 

export default function Coach() {
  return (
    <section id="coach" className="relative flex flex-col items-center pt-28 pb-40 px-4 bg-[#f8fafc]">
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* --- Header Section --- */}
        <div className="bg-blue-100 text-blue-700 border border-blue-200 px-5 py-1.5 rounded-full text-[11px] font-black tracking-[0.2em] mb-6 flex items-center gap-2 uppercase shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Tim Pelatih
        </div>

        <h2 className="text-4xl md:text-[3.5rem] font-black text-[#000b3d] tracking-tight mb-16 text-center">
          Dibimbing Pelatih <span className="text-blue-600">Pelatda Panahan DKI</span>
        </h2>

        {/* --- Looping Data Coach --- */}
        <div className="w-full flex flex-col gap-12 mb-10">
          {coaches.map((coach) => (
            <div key={coach.id} className="w-full bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col overflow-hidden">
              
              {/* Bagian Atas: Profil & Quote */}
              <div className="p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start bg-gradient-to-br from-white to-blue-50/30">
                
                {/* Foto Coach */}
                <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 rounded-[1.5rem] overflow-hidden relative shadow-md border-4 border-white">
                  <Image 
                    src={coach.image}
                    alt={`Foto Pelatih Panahan ${coach.name}`}
                    fill
                    sizes="(max-width: 768px) 160px, 192px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Info & Quote */}
                <div className="flex flex-col text-center md:text-left pt-2">
                  <span className="text-blue-600 font-bold text-[11px] tracking-[0.2em] uppercase mb-1">
                    {coach.role}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-5">
                    {coach.name}
                  </h3>
                  
                  {/* Quote UI */}
                  <div className="flex items-start gap-4 bg-white/60 p-5 rounded-2xl border border-blue-100/50">
                    <svg className="w-8 h-8 text-blue-300 shrink-0 rotate-180 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    <p className="text-gray-600 text-sm md:text-[15px] font-medium italic leading-relaxed">
                      {coach.quote}
                    </p>
                  </div>
                </div>

              </div>

              {/* Divider Inner */}
              <div className="w-full h-px bg-gray-100"></div>

              {/* Bagian Bawah: Sertifikat (Otomatis menyesuaikan jumlah) */}
              <div className="p-6 md:p-10 bg-[#fbfcfd]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
                  <h4 className="text-base font-black text-gray-800 tracking-wide">Sertifikat & Lisensi</h4>
                </div>

                {/* Grid ini yang bikin 8 sertifikat otomatis rapi menyusun ke bawah */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {coach.certificates.map((cert) => (
                    <div key={cert.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-row md:flex-col">
                      {/* Image Placeholder Mini */}
                      <div className="w-28 md:w-full min-h-[100px] h-auto md:h-36 relative shrink-0 border-r md:border-r-0 md:border-b border-gray-100">
                        <Image 
                          src={cert.img} 
                          alt={`Sertifikat ${cert.title}`} 
                          fill 
                          sizes="(max-width: 768px) 112px, 33vw"
                          className="object-cover object-center" 
                        />
                        <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors"></div>
                      </div>
                      
                      {/* Info Sertifikat */}
                      <div className="p-4 flex flex-col justify-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold text-white mb-2 self-start ${cert.color}`}>
                          {cert.badge}
                        </span>
                        <h5 className="text-gray-900 font-black text-[13px] leading-snug mb-1 line-clamp-2">{cert.title}</h5>
                        <p className="text-gray-500 text-[11px] font-semibold line-clamp-1">{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
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