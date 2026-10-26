// src/i18n/dictionary.ts
import { adminEn, adminId } from './admin';

// Kamus teks UI landing page + panel admin. `id` adalah sumber kebenaran, `en` wajib punya struktur yang sama.

const id = {
  nav: {
    home: 'Home',
    achievements: 'Prestasi',
    coach: 'Coach',
    members: 'Member',
    gallery: 'Galeri',
    register: 'Daftar Sekarang',
    toggleMenu: 'Buka/tutup menu',
    switchLanguage: 'Ganti bahasa',
  },
  hero: {
    imageAlt: 'Latihan Panahan Profesional FAST Kodamar',
    headline1: 'Fokus, Bidik,',
    headline2: 'dan Juara',
    headline3: 'Bersama',
    subheadline:
      'Menjadikan memanah sebagai budaya kebanggaan Bangsa. Kami hadir untuk memasyarakatkan, memberikan pelatihan terbaik, serta mencetak atlet pemanah yang handal dan profesional.',
    ctaWhatsapp: 'Chat WA: Konsultasi & Daftar',
    ctaAchievements: 'Lihat Prestasi Kami',
    statTitles: 'Juara Umum',
    statMembers: 'Member Aktif',
    statYears: 'Tahun Berdiri',
  },
  achievements: {
    badge: 'PRESTASI & KEJUARAAN',
    title1: 'Rekam Jejak',
    title2: 'Sang Juara',
    intro:
      'Menorehkan lebih dari 50+ gelar Juara Umum di berbagai ajang kompetisi dari tingkat regional hingga internasional sejak 2016.',
    archiveTitle: 'Arsip Prestasi Lengkap (2016 - 2026)',
    mediaTitle: 'Liputan Media',
    readMore: 'Baca selengkapnya',
  },
  coach: {
    badge: 'Tim Pelatih',
    title1: 'Dibimbing Pelatih',
    title2: 'Pelatda Panahan DKI',
    photoAlt: 'Foto Pelatih Panahan',
    certificates: 'Sertifikat & Lisensi',
    certificateAlt: 'Sertifikat',
  },
  members: {
    badge: 'Hall of Fame',
    title1: 'Member',
    title2: 'Berprestasi',
    intro:
      'Para juara yang telah mengharumkan nama FAST di berbagai kejuaraan tingkat nasional dan internasional.',
    ctaTitle: 'Atlet Berprestasi Lainnya',
    ctaText: 'Jelajahi seluruh rekam jejak juara dari keluarga besar FAST.',
    ctaButton: 'Eksplor Galeri Member',
    viewAll: 'Lihat Semua Member',
    galleryAlt: 'Galeri Member',
    prevImage: 'Gambar Sebelumnya',
    nextImage: 'Gambar Selanjutnya',
    prevMember: 'Member Sebelumnya',
    nextMember: 'Member Selanjutnya',
    slide: 'Slide member',
  },
  gallery: {
    badge: 'Galeri Aktivitas',
    title1: 'Keseruan',
    title2: 'Bersama FAST',
    intro:
      'Dari latihan rutin, kejuaraan bergengsi, hingga momen kebersamaan — semuanya ada di FAST.',
    altRow1: 'Kegiatan Panahan FAST Kodamar - Galeri',
    altRow2: 'Aktivitas Archery Club FAST - Foto',
  },
  pricing: {
    badge: 'Pendaftaran Member',
    title1: 'Pilih Membership',
    title2: 'Terbaikmu',
    intro:
      'Tiga pilihan membership bulanan yang dirancang untuk memaksimalkan perkembangan atlet di semua level, dari pemula hingga kompetitif.',
    popular: 'Paling Populer',
    privateTitle: 'Membership Privat',
    privateText: 'Jadwal sesuai permintaan. Fokus personal selama 2 jam per sesi.',
    privateMax: '(Max 4 orang/sesi)',
    perSession: '/ SESI (2 JAM)',
    privateButton: 'Booking Privat',
    disclaimer: 'Harga membership bulanan di atas belum termasuk biaya pendaftaran awal.',
    feeLabel: 'Biaya Pendaftaran Perdana:',
    feeNote: '(Sumbangan bantalan, Kaos Katun, Buku Scoring).',
    whatsappMessage: (pkgCode: string) =>
      `Halo Admin FAST, saya ingin mendaftar dengan data berikut:\n\nNama :\nAlamat :\nTempat & tgl lahir :\nAsal sekolah :\nNo HP :\nNama Ayah/Ibu :\nNo HP Ayah/Ibu :\n\nPilihan Membership : ${pkgCode}`,
  },
  footer: {
    vision: 'Visi',
    visionText: 'Menjadikan memanah sebagai salah satu budaya Bangsa Indonesia.',
    mission: 'Misi',
    missionText:
      'Berperan aktif memasyarakatkan olahraga panahan; memberikan pelatihan kepada masyarakat yang ingin belajar memanah; mencetak para pemanah yang handal dan profesional.',
    explore: 'Eksplor',
    contact: 'Hubungi Kami',
    whatsappAdmin: 'WhatsApp Admin',
    rights: 'All rights reserved.',
  },
  admin: adminId,
  athletes: {
    back: 'Kembali ke Beranda',
    badge: 'Hall of Fame',
    title1: 'Daftar',
    title2: 'Atlet Fast',
    intro: 'Seluruh rekam jejak atlet kebanggaan FAST yang telah mengharumkan nama klub.',
    searchPlaceholder: 'Cari nama atau event...',
    noResults: 'Hasil tidak ditemukan.',
  },
};

