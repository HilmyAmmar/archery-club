'use client';

import AdminLayout from '@/components/admin/adminLayout';
import { Download, BarChart3, FileText } from 'lucide-react';

export default function Reports() {
  
  const actionButton = (
    <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm active:scale-95">
      <Download className="w-4 h-4" />
      Ekspor Laporan
    </button>
  );

  return (
    <AdminLayout 
      title="Laporan Keuangan" 
      subtitle="Laporan kas bulanan otomatis"
      action={actionButton}
    >
      <div className="flex flex-col gap-6 animate-in fade-in duration-500">
        
        {/* --- Cards 3 Kolom (Desain Centered) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* Card 1: Total Pemasukan */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 transition-transform hover:scale-[1.02]">
            <p className="text-slate-500 text-sm font-medium">Total Pemasukan</p>
            {/* Garis hijau (pengganti angka skeleton) */}
            <div className="h-1 w-8 bg-emerald-400 rounded-full mt-1"></div>
          </div>

          {/* Card 2: Total Pengeluaran */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 transition-transform hover:scale-[1.02]">
            <p className="text-slate-500 text-sm font-medium">Total Pengeluaran</p>
            {/* Garis merah */}
            <div className="h-1 w-8 bg-rose-400 rounded-full mt-1"></div>
          </div>

          {/* Card 3: Saldo Akhir */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-2 transition-transform hover:scale-[1.02]">
            <p className="text-slate-500 text-sm font-medium">Saldo Akhir</p>
            {/* Garis biru */}
            <div className="h-1 w-8 bg-blue-400 rounded-full mt-1"></div>
          </div>

        </div>

        {/* --- Banner Segera Hadir --- */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
          <div className="bg-blue-100 p-2.5 rounded-lg shrink-0 mt-0.5">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-blue-900 text-lg">Laporan Keuangan — Segera Hadir</h3>
            <p className="text-blue-700/80 text-sm font-medium leading-relaxed">
              Laporan kas bulanan otomatis berisi total pemasukan, pengeluaran, dan saldo akhir. Bisa dicetak atau diekspor ke PDF.
            </p>
          </div>
        </div>

        {/* --- Skeleton Tabel Rincian Transaksi --- */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden mt-2">
          {/* Header Tabel */}
          <div className="border-b border-slate-100 px-6 py-4 flex items-center gap-2 bg-white/50">
            <FileText className="w-4 h-4 text-slate-400" />
            <h3 className="font-semibold text-slate-700 text-sm">Rincian Transaksi</h3>
          </div>
          
          {/* Body Tabel (Kosong) */}
          <div className="p-16 flex items-center justify-center bg-slate-50/50">
            <p className="text-slate-400 text-sm font-medium">Data transaksi akan tampil di sini</p>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}