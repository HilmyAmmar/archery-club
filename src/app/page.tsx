// src/app/page.tsx
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Prestasi from '@/components/sections/Prestasi';
import Coach from '@/components/sections/Coach';
import Member from '@/components/sections/Member';
import Galeri from '@/components/sections/Galeri';

export default function Home() {
  return (
    <main className="bg-[#0f172a] min-h-screen">
      <Navbar />
      <Hero />
      <Prestasi />
      <Coach />
      <Member />
      <Galeri />
    </main>
  );
}