'use client';

import AdminLayout from '@/components/admin/adminLayout';
import { 
  TrendingUp, TrendingDown, Wallet, PieChart, 
  Download, FileSpreadsheet, BarChart3, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart as RePie, Pie, Cell, Legend 
} from 'recharts';
import { useReport } from '@/hook/useReport';
import { TOTAL_INITIAL_BALANCE } from '@/app/lib/constants';
import { useLanguage } from '@/i18n/LanguageProvider';
import { labelOf, localeFor, monthNameFor } from '@/i18n/helpers';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Warna untuk Pie Chart Kategori
const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6'];

export default function FinancialReport() {
  const { monthly, categories, isLoading, error } = useReport();
  const { lang, t } = useLanguage();
  
  // --- 1. PROSES DATA BULANAN (GRAFIK BAR) ---
  const chartData = [...(monthly || [])].reverse().map(item => ({
    name: monthNameFor(lang, item.nama_bulan),
    pemasukan: Number(item.pemasukan) || 0,
    pengeluaran: Number(item.pengeluaran) || 0,
  }));

  // --- 2. PROSES DATA KATEGORI (PIE CHART) ---
  const expenseBreakdown = (categories || []).map((item: any, index: number) => ({
    name: labelOf(t.admin.categoryLabels, item.name),
    value: Number(item.value) || 0,
    color: PIE_COLORS[index % PIE_COLORS.length]
  }));

  const totalPengeluaranBulanIni = expenseBreakdown.reduce((acc: number, curr: any) => acc + curr.value, 0);

  // --- 3. PROSES DATA EXECUTIVE SUMMARY CARDS ---
  const today = new Date();
  const currentMonthNum = today.getMonth() + 1; 
  const currentYearNum = today.getFullYear();

  // Cari data di array 'monthly' yang persis cocok dengan bulan dan tahun hari ini
  const currentMonth = (monthly || []).find((m: any) => 
    Number(m.bulan) === currentMonthNum && Number(m.tahun) === currentYearNum
  ) || null;
  
  const currMasuk = Number(currentMonth?.pemasukan || 0);
  const currKeluar = Number(currentMonth?.pengeluaran || 0);
  const currTarget = Number(currentMonth?.target_iuran || 0);
  const piutangBulanIni = Number(currentMonth?.piutang_iuran || 0);
  const monthLabel = currentMonth ? monthNameFor(lang, currentMonth.nama_bulan) : t.admin.reports.thisMonth;

  // Tetap hitung total histori dari seluruh data yang dikirim API (monthly array)
  const totalPemasukanDB = (monthly || []).reduce((acc: number, curr: any) => acc + Number(curr.pemasukan), 0);
  const totalPengeluaranDB = (monthly || []).reduce((acc: number, curr: any) => acc + Number(curr.pengeluaran), 0);
  
  // Saldo ini adalah posisi Kas FAST detik ini di dunia nyata
  const totalSaldoSaatIni = TOTAL_INITIAL_BALANCE + totalPemasukanDB - totalPengeluaranDB;

  // --- UI HELPER ---
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };
  
  const handleExportExcel = () => {
    if (!monthly || monthly.length === 0) return alert(t.admin.reports.noDataExport);
    
    // Mapping data agar header kolom Excel rapi
    const excelData = monthly.map((m: any) => ({
      [t.admin.reports.colMonth]: monthNameFor(lang, m.nama_bulan),
      [t.admin.reports.colYear]: m.tahun,
      [t.admin.reports.colIncome]: Number(m.pemasukan) || 0,
      [t.admin.reports.colExpense]: Number(m.pengeluaran) || 0,
      [t.admin.reports.colTarget]: Number(m.target_iuran) || 0,
      [t.admin.reports.colReceivable]: Number(m.piutang_iuran) || 0,
      [t.admin.reports.colNet]: (Number(m.pemasukan) || 0) - (Number(m.pengeluaran) || 0)
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Mengatur kelebaran (width) masing-masing kolom
    worksheet['!cols'] = [
      { wch: 15 }, { wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 25 }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, t.admin.reports.sheetName);

    XLSX.writeFile(workbook, `Laporan_Keuangan_FAST_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleDownloadPDF = () => {
    if (!monthly || monthly.length === 0) return alert(t.admin.reports.noDataDownload);

    const doc = new jsPDF();

    // Header Laporan
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42); 
    doc.text(t.admin.reports.pdfTitle, 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(t.admin.reports.pdfPrinted(new Date().toLocaleDateString(localeFor(lang), { day: 'numeric', month: 'long', year: 'numeric' })), 14, 29);
    
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(t.admin.reports.pdfBalance(formatRupiah(totalSaldoSaatIni)), 14, 40);

    // Generate Tabel
    const tableColumn = t.admin.reports.pdfHead;
    const tableRows = monthly.map((m: any) => [
      monthNameFor(lang, m.nama_bulan),
      m.tahun,
      formatRupiah(Number(m.pemasukan) || 0),
      formatRupiah(Number(m.pengeluaran) || 0),
      formatRupiah(Number(m.target_iuran) || 0),
      formatRupiah(Number(m.piutang_iuran) || 0),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 46,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] }, // Warna biru primary tailwind
      styles: { fontSize: 9, cellPadding: 4 },
      columnStyles: {
        2: { halign: 'right' },
        3: { halign: 'right' },
        4: { halign: 'right' },
        5: { halign: 'right' },
      }
    });

    doc.save(`Laporan_Keuangan_FAST_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const actionButton = (
    <div className="flex gap-2">
      <button onClick={handleExportExcel} className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
        {t.admin.reports.exportExcel}
      </button>
      <button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm shadow-blue-200">
        <Download className="w-4 h-4" />
        {t.admin.reports.downloadPdf}
      </button>
    </div>
  );

  return (
    <AdminLayout 
      title={t.admin.reports.title} 
      subtitle={t.admin.reports.subtitle}
      action={actionButton}
    >
      <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
        
        {/* --- ERROR MESSAGE --- */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium text-sm">
            {t.admin.reports.loadFailed(String(error))}
          </div>
        )}

        {/* --- 1. EXECUTIVE SUMMARY CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard 
            title={t.admin.reports.totalBalance} 
            value={formatRupiah(totalSaldoSaatIni)} 
            icon={<Wallet />} 
            color="blue" 
            subtitle={t.admin.reports.totalBalanceHint}
            isLoading={isLoading}
          />
          <StatCard 
            title={t.admin.reports.income(monthLabel)} 
            value={formatRupiah(currMasuk)} 
            icon={<TrendingUp />} 
            color="emerald" 
            subtitle={t.admin.reports.incomeHint}
            isLoading={isLoading}
          />
          <StatCard 
            title={t.admin.reports.expense(monthLabel)} 
            value={formatRupiah(currKeluar)} 
            icon={<TrendingDown />} 
            color="rose" 
            subtitle={t.admin.reports.expenseHint}
            isLoading={isLoading}
          />
          <StatCard 
            title={t.admin.reports.receivable(monthLabel)} 
            value={formatRupiah(piutangBulanIni)} 
            icon={<PieChart />} 
            color="amber" 
            subtitle={t.admin.reports.receivableHint}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* --- 2. GRAFIK TREN KAS (LINE/BAR) --- */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{t.admin.reports.trendTitle}</h3>
                <p className="text-xs text-slate-500 font-medium">{t.admin.reports.trendSubtitle}</p>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              {isLoading ? (
                // SKELETON BAR CHART
                <div className="w-full h-full flex items-end justify-between gap-2 md:gap-6 p-4 pt-10 border-b border-l border-slate-100 animate-pulse">
                  {[40, 70, 45, 90, 60, 80].map((h, i) => (
                    <div key={i} className="flex gap-1 md:gap-2 w-full h-full items-end justify-center">
                      <div className="w-full bg-slate-100 rounded-t-sm" style={{ height: `${h}%` }}></div>
                      <div className="w-full bg-slate-200 rounded-t-sm" style={{ height: `${h - 20}%` }}></div>
                    </div>
                  ))}
                </div>
              ) : chartData.length === 0 ? (
                <EmptyState 
                  icon={<BarChart3 className="w-10 h-10 text-slate-300" />}
                  title={t.admin.reports.noHistory}
                  desc={t.admin.reports.noHistoryHint}
                />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} 
                      dy={10} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      width={80} 
                      tick={{fill: '#64748b', fontSize: 12}} 
                      tickFormatter={(value) => value >= 1000000 
                        ? `Rp ${(value/1000000).toFixed(1)}${t.admin.reports.million}` 
                        : `Rp ${value/1000}k`
                      } 
                    />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                      formatter={(value: any) => formatRupiah(Number(value))}
                    />
                    <Legend 
                      verticalAlign="top" 
                      align="right" 
                      iconType="circle" 
                      wrapperStyle={{paddingBottom: '20px', fontSize: '12px', fontWeight: 700}} 
                    />
                    <Bar dataKey="pemasukan" name={t.admin.reports.seriesIncome} fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                    <Bar dataKey="pengeluaran" name={t.admin.reports.seriesExpense} fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* --- 3. PIE CHART BREAKDOWN PENGELUARAN --- */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{t.admin.reports.allocationTitle}</h3>
              <p className="text-xs text-slate-500 font-medium">{t.admin.reports.allocationSubtitle}</p>
            </div>

            <div className="h-[220px] w-full relative">
              {isLoading ? (
                // SKELETON PIE CHART
                <div className="w-full h-full flex items-center justify-center animate-pulse">
                  <div className="w-40 h-40 rounded-full border-[20px] border-slate-100"></div>
                </div>
              ) : expenseBreakdown.length === 0 ? (
                <EmptyState 
                  icon={<PieChartIcon className="w-10 h-10 text-slate-300" />}
                  title={t.admin.reports.noExpense}
                  desc={t.admin.reports.noExpenseHint}
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
                        ? `${(totalPengeluaranBulanIni / 1000000).toFixed(1)}${t.admin.reports.million}` 
                        : `${(totalPengeluaranBulanIni / 1000).toFixed(0)}k`
                      }
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.admin.reports.totalOut}</span>
                  </div>
                </>
              )}
            </div>

            {/* SKELETON LIST KATEGORI vs REAL DATA */}
            {isLoading ? (
              <div className="flex flex-col gap-3 pr-2 mt-2 border-t border-slate-100 pt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-1/2">
                      <div className="w-2 h-2 rounded-full bg-slate-200 animate-pulse shrink-0" />
                      <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                    </div>
                    <div className="h-3 w-1/4 bg-slate-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : expenseBreakdown.length > 0 && (
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
      </div>
    </AdminLayout>
  );
}

// --- SUB-COMPONENT CARDS ---
// Ditambah prop `isLoading`
function StatCard({ title, value, icon, color, subtitle, isLoading }: any) {
  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100"
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3 group hover:border-blue-400 transition-all cursor-default text-slate-800">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[color]} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{title}</p>
        
        {/* Skeleton Render Duit */}
        {isLoading ? (
          <div className="h-8 w-1/2 bg-slate-100 rounded animate-pulse mt-1 mb-1"></div>
        ) : (
          <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
        )}

        {/* Skeleton Render Subtitle */}
        {isLoading ? (
          <div className="h-3 w-3/4 bg-slate-100 rounded animate-pulse mt-2"></div>
        ) : (
          subtitle && <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{subtitle}</p>
        )}
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