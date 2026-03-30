'use client';

import AdminLayout from '@/components/admin/adminLayout';
import { PlusCircle, CheckCircle2, Clock, CreditCard, Search, CalendarDays, ChevronDown, Receipt, X, Loader2, Save, DollarSign, Calendar, UploadCloud, FileText, Users, FilePlus, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useBillings, BillingRecord } from '@/hook/useBilling';
import PaymentModal from '@/components/admin/billing/PaymentModal';

// --- KOMPONEN MODAL KONFIRMASI GENERATE ---
function ConfirmGenerateModal({ isOpen, onClose, onConfirm, periode, isGenerating, count }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, periode: string, isGenerating: boolean, count: number }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[400px] p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 bg-blue-50 border-[6px] border-blue-100/50 rounded-full flex items-center justify-center mb-5">
          <FilePlus className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2">Buat Tagihan Massal?</h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Apakah Anda yakin ingin menerbitkan tagihan massal untuk periode <span className="font-bold text-slate-800">{periode}</span>? Sistem akan membuat data tagihan secara otomatis untuk <span className="font-bold text-slate-800">{count} anggota aktif</span>.
        </p>
        <div className="flex items-center w-full gap-3">
          <button onClick={onClose} disabled={isGenerating} className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all">Batal</button>
          <button onClick={onConfirm} disabled={isGenerating} className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50">
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FilePlus className="w-4 h-4" />}
            {isGenerating ? 'Memproses...' : 'Ya, Terbitkan!'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function Billing() {
  const {
    selectedMonth, setSelectedMonth,
    selectedYear, setSelectedYear,
    searchQuery, setSearchQuery,
    billings, stats,
    isFetching, isGenerating, isUpdating,
    isModalOpen, selectedBill,
    openModal, closeModal,
    handleGenerateBilling, 
    handleSavePayment, 
    hasData,           
    isSyncNeeded,      
    totalActiveMembers 
  } = useBillings();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
  // --- STATE UNTUK FILTER STATUS LOKAL ---
  const [statusFilter, setStatusFilter] = useState('all');

  // Menyaring data tagihan berdasarkan dropdown status
  const displayedBillings = billings.filter((bill) => {
    if (statusFilter === 'all') return true;
    return bill.status === statusFilter;
  });

  // --- LOGIC WHATSAPP INVOICE ---
  const generateWhatsAppLink = (bill: BillingRecord) => {
    let phone = (bill.members as any)?.no_hp_wali || ''; 
    phone = phone.replace(/[^0-9]/g, '');
    if (phone.startsWith('0')) phone = '62' + phone.slice(1);

    const bulanStr = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ][bill.month - 1];

    const statusText = bill.status === 'lunas' ? '✅ LUNAS' : '❌ BELUM LUNAS';

    const message = `Yth. Bapak/Ibu Orang Tua/Wali dari *${bill.members?.nama_lengkap}*,

Berikut kami sampaikan rincian tagihan iuran bulanan FAST:

• Periode: *${bulanStr} ${bill.year}*
• Total Tagihan: *Rp ${bill.nominal_tagihan.toLocaleString('id-ID')}*
• Status: *${statusText}*

Jika status masih belum lunas, mohon kesediaannya untuk menyelesaikan pembayaran. Setelah melakukan transfer, harap segera mengirimkan foto bukti transaksi ke pesan WhatsApp ini agar dapat kami proses ke dalam sistem.

Terima kasih atas perhatian dan kerja samanya.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const onConfirmGenerate = async () => {
    const success = await handleGenerateBilling();
    if (success) {
      setIsConfirmOpen(false);
    }
  };

  const filterSelectClass = "appearance-none bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer w-full sm:w-auto transition-all bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat";

  const actionButton = (
    <button 
      onClick={() => setIsConfirmOpen(true)}
      disabled={isGenerating || isFetching || (hasData && !isSyncNeeded)} 
      className={`
        px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95
        ${isSyncNeeded 
          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200' 
          : hasData 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'}
      `}
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isSyncNeeded ? (
        <PlusCircle className="w-4 h-4" /> 
      ) : hasData ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      ) : (
        <PlusCircle className="w-4 h-4" />
      )}
      
      <span>
        {isGenerating 
          ? 'Memproses...' 
          : isSyncNeeded 
            ? `Sinkronkan (+${totalActiveMembers - billings.length} Anggota)` 
            : hasData 
              ? 'Tagihan Sudah Terbit' 
              : `Terbitkan Tagihan ${selectedMonth}/${selectedYear}`}
      </span>
    </button>
  );

  return (
    <AdminLayout 
      title="Iuran Bulanan" 
      subtitle="Kelola dan pantau pembayaran anggota per periode."
      action={actionButton}
    >
      <div className="flex flex-col gap-6 animate-in fade-in duration-500 relative z-10">
        
        {/* --- KONTROL PERIODE --- */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2.5 rounded-xl">
              <CalendarDays className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Periode Aktif</h2>
              <p className="text-xs font-medium text-slate-500">Pilih bulan tagihan yang ingin dilihat</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className={filterSelectClass} disabled={isFetching}>
              <option value="1">Januari</option>
              <option value="2">Februari</option>
              <option value="3">Maret</option>
              <option value="4">April</option>
              <option value="5">Mei</option>
              <option value="6">Juni</option>
              <option value="7">Juli</option>
              <option value="8">Agustus</option>
              <option value="9">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className={filterSelectClass} disabled={isFetching}>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full blur-2xl"></div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100/50 flex items-center justify-center relative z-10 border border-emerald-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="relative z-10">
              <p className="text-slate-500 text-sm font-semibold mb-1">Lunas</p>
              {isFetching ? <div className="h-8 w-12 bg-slate-200 rounded animate-pulse"></div> : <p className="text-3xl font-black text-slate-800">{stats.lunas}</p>}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-50 rounded-full blur-2xl"></div>
            <div className="w-10 h-10 rounded-xl bg-rose-100/50 flex items-center justify-center relative z-10 border border-rose-100">
              <Clock className="w-5 h-5 text-rose-600" />
            </div>
            <div className="relative z-10">
              <p className="text-slate-500 text-sm font-semibold mb-1">Belum Bayar</p>
              {isFetching ? <div className="h-8 w-12 bg-slate-200 rounded animate-pulse"></div> : <p className="text-3xl font-black text-slate-800">{stats.belum}</p>}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full blur-2xl"></div>
            <div className="w-10 h-10 rounded-xl bg-amber-100/50 flex items-center justify-center relative z-10 border border-amber-100">
              <CreditCard className="w-5 h-5 text-amber-500" />
            </div>
            <div className="relative z-10">
              <p className="text-slate-500 text-sm font-semibold mb-1">Menyicil</p>
              {isFetching ? <div className="h-8 w-12 bg-slate-200 rounded animate-pulse"></div> : <p className="text-3xl font-black text-slate-800">{stats.cicil}</p>}
            </div>
          </div>
        </div>

        {/* --- TABEL TAGIHAN --- */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col mt-2">
          
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Receipt className="w-5 h-5 text-blue-600" /> Status Iuran {selectedMonth}/{selectedYear}
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {/* DROPDOWN FILTER STATUS */}
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={filterSelectClass}
              >
                <option value="all">Semua Status</option>
                <option value="lunas">Lunas</option>
                <option value="belum">Belum Bayar</option>
                <option value="cicil">Menyicil</option>
              </select>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama anggota..." 
                  className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full transition-all bg-white font-medium" 
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-5 w-1/4">Member</th>
                  <th className="p-5">Tagihan</th>
                  <th className="p-5">Dibayar</th>
                  <th className="p-5">Tgl Bayar</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isFetching ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3 text-blue-500" />
                      <p className="font-medium">Memuat data tagihan...</p>
                    </td>
                  </tr>
                ) : displayedBillings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-500">
                      <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="font-medium text-slate-600">Tidak ada tagihan yang sesuai filter.</p>
                    </td>
                  </tr>
                ) : (
                  displayedBillings.map((bill) => (
                    <tr key={bill.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{bill.members?.nama_lengkap}</span>
                          <span className="text-xs font-semibold text-slate-400 mt-0.5">{bill.members?.tipe_membership}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="font-bold text-slate-600">Rp {bill.nominal_tagihan.toLocaleString('id-ID')}</span>
                      </td>
                      <td className="p-5">
                        <span className={`font-bold ${bill.nominal_bayar >= bill.nominal_tagihan ? 'text-emerald-600' : bill.nominal_bayar > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
                          Rp {bill.nominal_bayar.toLocaleString('id-ID')}
                        </span>
                      </td>
                      <td className="p-5 text-sm font-medium text-slate-500">
                        {bill.tanggal_bayar || '-'}
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 text-xs font-bold rounded-lg border w-fit flex items-center gap-1.5 ${
                          bill.status === 'lunas' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          bill.status === 'cicil' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            bill.status === 'lunas' ? 'bg-emerald-500' : 
                            bill.status === 'cicil' ? 'bg-amber-500' : 
                            'bg-rose-500'
                          }`}></span>
                          {bill.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* LOGIKA DISABLE TOMBOL WHATSAPP JIKA NOMOR WALI KOSONG */}
                          {((bill.members as any)?.no_hp_wali) ? (
                            <a 
                              href={generateWhatsAppLink(bill)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-all border border-emerald-100 shadow-sm group/wa"
                              title="Kirim Invoice WA"
                            >
                              <MessageCircle className="w-4 h-4 transition-transform group-hover/wa:scale-110" />
                            </a>
                          ) : (
                            <button 
                              disabled
                              className="p-2.5 bg-slate-50 text-slate-300 rounded-lg border border-slate-100 cursor-not-allowed"
                              title="Nomor WA wali belum terdaftar"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          )}

                          <button 
                            onClick={() => openModal(bill)}
                            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 text-xs font-bold rounded-lg transition-all shadow-sm"
                          >
                            {bill.status === 'lunas' ? 'Edit/Detail' : 'Bayar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>

      <PaymentModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        billingData={selectedBill}
        onSave={handleSavePayment}
        isUpdating={isUpdating}
      />

      <ConfirmGenerateModal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)} 
        onConfirm={onConfirmGenerate} 
        periode={`${selectedMonth}/${selectedYear}`} 
        isGenerating={isGenerating}
        count={isSyncNeeded ? (totalActiveMembers - billings.length) : totalActiveMembers}
      />

    </AdminLayout>
  );
}