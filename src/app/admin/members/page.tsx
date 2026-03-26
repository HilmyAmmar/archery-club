'use client';

import AdminLayout from '@/components/admin/adminLayout';
import { UserCheck, UserMinus, UserX, Users, PlusCircle } from 'lucide-react';

export default function Members() {
  
  const actionButton = (
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm active:scale-95">
      <PlusCircle className="w-4 h-4" />
      Tambah Member
    </button>
  );

  return (
    <AdminLayout 
      title="Data Member" 
      subtitle="Kelola anggota club panahan FAST"
      action={actionButton}
    >
      <div className="flex flex-col gap-8 animate-in fade-in duration-500">
        
        {/* --- Cards 3 Kolom --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* Card 1: Aktif */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Aktif</p>
              <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Card 2: Cuti */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <UserMinus className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Cuti</p>
              <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Card 3: Keluar */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <UserX className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Keluar</p>
              <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>

        </div>

        {/* --- Banner Segera Hadir --- */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
          <div className="bg-blue-100 p-2.5 rounded-lg shrink-0 mt-0.5">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-blue-900 text-lg">Data Member — Segera Hadir</h3>
            <p className="text-blue-700/80 text-sm font-medium leading-relaxed">
              Tambah member baru, ubah data, ubah status (aktif/cuti/keluar), upload foto profil, dan lihat riwayat perubahan status per member.
            </p>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}