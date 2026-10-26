export interface Coach {
    id: number | string;
    name: string;
    role: string;
    image: string;
    quote: string;
    en: {
      role: string;
      quote: string;
    };
    certificates: {
        id: number | string;
        title: string;
        issuer: string;
        badge: string;
        color: string;
        img: string;
        en: {
          title: string;
          badge: string;
        };
    }[];
}

export const coachesData: Coach[] = [
    {
      id: 'papi',
      name: 'Herman Juli Prasetyo',
      role: 'Head Coach',
      image: '/head-coach/foto.jpeg',
      quote: '"Panahan bukan hanya soal teknik melepas anak panah. Ini tentang membangun fokus, ketangguhan mental, dan karakter — itulah yang membuat atlet FAST berbeda."',
      en: {
        role: 'Head Coach',
        quote: '"Archery is not just about the technique of releasing an arrow. It is about building focus, mental toughness, and character — that is what makes FAST athletes different."',
      },
      certificates: [
        { id: 1, title: 'Pelatih Panahan Level Nasional (Level A)', issuer: 'PB PERPANI', badge: 'Tingkat Nasional', color: 'bg-red-600', img: '/head-coach/1.jpeg', en: { title: 'National Level Archery Coach (Level A)', badge: 'National Level' } },
        { id: 2, title: 'Pelatih Panahan Tingkat Daerah (Grade B)', issuer: 'Pengprov PERPANI DKI Jakarta', badge: 'Tingkat Daerah', color: 'bg-blue-600', img: '/head-coach/2.jpeg', en: { title: 'Regional Level Archery Coach (Grade B)', badge: 'Regional Level' } },
        { id: 3, title: 'Bidang Pembibitan & Pemanduan Bakat', issuer: 'PB PERPANI', badge: 'Pengurus Besar', color: 'bg-green-600', img: '/head-coach/3.jpeg', en: { title: 'Talent Scouting & Development Division', badge: 'Central Board' } },
        { id: 4, title: 'Official Pelatih PON XX Papua 2021', issuer: 'PB PON XX / KONI', badge: 'PON XX 2021', color: 'bg-orange-500', img: '/head-coach/4.jpeg', en: { title: 'Coach Official, PON XX Papua 2021', badge: 'PON XX 2021' } },
        { id: 5, title: 'Penataran Pelatih Pelatda', issuer: 'KONI Provinsi DKI Jakarta', badge: 'Pelatda', color: 'bg-indigo-600', img: '/head-coach/5.jpeg', en: { title: 'Pelatda Coach Training', badge: 'Pelatda' } },
        { id: 6, title: 'Archery Training Program', issuer: 'Coach Kim Archery School', badge: 'Internasional', color: 'bg-yellow-600', img: '/head-coach/6.jpeg', en: { title: 'Archery Training Program', badge: 'International' } },
        { id: 7, title: 'Pelatih Panahan Tingkat Provinsi', issuer: 'Pengprov PERPANI DKI Jakarta', badge: 'Tingkat Provinsi', color: 'bg-cyan-600', img: '/head-coach/7.jpeg', en: { title: 'Provincial Level Archery Coach', badge: 'Provincial Level' } },
        { id: 8, title: 'Pelatih Panahan Advance', issuer: 'Coach Kim Archery & PERPANI', badge: 'Advance Level', color: 'bg-purple-600', img: '/head-coach/8.jpeg', en: { title: 'Advanced Archery Coach', badge: 'Advance Level' } },
      ]
    },
    // {
    //   id: 'sandhy',
    //   name: 'Coach Sandhy',
    //   role: 'Pelatih Profesional',
    //   image: '/bg-hero.jpg',
    //   quote: '"Disiplin dalam latihan adalah cerminan hasil di lapangan. Kami membentuk atlet yang tidak hanya jago membidik, tapi juga memiliki mental juara."',
    //   certificates: [
    //     { id: 1, title: 'Lisensi Pelatih Tingkat Dasar', issuer: 'Perpani Nasional', badge: 'Lisensi Resmi', color: 'bg-blue-600', img: '/bg-hero.jpg' },
    //     { id: 2, title: 'Sertifikasi Kepelatihan', issuer: 'Kemenpora RI', badge: 'Sertifikat', color: 'bg-orange-500', img: '/bg-hero.jpg' },
    //     { id: 3, title: 'Peserta Kejuaraan Nasional', issuer: 'Kejurnas Panahan 2022', badge: 'Pengalaman', color: 'bg-purple-600', img: '/bg-hero.jpg' },
    //   ]
    // }
];
