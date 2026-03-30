import { supabase } from '@/app/lib/supabase';

export interface CashTransactionPayload {
  tanggal: string;
  tipe: 'pemasukan' | 'pengeluaran';
  kategori: string;
  nominal: number;
  keterangan: string;
  bukti_transaksi_url?: string | null;
}

// 1. Ambil Semua Data
export async function getCashTransactions() {
  const { data, error } = await supabase
    .from('kas_harian')
    .select('*')
    .order('tanggal', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Gagal mengambil data kas: ${error.message}`);
  return data;
}

// 2. Insert Data Baru
export async function createManualTransaction(payload: CashTransactionPayload) {
  const { data, error } = await supabase
    .from('kas_harian')
    .insert([{ ...payload }])
    .select()
    .single();

  if (error) throw new Error(`Gagal mencatat transaksi: ${error.message}`);
  return data;
}

// 3. Update Data (Wajib ada buat API [id] lu)
export async function updateManualTransaction(id: string, payload: Partial<CashTransactionPayload>) {
  const { data, error } = await supabase
    .from('kas_harian')
    .update({
      tanggal: payload.tanggal,
      tipe: payload.tipe,
      kategori: payload.kategori,
      nominal: payload.nominal,
      keterangan: payload.keterangan,
      bukti_transaksi_url: payload.bukti_transaksi_url
    })
    .eq('id', id)
    .is('payment_id', null) // Security: Jangan izinkan edit transaksi iuran otomatis via menu kas
    .select()
    .single();

  if (error) throw new Error(`Gagal update transaksi: ${error.message}`);
  return data;
}

// 4. Delete Data (Wajib ada buat API [id] lu)
export async function deleteManualTransaction(id: string) {
  const { error } = await supabase
    .from('kas_harian')
    .delete()
    .eq('id', id)
    .is('payment_id', null); // Security: Jangan izinkan hapus transaksi iuran otomatis via menu kas

  if (error) throw new Error(`Gagal menghapus transaksi: ${error.message}`);
  return true;
}