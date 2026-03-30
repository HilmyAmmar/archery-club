'use client';

import AdminLayout from '@/components/admin/adminLayout';
import { 
  Users, Wallet, ArrowUpRight, ArrowDownRight, 
  Clock, CheckCircle2, ChevronRight, LayoutDashboard,
  Calendar, Loader2, ArrowRightLeft, 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { INITIAL_BANK, INITIAL_TUNAI } from '@/app/lib/constants';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [adminName, setAdminName] = useState('Admin');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setGreeting('Selamat Pagi');
    else if (hour < 15) setGreeting('Selamat Siang');
    else if (hour < 19) setGreeting('Selamat Sore');
    else setGreeting('Selamat Malam');

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setAdminName(userObj.name || userObj.username || 'Admin');
      } catch (e) {
        console.error("Gagal parse user data");
      }
    }

    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/dashboard');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error("Gagal load dashboard", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(num);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard" subtitle="Ringkasan aktivitas klub FAST.">
        <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="font-medium text-sm">Menyiapkan ringkasan...</p>
        </div>
      </AdminLayout>
    );
  }

  // ==========================================================================
  // LOGIC SINKRONISASI SALDO (INITIAL + MUTASI DB)
  // ==========================================================================
  const saldoBankFinal = INITIAL_BANK + Number(data?.saldoRekening || 0);
  const saldoTunaiFinal = INITIAL_TUNAI + Number(data?.saldoTunai || 0);
  const totalSaldoFinal = saldoBankFinal + saldoTunaiFinal;

  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Ringkasan aktivitas dan performa klub FAST hari ini."
    >
      <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-10 text-slate-800">
        
        {/* --- WELCOME BANNER --- */}
        <div className="relative overflow-hidden bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-200">
          <div className="relative z-10">
            <h1 className="text-3xl font-black mb-2">{greeting}, {adminName}! 👋</h1>
            <p className="text-blue-100 font-medium max-w-md">
              Klub panahan FAST terpantau aman. Kamu punya {data?.iuranProgress.total - data?.iuranProgress.lunas} member yang belum bayar iuran bulan ini.
            </p>
          </div>
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute right-20 -bottom-20 w-40 h-40 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>
        </div>

        {/* --- QUICK STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Saldo Kas" 
            value={formatRupiah(totalSaldoFinal)} 
            icon={<Wallet />} 
            color="blue"
            link="/admin/reports"
            subValue={
              <div className="flex flex-col gap-1 mt-1 border-t border-blue-100 pt-2">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-400 uppercase tracking-tighter">Bank:</span>
                  <span className="text-blue-600">{formatRupiah(saldoBankFinal)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-400 uppercase tracking-tighter">Tunai:</span>
                  <span className="text-emerald-600">{formatRupiah(saldoTunaiFinal)}</span>
                </div>
              </div>
            }
          />
          <StatCard 
            title="Total Anggota" 
            value={`${data?.totalMember} Member`} 
            icon={<Users />} 
            color="emerald"
            link="/admin/members"
            subValue={<span className="text-[10px] font-bold text-slate-400 uppercase">Status: Aktif & Cuti</span>}
          />
          <StatCard 
            title="Iuran Terbayar" 
            value={`${data?.iuranProgress.lunas}/${data?.iuranProgress.total}`} 
            icon={<CheckCircle2 />} 
            color="amber"
            link="/admin/billing"
            subValue={<span className="text-[10px] font-bold text-slate-400 uppercase">Progres Kelunasan Bulan Ini</span>}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* --- LEFT: RECENT TRANSACTIONS --- */}
          <div className="lg:col-span-3 flex flex-col gap-4 text-slate-800">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-blue-600" /> Aktivitas Kas Terbaru
              </h3>
              <Link href="/admin/cash" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-50">
                {data?.recentTransactions.length === 0 ? (
                  <div className="p-10 text-center text-slate-400 font-medium text-sm">Belum ada transaksi tercatat.</div>
                ) : (
                  data?.recentTransactions.map((tx: any) => (
                    <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.tipe === 'pemasukan' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                          {tx.tipe === 'pemasukan' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-slate-800 text-sm">{tx.kategori}</p>
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${tx.metode_pembayaran === 'tunai' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                              {tx.metode_pembayaran === 'tunai' ? 'CASH' : 'BANK'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">{tx.tanggal}</p>
                        </div>
                      </div>
                      <span className={`font-black text-sm ${tx.tipe === 'pemasukan' ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {tx.tipe === 'pemasukan' ? '+' : '-'} {formatRupiah(tx.nominal)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* --- RIGHT: INFO HARI INI --- */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-slate-800">
            <h3 className="font-black text-slate-800 text-lg flex items-center gap-2 px-1">
              <Calendar className="w-5 h-5 text-blue-600" /> Informasi Hari Ini
            </h3>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex-1">
              <div className="flex flex-col items-center text-center py-6">
                <div className="text-6xl font-black text-blue-600 mb-2">
                  {new Date().getDate()}
                </div>
                <div className="text-xl font-bold text-slate-800 uppercase tracking-widest">
                  {new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date())}
                </div>
                <div className="mt-6 w-full pt-6 border-t border-slate-100 flex flex-col gap-5 text-left">
                   <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0"></div>
                      <p className="text-sm font-medium text-slate-600">
                        Masih ada <b>{data?.iuranProgress.total - data?.iuranProgress.lunas} member</b> yang belum menyelesaikan iuran bulan ini.
                      </p>
                   </div>
                   <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <p className="text-sm font-medium text-slate-600">
                        Total iuran lunas bulan ini: <b>{formatRupiah(data?.totalNominalIuranLunas || 0)}</b>.
                      </p>
                   </div>
                   <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                      <p className="text-sm font-medium text-slate-600">
                        Jangan lupa input pengeluaran atau pemasukan hari ini agar saldo tetap akurat.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon, color, link, subValue }: any) {
  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100"
  };

  return (
    <Link href={link} className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex flex-col gap-4 group hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 transition-all active:scale-95 text-slate-800">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colorMap[color]} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
        {subValue && <div className="mt-1">{subValue}</div>}
      </div>
    </Link>
  );
}