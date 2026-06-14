import { supabase } from "@/app/lib/supabase";

export async function getDashboardDataService() {
  // PAKSA ke Maret 2026 atau gunakan date real-time
  // Agar aman, kita ambil bulan & tahun saat ini
  const d = new Date();
  const currentMonth = d.getMonth() + 1;
  const currentYear = d.getFullYear();

  // 1. Ambil Total Member Aktif & Cuti (Sesuai logic generateMassBilling lu)
  const { count: memberCount, error: memberError } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
    .in('status_member', ['aktif', 'cuti']); // Ikuti kriteria iuran lu

  if (memberError) console.error("Dashboard Member Error:", memberError);

  // 2. Ambil 5 Transaksi Terakhir (Service Kas)
  const { data: recentTransactions } = await supabase
    .from('kas_harian')
    .select('id, tanggal, kategori, nominal, tipe')
    .order('tanggal', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(5);

  // 3. Ambil Semua Data Kas buat hitung Saldo Akhir
  const { data: cashData } = await supabase
    .from('kas_harian')
    .select('nominal, tipe, kategori, metode_pembayaran');
  
  const sumIn = cashData?.filter(t => t.tipe === 'pemasukan').reduce((acc, curr) => acc + Number(curr.nominal), 0) || 0;
  const sumOut = cashData?.filter(t => t.tipe === 'pengeluaran' && t.kategori !== 'Koreksi Iuran').reduce((acc, curr) => acc + Number(curr.nominal), 0) || 0;

  const saldoRekening = cashData
    ?.filter(t => t.metode_pembayaran === 'transfer')
    .reduce((acc, curr) => curr.tipe === 'pemasukan' ? acc + Number(curr.nominal) : acc - Number(curr.nominal), 0) || 0;

  const saldoTunai = cashData
    ?.filter(t => t.metode_pembayaran === 'tunai')
    .reduce((acc, curr) => curr.tipe === 'pemasukan' ? acc + Number(curr.nominal) : acc - Number(curr.nominal), 0) || 0;

  // 4. Ambil Status Iuran Bulan Ini (Service Billing)
  // Pastikan lu udah klik "Terbitkan Tagihan" untuk bulan & tahun ini di UI Iuran
  const { data: payments, error: payError } = await supabase
    .from('payments')
    .select('status')
    .eq('month', currentMonth)
    .eq('year', currentYear);

  if (payError) console.error("Dashboard Payment Error:", payError);

  const lunasCount = payments?.filter(p => p.status === 'lunas').length || 0;
  const totalTagihan = payments?.length || 0;

  return {
    totalMember: memberCount || 0,
    saldoDB: sumIn - sumOut,
    iuranProgress: {
      lunas: lunasCount,
      total: totalTagihan
    },
    recentTransactions: recentTransactions || [],
    saldoRekening, 
    saldoTunai,
  };
}