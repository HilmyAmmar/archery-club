export interface Member {
  id: number | string;
  name: string;
  achievements: string[];
  images: string[];
  isCTA?: boolean;
}

export const membersData: Member[] = [
  // --- TOP 3 (Highlight Hall of Fame) ---
  {
    id: 1,
    name: 'Kholidin',
    achievements: [
      'Medali Emas Asia Para Cup 2025',
      'Medali Emas World Ranking Event 2024 (2 Medali)',
      'Medali Emas Para Archery World Ranking Tournament 2024',
      'Peringkat 6 Kualifikasi Paralympic WPAC Plzen 2023',
      'Medali Perunggu Asian Champ 2023',
      'Medali Emas IWAS 2023 (3 Medali)',
      'Medali Emas World Abilitysport Games 2023',
      'Medali Emas Double Men Recurve APG 2022',
      'Medali Emas, Perak, & Perunggu ASEAN Para Games 2022',
      'Medali Emas Piala Presiden 2022',
      'Medali Perak PON Papua 2021 (Mewakili DKI Jakarta)',
      'Medali Emas PEPARNAS 2021',
    ],
    images: ['/hall-of-fame/foto-1.png'], 
  },
  {
    id: 2,
    name: 'Yuki Widiyanto',
    achievements: [
      'Medali Emas Beregu Nasional Putra PON XX Papua 2021', 
      'Medali Perunggu Perorangan Nasional Putra PON XX Papua 2021',
      'Medali Perunggu Beregu Campuran Nasional pada PON XX Papua 2021', 
      'Medali Emas Perorangan Nasional Putra Jarak 30M Kejurnas Panahan 2017 Aceh',
      'Medali Emas Perorangan Nasional Putra Jarak 40M Kejurnas Panahan 2017 Aceh',
      'Medali Emas Perorangan Nasional Putra Jarak 50M Kejurnas Panahan 2017 Aceh',
      'Medali Perak Beregu campuran Nasional Kejurnas Panahan 2018 Jakarta', 
      'Medali Perak Beregu Putra Nasional Kejurnas Panahan 2018 Jakarta',
      'Medali Emas Nasional Putra Jarak 30M Kejurnas Panahan 2018 Jakarta', 
      'Medali Perak Total Kualifikasi Nasional Putra Kejurnas Panahan 2018 Jakarta',
      'Medali Perak Nasional Putra Jarak 50 M Kejurnas Panahan 2018 Jakarta', 
      'Medali Perak Kualifikasi Beregu Putra Nasional Kejurnas Panahan 2018 Jakarta',
      'Medali Perunggu Nasional Putra Jarak 40M pada Kejurnas Panahan 2018 Jakarta'
    ],
    images: ['/hall-of-fame/foto-2.png', '/hall-of-fame/yuki.jpeg', '/hall-of-fame/yuki-2.jpeg', '/hall-of-fame/yuki-3.jpeg'],
  },
  {
    id: 3,
    name: 'Zaki Malique Iyadin',
    achievements: [
      'Medali Perak Nasional Putra Perorangan PON XXI Aceh-Sumut 2024', 
      'Medali Emas Nasional Putra Individu PON XX Papua 2021', 
      '2 Medali Perak PON Aceh 2024',
      '1 Medali Perunggu PON Aceh 2024',
      '2 Medali Emas PON Papua 2021',
    ],
    images: ['/hall-of-fame/foto-3.png'], 
  },

  // --- ATLET LAINNYA (Masuk ke halaman /atlet) ---
  {
    id: 4,
    name: 'Muhammad Fayyadh Arshanto',
    achievements: [
      '1 Medali Perunggu Total Kualifikasi Beregu Nasional U-13 Putra - Invitasi Cabang Olahraga Panahan Pelajar Provinsi DKI Jakarta 2024',
      '1 Medali Emas Beregu Putra Standar Nasional Prestasi U-13 - Jakarta Utara Archery Championship 2024',
      '1 Medali Emas Eliminasi Individu Putra Recurve/Nasional SMP 15 m - Junior Grand Prix Stage 3 2025',
      '1 Medali Emas Eliminasi Beregu Putra Recurve/Nasional SMP 15 m - Junior Grand Prix Stage 3 2025',
      '1 Medali Perunggu Total Kualifikasi Beregu Nasional U-15 Putra - Invitasi Panahan Pelajar DKI Jakarta 2025',
      '1 Medali Perak Beregu Putra Standard Bow SMP - Student Open 2025',
      '1 Medali Perak Mixed Team Standard Bow SMP - Student Open 2025'
    ],
    images: ['/member/fayyadh.jpg'], 
  },
  {
    id: 5,
    name: 'Zahra Nur Arafah',
    achievements: [
      '1 Medali Emas Beregu Putri Kategori SMP 10 m - Piala Kemenpora 2024',
      '1 Medali Emas Individu Putri Kategori SMA 15 m - Piala Kemenpora 2024',
      '1 Medali Emas Beregu Putri Standar Nasional U15 - Student Open Kemendikbud 2024',
      '1 Medali Perak Individu Recurve U18 Putri - Student Open Kemendikbud 2024',
      '1 Medali Perak Eliminasi Individu U13 Putri - Jakarta Utara Archery Championship 2024',
      '1 Medali Perunggu Beregu Putri U13 - Jakarta Utara Archery Championship 2024',
      '1 Medali Perunggu Beregu Putri U18 - Jakarta Utara Archery Championship 2024',
      '1 Medali Emas Eliminasi Individu Women SMP 15 m - Junior Grand Prix Stage 3 2025',
      '1 Medali Emas Beregu Junior 30 m - Junior Grand Prix Stage 3 2025',
      '1 Medali Emas Kualifikasi Standar Nasional SMP Putri - KASAU Cup 2025',
      '1 Medali Emas Beregu Standar Nasional SMP Putri - KASAU Cup 2025',
      '1 Medali Emas Mixed Team SMP - KASAU Cup 2025',
      '1 Medali Emas Beregu Putri SN/Recurve SMP 20 m - Segar Archery Open 2025',
      '1 Medali Perak Eliminasi SN/Recurve SMP 20 m - Segar Archery Open 2025',
      '1 Medali Perak Kualifikasi SN/Recurve SMP 20 m - Segar Archery Open 2025',
      '1 Medali Perak Mixed Team SN/Recurve SMP 20 m - Segar Archery Open 2025',
      '1 Medali Emas Beregu Putri SN/Recurve SMA 30 m - Segar Archery Open 2025',
      '1 Medali Emas Mixed Team SN/Recurve SMA 30 m - Segar Archery Open 2025',
      '1 Medali Perunggu Kualifikasi SN/Recurve SMA 30 m - Segar Archery Open 2025',
      '1 Medali Emas Eliminasi Beregu Standar Nasional U15 Putri - Kejurnas Antar Klub 2026',
      '1 Medali Perunggu Kualifikasi Individu Standar Nasional U15 Putri - Kejurnas Antar Klub 2026',
      '1 Medali Perak Mixed Team Standar Nasional Umum 40 m - Nalaria Archery Championship 2026',
      '1 Medali Perak Beregu Putri Standar Nasional Umum 40 m - Nalaria Archery Championship 2026',
      '1 Medali Perak Mixed Team Standar Nasional 30 m - Nalaria Archery Championship 2026',
      '1 Medali Perak Beregu Putri Standar Nasional 30 m - Nalaria Archery Championship 2026',
      '1 Medali Perunggu Eliminasi Individu Standar Nasional 30 m Putri - Nalaria Archery Championship 2026',
      '1 Medali Perunggu Kualifikasi Individu Standar Nasional 30 m Putri - Nalaria Archery Championship 2026',
    ],
    images: ['/member/zahra.jpg'], 
  },
];