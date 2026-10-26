'use client';

import AdminLayout from '@/components/admin/adminLayout';
import { 
  Users, Wallet, ArrowUpRight, ArrowDownRight, 
  CheckCircle2, ChevronRight,
  Calendar, ArrowRightLeft, 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/app/lib/api-client';
import { INITIAL_BANK, INITIAL_TUNAI } from '@/app/lib/constants';
import { useLanguage } from '@/i18n/LanguageProvider';
import { localeFor, labelOf } from '@/i18n/helpers';
import Rich from '@/i18n/rich';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { lang, t } = useLanguage();
  const [greetingKey, setGreetingKey] = useState<'greetingMorning' | 'greetingNoon' | 'greetingAfternoon' | 'greetingNight' | ''>('');
  const [adminName, setAdminName] = useState('Admin');
  const [dateInfo, setDateInfo] = useState({ day: '', ts: 0 });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setGreetingKey('greetingMorning');
    else if (hour < 15) setGreetingKey('greetingNoon');
    else if (hour < 19) setGreetingKey('greetingAfternoon');
    else setGreetingKey('greetingNight');

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setAdminName(userObj.name || userObj.username || 'Admin');
      } catch (e) {
        console.error("Gagal parse user data");
      }
    }

    const now = new Date();
    setDateInfo({ day: now.getDate().toString(), ts: now.getTime() });

    const fetchDashboard = async () => {
      try {
        const res = await apiFetch('/api/dashboard');
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

  const monthYear = dateInfo.ts
    ? new Intl.DateTimeFormat(localeFor(lang), { month: 'long', year: 'numeric' }).format(dateInfo.ts)
    : '';
  const unpaidCount = data?.iuranProgress?.total - data?.iuranProgress?.lunas || 0;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(num);
  };

  // ==========================================================================
  // LOGIC SINKRONISASI SALDO (INITIAL + MUTASI DB)
  // ==========================================================================
  const saldoBankFinal = INITIAL_BANK + Number(data?.saldoRekening || 0);
  const saldoTunaiFinal = INITIAL_TUNAI + Number(data?.saldoTunai || 0);
  const totalSaldoFinal = saldoBankFinal + saldoTunaiFinal;

  return (
    <AdminLayout 
      title={t.admin.dashboard.title} 
      subtitle={t.admin.dashboard.subtitle}
    >
      <div className="flex flex-col gap-8 animate-in fade-in duration-700 pb-10 text-slate-800">
        
        {/* --- WELCOME BANNER --- */}
        <div className="relative overflow-hidden bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-200">
          <div className="relative z-10">
            <h1 className="text-3xl font-black mb-2">{greetingKey && t.admin.dashboard[greetingKey]}, {adminName}! 👋</h1>
            {isLoading ? (
              <div className="flex flex-col gap-2 mt-4">
                <div className="h-4 w-3/4 bg-blue-400/50 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-blue-400/50 rounded animate-pulse"></div>
              </div>
            ) : (
              <p className="text-blue-100 font-medium max-w-md">
                {t.admin.dashboard.banner(unpaidCount)}
              </p>
            )}
          </div>
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute right-20 -bottom-20 w-40 h-40 bg-blue-400 rounded-full opacity-30 blur-2xl"></div>
        </div>

        {/* --- QUICK STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title={t.admin.dashboard.totalBalance}
            value={formatRupiah(totalSaldoFinal)}
            icon={<Wallet />}
            color="blue"
            link="/admin/reports"
            isLoading={isLoading}
            subValue={
              <div className="flex flex-col gap-1 mt-1 border-t border-blue-100 pt-2">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-400 uppercase tracking-tighter">{t.admin.dashboard.bank}</span>
                  <span className="text-blue-600">{formatRupiah(saldoBankFinal)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-slate-400 uppercase tracking-tighter">{t.admin.dashboard.cash}</span>
                  <span className="text-emerald-600">{formatRupiah(saldoTunaiFinal)}</span>
                </div>
              </div>
            }
          />
          <StatCard 
            title={t.admin.dashboard.totalMembers}
            value={t.admin.dashboard.memberCount(data?.totalMember || 0)}
            icon={<Users />}
            color="emerald"
            link="/admin/members"
            isLoading={isLoading}
            subValue={<span className="text-[10px] font-bold text-slate-400 uppercase">{t.admin.dashboard.memberStatus}</span>}
          />
          <StatCard 
            title={t.admin.dashboard.duesPaid}
            value={`${data?.iuranProgress?.lunas || 0}/${data?.iuranProgress?.total || 0}`}
            icon={<CheckCircle2 />}
            color="amber"
            link="/admin/billing"
            isLoading={isLoading}
            subValue={<span className="text-[10px] font-bold text-slate-400 uppercase">{t.admin.dashboard.duesProgress}</span>}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* --- LEFT: RECENT TRANSACTIONS --- */}
          <div className="lg:col-span-3 flex flex-col gap-4 text-slate-800">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-blue-600" /> {t.admin.dashboard.recentCash}
              </h3>
              <Link href="/admin/cash" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                {t.admin.dashboard.viewAll} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-50">
                {isLoading ? (
                  // SKELETON TRANSACTIONS
                  [1, 2, 3].map((i) => (
                    <div key={i} className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4 w-full">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse shrink-0"></div>
                        <div className="w-full flex flex-col gap-2">
                          <div className="h-4 w-1/3 bg-slate-100 rounded animate-pulse"></div>
                          <div className="h-3 w-1/4 bg-slate-100 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="h-5 w-20 bg-slate-100 rounded animate-pulse shrink-0"></div>
                    </div>
                  ))
                ) : data?.recentTransactions?.length === 0 ? (
                  <div className="p-10 text-center text-slate-400 font-medium text-sm">{t.admin.dashboard.noTransactions}</div>
                ) : (
                  data?.recentTransactions?.map((tx: any) => (
                    <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.tipe === 'pemasukan' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                          {tx.tipe === 'pemasukan' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-slate-800 text-sm">{labelOf(t.admin.categoryLabels, tx.kategori)}</p>
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${tx.metode_pembayaran === 'tunai' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                              {tx.metode_pembayaran === 'tunai' ? t.admin.dashboard.cashBadge : t.admin.dashboard.bankBadge}
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
              <Calendar className="w-5 h-5 text-blue-600" /> {t.admin.dashboard.todayInfo}
            </h3>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex-1">
              <div className="flex flex-col items-center text-center py-6">
                <div className="text-6xl font-black text-blue-600 mb-2">
                  {dateInfo.day || '-'}
                </div>
                <div className="text-xl font-bold text-slate-800 uppercase tracking-widest">
                  {monthYear || t.admin.common.loadingEllipsis}
                </div>
                <div className="mt-6 w-full pt-6 border-t border-slate-100 flex flex-col gap-5 text-left">
                  {isLoading ? (
                    // SKELETON INFO ITEMS
                    [1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-3 w-full">
                        <div className="w-2 h-2 rounded-full bg-slate-200 mt-1.5 shrink-0 animate-pulse"></div>
                        <div className="flex flex-col gap-2 w-full mt-1">
                          <div className="h-3 w-full bg-slate-100 rounded animate-pulse"></div>
                          <div className="h-3 w-3/4 bg-slate-100 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0"></div>
                        <p className="text-sm font-medium text-slate-600">
                          <Rich text={t.admin.dashboard.unpaid(unpaidCount)} boldClassName="font-bold" />
                        </p>
                      </div>
                      {/* <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                        <p className="text-sm font-medium text-slate-600">
                          Total iuran lunas bulan ini: <b>{formatRupiah(data?.totalNominalIuranLunas || 0)}</b>.
                        </p>
                      </div> */}
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                        <p className="text-sm font-medium text-slate-600">
                          {t.admin.dashboard.reminder}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

// --- SUB-COMPONENT CARDS ---
// Tambah prop `isLoading` ke fungsi
function StatCard({ title, value, icon, color, link, subValue, isLoading }: any) {
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
        
        {/* Conditional Rendering Loading vs Value */}
        {isLoading ? (
          <div className="h-8 w-1/2 bg-slate-100 rounded animate-pulse mt-1 mb-1"></div>
        ) : (
          <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
        )}

        {isLoading ? (
          <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse mt-2"></div>
        ) : (
          subValue && <div className="mt-1">{subValue}</div>
        )}
      </div>
    </Link>
  );
}