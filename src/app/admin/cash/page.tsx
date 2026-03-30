'use client';

import AdminLayout from '@/components/admin/adminLayout';
import { 
  PlusCircle, TrendingUp, TrendingDown, Wallet, 
  Search, FileText, CalendarDays, Loader2,
  X, Edit2, Trash2, AlertTriangle, ArrowRightLeft
} from 'lucide-react';
import { useState } from 'react';
import { useCash } from '@/hook/useCash';
import AddTransactionModal from '@/components/admin/cash/AddTransactionModal'; 
import { INITIAL_BANK, INITIAL_TUNAI } from '@/app/lib/constants';

export default function Cash() {
  const { 
    transactions, isLoading, error, 
    addTransaction, updateTransaction, deleteTransaction 
  } = useCash();
  
  // --- STATE MANAGEMENT MODAL & SEARCH ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [tipeFilter, setTipeFilter] = useState('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // --- STATE FILTER RENTANG TANGGAL ---
  // Default: Tanggal 1 bulan ini s/d Hari ini
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    // Langsung tembak string "01" buat tanggal awal bulan
    return `${year}-${month}-01`;
  });

  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    // Format YYYY-MM-DD untuk hari ini
    return `${year}-${month}-${day}`;
  });

  // --- FILTER LOGIC: 1. Filter Berdasarkan Rentang Tanggal ---
  const periodFilteredTransactions = transactions.filter(trx => {
    if (!trx.tanggal) return false;
    // Format YYYY-MM-DD bisa langsung dibandingin pakai string comparison di JS
    return trx.tanggal >= startDate && trx.tanggal <= endDate;
  });

  // --- HITUNG POSISI SALDO REAL-TIME (Dari awal sampai detik ini) ---
  const allInBank = transactions.filter(t => t.tipe === 'pemasukan' && t.metode_pembayaran === 'transfer').reduce((acc, curr) => acc + Number(curr.nominal), 0);
  const allOutBank = transactions.filter(t => t.tipe === 'pengeluaran' && t.metode_pembayaran === 'transfer' && t.kategori !== 'Koreksi Iuran').reduce((acc, curr) => acc + Number(curr.nominal), 0);
  const allInTunai = transactions.filter(t => t.tipe === 'pemasukan' && t.metode_pembayaran === 'tunai').reduce((acc, curr) => acc + Number(curr.nominal), 0);
  const allOutTunai = transactions.filter(t => t.tipe === 'pengeluaran' && t.metode_pembayaran === 'tunai' && t.kategori !== 'Koreksi Iuran').reduce((acc, curr) => acc + Number(curr.nominal), 0);

  const saldoAkhirBank = INITIAL_BANK + allInBank - allOutBank;
  const saldoAkhirTunai = INITIAL_TUNAI + allInTunai - allOutTunai;
  const totalSaldoSemua = saldoAkhirBank + saldoAkhirTunai;

  // --- HITUNG PERFORMA PERIODE (Hanya yang difilter tanggal) ---
  const totalPemasukan = periodFilteredTransactions.filter(t => t.tipe === 'pemasukan').reduce((acc, curr) => acc + Number(curr.nominal), 0);
  const totalPengeluaran = periodFilteredTransactions.filter(t => t.tipe === 'pengeluaran').reduce((acc, curr) => acc + Number(curr.nominal), 0);

  // --- FILTER LOGIC: 2. Filter Berdasarkan Tipe & Search (Untuk Tabel) ---
  const displayedTransactions = periodFilteredTransactions.filter((trx) => {
    const matchSearch = trx.keterangan?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        trx.kategori?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTipe = tipeFilter === 'all' ? true : trx.tipe === tipeFilter;
    return matchSearch && matchTipe;
  });

  // --- HANDLERS ---
  const openAddModal = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (trx: any) => {
    setEditingData(trx);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsProcessing(true);
    try {
      await deleteTransaction(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      alert("Gagal menghapus transaksi");
    } finally {
      setIsProcessing(false);
    }
  };

  const filterSelectClass = "appearance-none bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer transition-all bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat";

  const actionButton = (
    <button 
      onClick={openAddModal}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm shadow-blue-200 active:scale-95"
    >
      <PlusCircle className="w-4 h-4" />
      Catat Transaksi
    </button>
  );

  return (
    <AdminLayout 
      title="Buku Kas" 
      subtitle="Catat dan pantau arus kas masuk dan keluar klub."
      action={actionButton}
    >
      <div className="flex flex-col gap-6 animate-in fade-in duration-500 relative z-10 text-slate-800">
        
        {/* --- KONTROL PERIODE (Rentang Tanggal) --- */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full xl:w-auto">
            <div className="bg-blue-50 p-2.5 rounded-xl shrink-0">
              <CalendarDays className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Filter Periode</h2>
              <p className="text-xs font-medium text-slate-500">Tentukan rentang tanggal riwayat kas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full xl:w-auto overflow-x-auto pb-1 xl:pb-0">
            {/* START DATE */}
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => {
                const newStart = e.target.value;
                setStartDate(newStart);
                if (newStart > endDate) {
                  setEndDate(newStart); 
                }
              }} 
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 shadow-sm w-full sm:w-auto shrink-0 cursor-pointer"
              disabled={isLoading}
            />
            
            <span className="text-slate-400 font-bold text-sm px-1">s/d</span>
            
            {/* END DATE */}
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => {
                const newEnd = e.target.value;
                setEndDate(newEnd);
                if (newEnd < startDate) {
                  setStartDate(newEnd);
                }
              }} 
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 shadow-sm w-full sm:w-auto shrink-0 cursor-pointer"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* PEMASUKAN */}
          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex flex-col gap-4">
            <TrendingUp className="w-10 h-10 p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100" />
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">Pemasukan Periode Ini</p>
              {isLoading ? (
                <div className="h-9 w-32 bg-slate-100 animate-pulse rounded-lg"></div>
              ) : (
                <p className="text-3xl font-black text-slate-800">Rp {totalPemasukan.toLocaleString('id-ID')}</p>
              )}
            </div>
          </div>

          {/* PENGELUARAN */}
          <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm flex flex-col gap-4">
            <TrendingDown className="w-10 h-10 p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100" />
            <div>
              <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">Pengeluaran Periode Ini</p>
              {isLoading ? (
                <div className="h-9 w-32 bg-slate-100 animate-pulse rounded-lg"></div>
              ) : (
                <p className="text-3xl font-black text-slate-800">Rp {totalPengeluaran.toLocaleString('id-ID')}</p>
              )}
            </div>
          </div>

          {/* TOTAL SALDO KAS */}
          <div className="bg-blue-600 p-6 rounded-2xl shadow-xl shadow-blue-200 flex flex-col gap-4 relative overflow-hidden text-white">
            <div className="relative z-10">
              <p className="text-blue-100 text-[11px] font-bold mb-1 uppercase tracking-widest">Total Saldo Kas</p>
              {isLoading ? (
                <div className="h-9 w-48 bg-blue-500 animate-pulse rounded-lg"></div>
              ) : (
                <p className="text-3xl font-black">Rp {totalSaldoSemua.toLocaleString('id-ID')}</p>
              )}
              
              <div className="mt-4 pt-4 border-t border-blue-500 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-blue-200 uppercase tracking-tighter">Bank:</span>
                  {isLoading ? (
                    <div className="h-3 w-24 bg-blue-500 animate-pulse rounded"></div>
                  ) : (
                    <span className="font-black">Rp {saldoAkhirBank.toLocaleString('id-ID')}</span>
                  )}
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-blue-200 uppercase tracking-tighter">Tunai:</span>
                  {isLoading ? (
                    <div className="h-3 w-24 bg-blue-500 animate-pulse rounded"></div>
                  ) : (
                    <span className="font-black">Rp {saldoAkhirTunai.toLocaleString('id-ID')}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium text-sm">
            Oops! Gagal memuat data kas: {error}
          </div>
        )}

        {/* --- TABEL TRANSAKSI --- */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col mt-2">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 shrink-0">
              <ArrowRightLeft className="w-5 h-5 text-blue-600" /> Riwayat Transaksi
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <select 
                value={tipeFilter}
                onChange={(e) => setTipeFilter(e.target.value)}
                className={filterSelectClass}
              >
                <option value="all">Semua Tipe</option>
                <option value="pemasukan">Pemasukan (IN)</option>
                <option value="pengeluaran">Pengeluaran (OUT)</option>
              </select>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari keterangan..." 
                  className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full transition-all bg-white font-medium" 
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-5 w-48">Tanggal</th>
                  <th className="p-5">Kategori & Keterangan</th>
                  <th className="p-5 text-right">Nominal</th>
                  <th className="p-5 text-center">Bukti</th>
                  <th className="p-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
                      <p className="font-medium text-sm">Memuat data kas...</p>
                    </td>
                  </tr>
                ) : displayedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-500">
                      <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="font-medium text-slate-600">Tidak ada transaksi pada periode ini.</p>
                    </td>
                  </tr>
                ) : (
                  displayedTransactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                          <CalendarDays className="w-4 h-4 text-slate-400" />
                          {trx.tanggal}
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-slate-800 flex items-center gap-2">
                            {trx.kategori}
                            {trx.tipe === 'pemasukan' 
                              ? <span className="px-2 py-0.5 text-[10px] bg-emerald-100 text-emerald-700 rounded-md">IN</span>
                              : <span className="px-2 py-0.5 text-[10px] bg-rose-100 text-rose-700 rounded-md">OUT</span>
                            }
                            <span className={`px-2 py-0.5 text-[10px] font-black rounded-md border ${trx.metode_pembayaran === 'tunai' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                              {trx.metode_pembayaran === 'tunai' ? 'TUNAI' : 'BANK'}
                            </span>
                            {trx.payment_id && (
                              <span className="px-2 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded-md font-bold">IURAN</span>
                            )}
                          </span>
                          <span className="text-xs font-medium text-slate-500 truncate max-w-xs">{trx.keterangan}</span>
                        </div>
                      </td>

                      <td className="p-5 text-right">
                        <span className={`font-bold flex items-center justify-end gap-1.5 ${trx.tipe === 'pemasukan' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {trx.tipe === 'pemasukan' ? '+' : '-'} Rp {Number(trx.nominal).toLocaleString('id-ID')}
                        </span>
                      </td>

                      <td className="p-5 text-center">
                        {trx.bukti_transaksi_url ? (
                          <button 
                            onClick={() => setPreviewImage(trx.bukti_transaksi_url)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors"
                          >
                            <FileText className="w-3 h-3" /> Lihat
                          </button>
                        ) : (
                          <span className="text-xs font-medium text-slate-400">-</span>
                        )}
                      </td>

                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          {!trx.payment_id ? (
                            <>
                              <button 
                                onClick={() => openEditModal(trx)}
                                className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                title="Edit Transaksi"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setDeleteTarget(trx)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Hapus Transaksi"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wider">Auto</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- MODALS --- */}
        <AddTransactionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={editingData}
          onSuccess={async (payload) => {
            if (editingData) {
              await updateTransaction(editingData.id, payload);
            } else {
              await addTransaction(payload);
            }
          }}
        />

        {/* MODAL KONFIRMASI DELETE */}
        {deleteTarget && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Hapus Transaksi?</h3>
                <p className="text-slate-500 text-sm">
                  Yakin mau hapus transaksi <strong>{deleteTarget.kategori}</strong> senilai <strong>Rp {Number(deleteTarget.nominal).toLocaleString('id-ID')}</strong>?
                </p>
              </div>
              <div className="p-4 bg-slate-50 flex items-center justify-center gap-3">
                <button 
                  onClick={() => setDeleteTarget(null)}
                  disabled={isProcessing}
                  className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button 
                  onClick={handleConfirmDelete}
                  disabled={isProcessing}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Ya, Hapus!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LIGHTBOX */}
        {previewImage && (
          <div 
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300 cursor-zoom-out" 
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] animate-in zoom-in-95 duration-300">
              <img 
                src={previewImage} 
                alt="Bukti Transaksi"
                className="rounded-2xl shadow-2xl border-4 border-white/20 max-h-[85vh] object-contain bg-slate-900" 
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                onClick={() => setPreviewImage(null)} 
                className="absolute -top-4 -right-4 p-2 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}