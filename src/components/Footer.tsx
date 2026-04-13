// src/components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    // Background sama dengan penutup section Pricing biar seamless
    <footer className="bg-[#0f172a] text-white pt-16 pb-8 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center md:items-start md:flex-row justify-between gap-12 md:gap-8">
        
        {/* --- Brand & VISI MISI --- */}
        <div className="flex flex-col items-center md:items-start max-w-md text-center md:text-left">
          <Link href="#home" className="flex items-center gap-2.5 mb-6 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
              <Image 
                src="/favicon.ico" 
                alt="FAST Logo" 
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <h1 className="text-white font-black text-xl tracking-widest leading-none">FAST</h1>
              <span className="text-[#d97706] text-[8px] font-bold tracking-[0.2em] uppercase mt-1">
                Focus Archery Sport Team
              </span>
            </div>
          </Link>
          
          {/* Blok Visi & Misi */}
          <div className="flex flex-col gap-4 text-blue-100/70 text-[13px] font-medium leading-relaxed">
            <div>
              <span className="text-[#eab308] font-black block mb-1.5 uppercase tracking-widest text-[10px]">Visi</span>
              <p>Menjadikan memanah sebagai salah satu budaya Bangsa Indonesia.</p>
            </div>
            <div>
              <span className="text-[#eab308] font-black block mb-1.5 uppercase tracking-widest text-[10px]">Misi</span>
              <p>Berperan aktif memasyarakatkan olahraga panahan; memberikan pelatihan kepada masyarakat yang ingin belajar memanah; mencetak para pemanah yang handal dan profesional.</p>
            </div>
          </div>
        </div>

        {/* --- Quick Links --- */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-white font-black tracking-widest mb-5 uppercase text-xs">Eksplor</h4>
          <nav className="flex flex-col gap-3.5 items-center md:items-start text-blue-100/70 text-sm font-medium">
            <Link href="#prestasi" className="hover:text-[#eab308] hover:translate-x-1 transition-all">Prestasi</Link>
            <Link href="#coach" className="hover:text-[#eab308] hover:translate-x-1 transition-all">Coach</Link>
            <Link href="#member" className="hover:text-[#eab308] hover:translate-x-1 transition-all">Member</Link>
            <Link href="#galeri" className="hover:text-[#eab308] hover:translate-x-1 transition-all">Galeri</Link>
          </nav>
        </div>

        {/* --- Contact / Socials --- */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-white font-black tracking-widest mb-5 uppercase text-xs">Hubungi Kami</h4>
          <div className="flex flex-col gap-4 items-center md:items-start text-sm text-blue-100/70 font-medium">
            <a href="https://wa.me/6281188037673" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-green-400 transition-colors group">
              <div className="bg-white/5 p-2 rounded-full group-hover:bg-green-400/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </div>
              <span>WhatsApp Admin</span>
            </a>
            <a href="https://www.instagram.com/fast.kodamar/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#eab308] transition-colors group">
              <div className="bg-white/5 p-2 rounded-full group-hover:bg-[#eab308]/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <span>@fast.kodamar</span>
            </a>
          </div>
        </div>

      </div>

      {/* --- Divider Copyright Bawah --- */}
      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-white/10 text-center flex flex-col items-center">
        <p className="text-blue-100/40 text-xs font-semibold tracking-wide">
          © {new Date().getFullYear()} FAST Archery Sport Team. All rights reserved.
        </p>
      </div>
    </footer>
  );
}