export type Dictionary = typeof id;

const en: Dictionary = {
  nav: {
    home: 'Home',
    achievements: 'Achievements',
    coach: 'Coach',
    members: 'Members',
    gallery: 'Gallery',
    register: 'Register Now',
    toggleMenu: 'Toggle mobile menu',
    switchLanguage: 'Switch language',
  },
  hero: {
    imageAlt: 'Professional Archery Training at FAST Kodamar',
    headline1: 'Focus, Aim,',
    headline2: 'and Win',
    headline3: 'with',
    subheadline:
      "Making archery a source of national pride. We are here to popularize the sport, provide the best training, and produce reliable, professional archery athletes.",
    ctaWhatsapp: 'Chat on WA: Consult & Register',
    ctaAchievements: 'See Our Achievements',
    statTitles: 'Overall Titles',
    statMembers: 'Active Members',
    statYears: 'Years Established',
  },
  achievements: {
    badge: 'ACHIEVEMENTS & CHAMPIONSHIPS',
    title1: 'Track Record of',
    title2: 'Champions',
    intro:
      'Earning more than 50 Overall Champion titles across competitions from regional to international level since 2016.',
    archiveTitle: 'Complete Achievement Archive (2016 - 2026)',
    mediaTitle: 'Media Coverage',
    readMore: 'Read more',
  },
  coach: {
    badge: 'Coaching Team',
    title1: 'Coached by',
    title2: 'DKI Archery Pelatda Coaches',
    photoAlt: 'Archery coach photo',
    certificates: 'Certificates & Licenses',
    certificateAlt: 'Certificate',
  },
  members: {
    badge: 'Hall of Fame',
    title1: 'Outstanding',
    title2: 'Members',
    intro:
      'The champions who have made FAST proud at national and international competitions.',
    ctaTitle: 'More Outstanding Athletes',
    ctaText: 'Explore the full track record of champions from the FAST family.',
    ctaButton: 'Explore Member Gallery',
    viewAll: 'View All Members',
    galleryAlt: 'Member Gallery',
    prevImage: 'Previous Image',
    nextImage: 'Next Image',
    prevMember: 'Previous Member',
    nextMember: 'Next Member',
    slide: 'Member slide',
  },
  gallery: {
    badge: 'Activity Gallery',
    title1: 'Fun Moments',
    title2: 'with FAST',
    intro:
      'From regular training and prestigious championships to moments of togetherness — it all happens at FAST.',
    altRow1: 'FAST Kodamar Archery Activity - Gallery',
    altRow2: 'FAST Archery Club Activity - Photo',
  },
  pricing: {
    badge: 'Member Registration',
    title1: 'Choose Your',
    title2: 'Best Membership',
    intro:
      'Three monthly membership options designed to maximize athlete development at every level, from beginner to competitive.',
    popular: 'Most Popular',
    privateTitle: 'Private Membership',
    privateText: 'Schedule on request. Personal focus for 2 hours per session.',
    privateMax: '(Max 4 people/session)',
    perSession: '/ SESSION (2 HOURS)',
    privateButton: 'Book Private',
    disclaimer: 'The monthly membership prices above do not include the initial registration fee.',
    feeLabel: 'Initial Registration Fee:',
    feeNote: '(Covers target mat contribution, cotton T-shirt, scoring book).',
    // Pesan WA tetap dalam Bahasa Indonesia, karena dibaca admin klub.
    whatsappMessage: id.pricing.whatsappMessage,
  },
  footer: {
    vision: 'Vision',
    visionText: 'To make archery part of the culture of the Indonesian people.',
    mission: 'Mission',
    missionText:
      'To take an active role in popularizing archery; to provide training for people who want to learn archery; to produce reliable and professional archers.',
    explore: 'Explore',
    contact: 'Contact Us',
    whatsappAdmin: 'WhatsApp Admin',
    rights: 'All rights reserved.',
  },
  admin: adminEn,
  athletes: {
    back: 'Back to Home',
    badge: 'Hall of Fame',
    title1: 'List of',
    title2: 'FAST Athletes',
    intro: "The full track record of FAST's proud athletes who have brought honor to the club.",
    searchPlaceholder: 'Search name or event...',
    noResults: 'No results found.',
  },
};

export const dictionaries = { id, en } as const;

export type Language = keyof typeof dictionaries;
export const LANGUAGES: Language[] = ['id', 'en'];
export const DEFAULT_LANGUAGE: Language = 'id';
