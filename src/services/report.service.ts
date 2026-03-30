import { supabase } from '@/app/lib/supabase';

export async function getMonthlyReportService() {
  const { data, error } = await supabase
    .from('view_laporan_bulanan')
    .select('*');

  if (error) throw new Error(`Gagal ambil laporan bulanan: ${error.message}`);
  return data;
}

export async function getExpenseCategoryService() {
  const { data, error } = await supabase
    .from('view_pengeluaran_kategori')
    .select('*');

  if (error) throw new Error(`Gagal ambil breakdown pengeluaran: ${error.message}`);
  return data;
}