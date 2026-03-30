'use client';

import AdminLayout from '@/components/admin/adminLayout';
import { 
  TrendingUp, TrendingDown, Wallet, PieChart, 
  Download, Calendar, ArrowUpRight, ArrowDownRight,
  FileSpreadsheet, Loader2, BarChart3, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart as RePie, Pie, Cell, Legend 
} from 'recharts';
import { useReport } from '@/hook/useReport';

// ============================================================================
// KONFIGURASI SALDO AWAL (Initial Balance)
// ============================================================================
const INITIAL_BALANCE = 75000000; 

// Warna untuk Pie Chart Kategori
const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6'];

export default function FinancialReport() {
  const { monthly, categories, isLoading, error } = useReport();
  
  // --- 1. PROSES DATA BULANAN (GRAFIK BAR & TABEL) ---
  const chartData = [...(monthly || [])].reverse().map(item => ({
    name: item.nama_bulan,
    pemasukan: Number(item.pemasukan) || 0,
    pengeluaran: Number(item.pengeluaran) || 0,
  }));

  // --- 2. PROSES DATA KATEGORI (PIE CHART) ---
  const expenseBreakdown = (categories || []).map((item: any, index: number) => ({
    name: item.name,
    value: Number(item.value) || 0,
    color: PIE_COLORS[index % PIE_COLORS.length]
  }));

  const totalPengeluaranBulanIni = expenseBreakdown.reduce((acc: number, curr: any) => acc + curr.value, 0);

  // --- 3. PROSES DATA EXECUTIVE SUMMARY CARDS ---
  const currentMonth = monthly && monthly.length > 0 ? monthly[0] : null;
  const currMasuk = Number(currentMonth?.pemasukan || 0);
  const currKeluar = Number(currentMonth?.pengeluaran || 0);
  const currTarget = Number(currentMonth?.target_iuran || 0);
  const piutangBulanIni = currTarget > currMasuk ? currTarget - currMasuk : 0;

  const totalPemasukanDB = (monthly || []).reduce((acc: number, curr: any) => acc + Number(curr.pemasukan), 0);
  const totalPengeluaranDB = (monthly || []).reduce((acc: number, curr: any) => acc + Number(curr.pengeluaran), 0);
  const totalSaldoSaatIni = INITIAL_BALANCE + totalPemasukanDB - totalPengeluaranDB;

  // --- UI HELPER ---
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };
  
  const actionButton = (
    <div className="flex gap-2">
      <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
        Export Excel
      </button>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm shadow-blue-200">
        <Download className="w-4 h-4" />
        Download PDF
      </button>
    </div>
  );

  return (
    <AdminLayout 
      title="Laporan Keuangan" 
      subtitle="Analisis performa dan kesehatan finansial klub FAST."
      action={actionButton}
    >
      <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
        
        {/* --- ERROR MESSAGE --- */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium text-sm">
            Oops! Gagal memuat laporan: {error}
          </div>
        )}

        {/* --- LOADING OVERLAY --- */}
        {isLoading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="font-medium text-sm">Menghitung data finansial...</p>
          </div>
        ) : (
          <>
            {/* --- 1. EXECUTIVE SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard 
                title="Total Saldo Saat Ini" 
                value={formatRupiah(totalSaldoSaatIni)} 
                icon={<Wallet />} 
                color="blue" 
              />
              <StatCard 
                title={`Pemasukan (${currentMonth?.nama_bulan || 'Bulan Ini'})`} 
                value={formatRupiah(currMasuk)} 
                icon={<TrendingUp />} 
                color="emerald" 
              />
              <StatCard 
                title={`Pengeluaran (${currentMonth?.nama_bulan || 'Bulan Ini'})`} 
                value={formatRupiah(currKeluar)} 
                icon={<TrendingDown />} 
                color="rose" 
              />
              <StatCard 
                title={`Piutang (${currentMonth?.nama_bulan || 'Bulan Ini'})`} 
                value={formatRupiah(piutangBulanIni)} 
                icon={<PieChart />} 
                color="amber" 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* --- 2. GRAFIK TREN KAS (LINE/BAR) --- */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Tren Arus Kas</h3>
                    <p className="text-xs text-slate-500 font-medium">Perbandingan pemasukan & pengeluaran bulanan</p>
                  </div>
                </div>
                
                <div className="h-[300px] w-full">
                  {chartData.length === 0 ? (
                    <EmptyState 
                      icon={<BarChart3 className="w-10 h-10 text-slate-300" />}
                      title="Belum Ada Histori Keuangan"
                      desc="Grafik tren akan muncul setelah ada pemasukan atau pengeluaran."
                    />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `Rp ${value/1000}k`} />
                        <Tooltip 
                          cursor={{fill: '#f8fafc'}}
                          contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                          formatter={(value: any) => formatRupiah(Number(value))}
                        />
                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '20px', fontSize: '12px', fontWeight: 700}} />
                        <Bar dataKey="pemasukan" name="Pemasukan" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                        <Bar dataKey="pengeluaran" name="Pengeluaran" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={30} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* --- 3. PIE CHART BREAKDOWN PENGELUARAN --- */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Alokasi Biaya</h3>
                  <p className="text-xs text-slate-500 font-medium">Distribusi pengeluaran bulan ini</p>
                </div>

                <div className="h-[220px] w-full relative">
                  {expenseBreakdown.length === 0 ? (
                    <EmptyState 
                      icon={<PieChartIcon className="w-10 h-10 text-slate-300" />}
                      title="Belum Ada Pengeluaran"
                      desc="Catat kas keluar untuk melihat breakdown biaya."
                    />
                  ) : (
                    <>
                      <ResponsiveContainer width="100%" height="100%">
                        <RePie>
                          <Pie
                            data={expenseBreakdown}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {expenseBreakdown.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => formatRupiah(Number(value))} />
                        </RePie>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                        <span className="text-xl font-black text-slate-800">
                          {totalPengeluaranBulanIni >= 1000000 
                            ? `${(totalPengeluaranBulanIni / 1000000).toFixed(1)}jt` 
                            : `${(totalPengeluaranBulanIni / 1000).toFixed(0)}k`
                          }
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Keluar</span>
                      </div>
                    </>
                  )}
                </div>

                {expenseBreakdown.length > 0 && (
                  <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar max-h-[150px] pr-2 mt-2 border-t border-slate-100 pt-4">
                    {expenseBreakdown.map((item: any) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-xs font-bold text-slate-600 truncate max-w-[150px]" title={item.name}>{item.name}</span>
                        </div>
                        <span className="text-xs font-black text-slate-800">{formatRupiah(item.value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* --- 4. SUMMARY TABLE TREN HISTORIS --- */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" /> Ringkasan Performa Bulanan
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px] table-fixed">
                  <thead>
                    <tr className="bg-white border-b border-slate-100 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                      <th className="p-5 w-[15%]">Bulan</th>
                      <th className="p-5 w-[17%]">Target Iuran</th>
                      <th className="p-5 w-[17%] text-right">Realisasi</th>
                      <th className="p-5 w-[17%] text-right">Pengeluaran</th>
                      <th className="p-5 w-[18%] text-right">Net Profit</th>
                      <th className="p-5 w-[16%] text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-medium text-sm text-slate-700">
                    {monthly?.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-10">
                          <EmptyState 
                            icon={<Calendar className="w-10 h-10 text-slate-300" />}
                            title="Belum Ada Catatan Bulanan"
                            desc="Ringkasan akan muncul otomatis di akhir setiap bulan berjalan."
                          />
                        </td>
                      </tr>
                    ) : (
                      monthly?.map((row: any, idx: number) => {
                        const netProfit = Number(row.pemasukan) - Number(row.pengeluaran);
                        const isSurplus = netProfit >= 0;
                        
                        return (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="p-5 font-bold">{row.nama_bulan} {row.tahun}</td>
                            <td className="p-5 text-slate-500 font-bold">{formatRupiah(row.target_iuran)}</td>
                            <td className="p-5 text-right text-emerald-600 font-bold">{formatRupiah(row.pemasukan)}</td>
                            <td className="p-5 text-right text-rose-500 font-bold">{formatRupiah(row.pengeluaran)}</td>
                            <td className={`p-5 text-right font-black ${isSurplus ? 'text-slate-800' : 'text-rose-600'}`}>
                              {isSurplus ? '+' : ''} {formatRupiah(netProfit)}
                            </td>
                            <td className="p-5 text-center">
                              <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                isSurplus ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                              }`}>
                                {isSurplus ? 'Surplus' : 'Defisit'}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

// --- SUB-COMPONENT CARDS ---
// --- SUB-COMPONENT CARDS ---
function StatCard({ title, value, icon, color }: any) {
  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100"
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3 group hover:border-blue-400 transition-all cursor-default">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[color]} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT EMPTY STATE ---
function EmptyState({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-100">
      <div className="mb-3 p-3 bg-white rounded-full shadow-sm border border-slate-100">
        {icon}
      </div>
      <h4 className="text-sm font-bold text-slate-700 mb-1">{title}</h4>
      <p className="text-xs font-medium text-slate-400 max-w-[250px]">{desc}</p>
    </div>
  );
}