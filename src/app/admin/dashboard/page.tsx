'use client';

import AdminLayout from '@/components/admin/adminLayout';
import { LayoutDashboard, Users, CreditCard, Wallet, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard" subtitle="Ringkasan kondisi club panahan FAST">
      <div className="flex flex-col gap-8 animate-in fade-in duration-500">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Total Member Aktif</p>
              <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Member Cuti</p>
              <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Iuran Terkumpul Bulan Ini</p>
              <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Saldo Kas Terkini</p>
              <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
          <div className="bg-blue-100 p-2.5 rounded-lg shrink-0 mt-0.5">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-blue-900 text-lg">Dashboard — Segera Hadir</h3>
            <p className="text-blue-700/80 text-sm font-medium">Tampilan ringkasan lengkap: statistik member, iuran bulan ini, grafik kas, dan aktivitas terbaru akan tersedia di milestone berikutnya.</p>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}