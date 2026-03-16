// src/data/prestasiData.ts

// --- DATA ARSIP JUARA UMUM ---
export const allPrestasiData = [
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

// --- DATA LIPUTAN MEDIA ---
export interface Liputan {
  id: number;
  media: string;
  date: string;
  title: string;
  desc: string;
  link: string;
}

export const liputanData: Liputan[] = [
  {
    id: 1,
    media: 'DelikAsia.com',
    date: '28 Apr 2025',
    title: 'Berlangsung di Lembang, FAST Kodamar Archery Sabet Juara Umum Kasau Cup 2025',
    desc: 'FAST Kodamar Archery tampil gemilang dengan menyabet gelar Juara Umum dalam Kejuaraan Panahan Kasau Cup 2025 kategori umum yang digelar di Lembang. Klub ini memborong total 39 medali.',
    link: 'https://www.delikasia.com/headline-news/berlangsung-di-lembang-fast-kodamar-archery-sabet-juara-umum-kasau-cup-2025'
  },
  {
    id: 2,
    media: 'Berita Dispora DKI',
    date: '10 Okt 2021',
    title: 'Aurel, Yuki & Zaki Raih Emas Panahan Nasional Putra Tim',
    desc: 'Selamat kepada kontingen DKI Aurel Rahmanda Dastra, Yuki Widiyanto & Zaki Malique Iyadin yang berhasil meraih medali emas dari cabang olahraga Panahan – Nasional Putra Tim pada PON XX Papua.',
    link: 'https://berita.dispora.id/news/detail/3951'
  },
  {
    id: 3,
    media: 'Berita Dispora DKI',
    date: '10 Okt 2021',
    title: 'Azaria & Yuki Raih Perunggu Panahan Nasional Mix Tim',
    desc: 'Selamat kepada kontingen DKI Azaria Kinaura Anagatria & Yuki Widiyanto yang berhasil meraih medali perunggu dari cabang olahraga Panahan – Nasional Mix Tim pada ajang PON XX Papua.',
    link: 'https://berita.dispora.id/news/detail/3952'
  },
  {
    id: 4,
    media: 'IG @kemenpora',
    date: 'ASEAN Para Games 2025',
    title: 'Kholidin Sukses Raih Emas di Men’s Individual Recurve Open',
    desc: 'Prestasi membanggakan diraih oleh atlet para archery Indonesia. Kholidin berhasil memperoleh poin tertinggi di babak final setelah berhadapan dengan atlet Indonesia lainnya.',
    link: 'https://www.instagram.com/p/DT189UBgf1r/?igsh=enh1MzA4ZGdjcml5'
  },
  {
    id: 5,
    media: 'IG @republikindonesia',
    date: 'Highlight Internasional',
    title: 'Bidikan Kholidin Tajam dan Membanggakan Merah Putih',
    desc: 'Momen luar biasa dari Kholidin. Lewat bidikannya yang tajam, ia kembali berhasil membawa nama Indonesia dan membanggakan bendera Merah Putih di kancah internasional.',
    link: 'https://www.instagram.com/p/DGUYj11yvsx/?igsh=MWxxMWRyZjEydHV0bA%3D%3D'
  },
  {
    id: 6,
    media: 'Berita Jakarta',
    date: '12 Okt 2021',
    title: 'Kontingen PON XX DKI Senang Terus Dapat Apresiasi Gubernur',
    desc: 'Atlet panahan FAST yang mewakili DKI Jakarta merasa bangga dan termotivasi atas perhatian langsung Gubernur Anies Baswedan yang mengunjungi venue pertandingan di PON XX Papua.',
    link: 'https://m.beritajakarta.id/read/92849/kontingen-pon-xx-dki-senang-terus-dapat-perhatian-dan-apresiasi-gubernur'
  },
  {
    id: 7,
    media: 'Giwangkara.com',
    date: '10 Okt 2021',
    title: 'Tiga Medali Emas Didapatkan Panahan DKI dari PON XX',
    desc: 'Dominasi total diperlihatkan tim panahan DKI Jakarta. Melalui bidikan akurat atlet-atlet terbaiknya, mereka berhasil menyapu bersih tiga medali emas di nomor Nasional Beregu Putra.',
    link: 'https://www.giwangkara.com/olahraga/pr-851394038/tiga-medali-emas-didapatkan-panahan-dki-dari-pon-xx'
  }
];