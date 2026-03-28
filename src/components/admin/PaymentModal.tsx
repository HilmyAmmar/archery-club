'use client';

import { X, Loader2, Save, Receipt, UploadCloud, Calendar, DollarSign, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BillingRecord } from '@/hook/useBilling';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  billingData: BillingRecord | null;
  onSave: (data: any) => void;
  isUpdating: boolean;
}

export default function PaymentModal({ isOpen, onClose, billingData, onSave, isUpdating }: PaymentModalProps) {
  const [formData, setFormData] = useState({
    nominal_bayar: '',
    tanggal_bayar: '',
    keterangan: ''
  });

  // Sinkronisasi data saat modal dibuka
  useEffect(() => {
    if (billingData) {
      setFormData({
        // Gunakan nominal_bayar dari database jika sudah pernah nyicil
        nominal_bayar: billingData.nominal_bayar > 0 ? billingData.nominal_bayar.toString() : '',
        // Default ke tanggal hari ini jika belum ada tanggal bayar
        tanggal_bayar: billingData.tanggal_bayar || new Date().toISOString().split('T')[0],
        keterangan: billingData.keterangan || ''
      });
    }
  }, [billingData]);

  if (!isOpen || !billingData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kirim payload ke hook -> API
    onSave({ 
      id: billingData.id,
      tagihan: billingData.nominal_tagihan, // Dikirim untuk pembantu kalkulasi status di service
      ...formData 
    });
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg shadow-sm bg-blue-600">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Update Pembayaran</h2>
              <p className="text-xs text-slate-500 font-medium">Catat iuran untuk {billingData.members?.nama_lengkap}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            disabled={isUpdating}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Info Tagihan Card */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Total Tagihan</p>
              <p className="text-2xl font-black text-blue-900">Rp {billingData.nominal_tagihan.toLocaleString('id-ID')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Paket</p>
              <p className="text-sm font-bold text-blue-900">{billingData.members?.tipe_membership}</p>
            </div>
          </div>

          <form id="payment-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Nominal Bayar */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-slate-400" /> Nominal Dibayar <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
                  <input 
                    required 
                    type="number" 
                    name="nominal_bayar" 
                    value={formData.nominal_bayar} 
                    onChange={handleChange} 
                    placeholder="0" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-800 font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" 
                  />
                </div>
                <p className="text-[10px] text-slate-400 italic">* Masukkan total akumulasi pembayaran bulan ini</p>
              </div>

              {/* Tanggal Bayar */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" /> Tanggal Transaksi <span className="text-red-500">*</span>
                </label>
                <input 
                  required 
                  type="date" 
                  name="tanggal_bayar" 
                  value={formData.tanggal_bayar} 
                  onChange={handleChange} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" 
                />
              </div>

              {/* Keterangan */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" /> Catatan Tambahan (Log Cicilan)
                </label>
                <textarea 
                  name="keterangan" 
                  value={formData.keterangan} 
                  onChange={handleChange} 
                  rows={2} 
                  placeholder="Contoh: Cicilan 1 (200rb) tgl 10, Cicilan 2 sisanya..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                ></textarea>
              </div>

              {/* Upload Bukti (Opsional - Keep as UI only for now) */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-slate-400" /> Bukti Transfer (Opsional)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex flex-col items-center justify-center py-2">
                    <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                    <p className="text-xs text-slate-500">Klik untuk upload bukti</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>

            </div>
          </form>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
          <button 
            type="button" 
            onClick={onClose} 
            disabled={isUpdating} 
            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button 
            type="submit" 
            form="payment-form" 
            disabled={isUpdating} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isUpdating ? 'Menyimpan...' : 'Simpan Pembayaran'}
          </button>
        </div>

      </div>
    </div>
  );
}