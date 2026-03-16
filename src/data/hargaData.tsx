export interface Harga {
  id: number | string;
  name: string;
  price: string;
  period: string;
  isPopular: boolean;
  features: string[];
  btnText: string;
  pkgCode: string;
}

export const hargaData: Harga[] = [
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