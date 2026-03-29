'use client';

import { X, Loader2, Save, Receipt, UploadCloud, Calendar, DollarSign, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BillingRecord } from '@/hook/useBilling';
import { supabaseClient } from '@/app/lib/supabase-client'; // Pake client anon

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
    keterangan: '',
    bukti_transaksi: ''
  });

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    if (billingData) {
      setFormData({
        nominal_bayar: billingData.nominal_bayar > 0 ? billingData.nominal_bayar.toString() : '',
        tanggal_bayar: billingData.tanggal_bayar || new Date().toISOString().split('T')[0],
        keterangan: billingData.keterangan || '',
        bukti_transaksi: billingData.bukti_transaksi || ''
      });
      setImagePreview(billingData.bukti_transaksi || null);
    }
  }, [billingData]);

  if (!isOpen || !billingData) return null;

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${billingData.id}_${Date.now()}.${fileExt}`;
      const filePath = `receipts/${fileName}`;

      const { error: uploadError } = await supabaseClient.storage
        .from('transaction_proofs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabaseClient.storage.from('transaction_proofs').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, bukti_transaksi: data.publicUrl }));
      setImagePreview(data.publicUrl);
    } catch (error: any) {
      alert(`Gagal mengunggah gambar: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, bukti_transaksi: '' }));
    setImagePreview(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: billingData.id, tagihan: billingData.nominal_tagihan, ...formData });
  };

  return (
    <>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 text-slate-800">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg shadow-sm bg-blue-600"><Receipt className="w-5 h-5 text-white" /></div>
              <div>
                <h2 className="text-lg font-bold">Pembaruan Pembayaran</h2>
                <p className="text-xs text-slate-500 font-medium">Mencatat iuran untuk {billingData.members?.nama_lengkap}</p>
              </div>
            </div>
            <button onClick={onClose} disabled={isUpdating || uploading} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar text-slate-800">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Total Tagihan</p>
                <p className="text-2xl font-black text-blue-900">Rp {billingData.nominal_tagihan.toLocaleString('id-ID')}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Paket</p>
                <p className="text-sm font-bold text-blue-900">{billingData.members?.tipe_membership}</p>
              </div>
            </div>

            <form id="payment-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold flex items-center gap-2"><DollarSign className="w-4 h-4 text-slate-400" /> Nominal Dibayar</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                  <input required type="number" name="nominal_bayar" value={formData.nominal_bayar} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 font-bold focus:border-blue-500 outline-none" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> Tanggal Transaksi</label>
                <input required type="date" name="tanggal_bayar" value={formData.tanggal_bayar} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold flex items-center gap-2 mb-2"><UploadCloud className="w-4 h-4 text-slate-400" /> Bukti Pembayaran</label>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <button type="button" onClick={() => imagePreview && setShowLightbox(true)} disabled={!imagePreview} className="w-24 h-24 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm shrink-0 transition-all hover:border-blue-300">
                    {uploading ? <Loader2 className="w-6 h-6 animate-spin text-blue-600" /> : imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <UploadCloud className="w-8 h-8 text-slate-300" />}
                  </button>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm font-bold">Pilih Bukti Transfer</p>
                    <p className="text-xs text-slate-500 mb-3">Format JPG, PNG (Maks. 5MB)</p>
                    <input type="file" id="bukti_transaksi" accept="image/*" onChange={handleUploadImage} className="hidden" />
                    <div className="flex gap-2 justify-center sm:justify-start">
                      <label htmlFor="bukti_transaksi" className="cursor-pointer px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:bg-blue-50 transition-all">
                        {imagePreview ? 'Ganti Gambar' : 'Pilih Gambar'}
                      </label>
                      {imagePreview && <button type="button" onClick={handleRemoveImage} className="px-4 py-2 bg-white border border-rose-200 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-50">Hapus</button>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 text-slate-800 font-bold">
                <label className="text-sm font-semibold flex items-center gap-2 mb-1.5"><FileText className="w-4 h-4 text-slate-400 " /> Catatan</label>
                <textarea name="keterangan" value={formData.keterangan} onChange={handleChange} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none resize-none" />
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
            <button onClick={onClose} disabled={isUpdating} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all">Batal</button>
            <button type="submit" form="payment-form" disabled={isUpdating || uploading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-50">
              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isUpdating ? 'Menyimpan...' : 'Simpan Pembayaran'}
            </button>
          </div>
        </div>
      </div>

      {showLightbox && imagePreview && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300 cursor-zoom-out" onClick={() => setShowLightbox(false)}>
          <div className="relative max-w-4xl max-h-[90vh] animate-in zoom-in-95 duration-300">
            <img src={imagePreview} className="rounded-2xl shadow-2xl border-4 border-white/20" onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setShowLightbox(false)} className="absolute -top-4 -right-4 p-2 bg-white rounded-full shadow-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>
      )}
    </>
  );
}