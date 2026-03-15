// src/app/page.tsx
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Prestasi from '@/components/sections/Prestasi';
import Coach from '@/components/sections/Coach';
import Member from '@/components/sections/Member';
import Galeri from '@/components/sections/Galeri';
import Harga from '@/components/sections/Harga';
import Footer from '@/components/Footer';

const IS_UNDER_MAINTENANCE = false;

export default function Home() {
  
  if (IS_UNDER_MAINTENANCE) {
    return (
      <main className="min-h-screen bg-[#000b3d] flex flex-col items-center justify-center px-6 relative overflow-hidden">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Under <span className="text-[#eab308]">Maintenance</span>
          </h1>
          
          <div className="flex items-center gap-3 text-sm font-bold text-orange-400 tracking-widest uppercase bg-white/5 border border-white/10 px-6 py-3 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            Coming Soon
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#0f172a] min-h-screen">
      <Navbar />
      <Hero />
      <Prestasi />
      <Coach />
      <Member />
      <Galeri />
      <Harga />
      <Footer />
    </main>
  );
}