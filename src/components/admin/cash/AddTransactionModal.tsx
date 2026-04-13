'use client';

import { X, Loader2, Save, UploadCloud, Calendar, DollarSign, FileText, Wallet, Tag, ArrowRightLeft, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabaseClient } from '@/app/lib/supabase-client';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (payload: any) => Promise<void>;
  initialData?: any; 
}

const KATEGORI_PEMASUKAN = [
  'Pendaftaran Member Baru',
  'Penjualan Merchandise & Alat',
  'Sponsor & Donasi',
  'Pemasukan Event / Lomba',
  'Trial Member',
  'Lain-lain'
];

const KATEGORI_PENGELUARAN = [
  'Honor Pelatih & SDM',
  'Sewa Lapangan & Fasilitas',
  'Pemeliharaan & Kebersihan',
  'Alat Panahan & Perlengkapan',
  'Konsumsi & Operasional',
  'Event & Kompetisi',
  'Administrasi & Bank',
  'Lain-lain'
];

export default function AddTransactionModal({ isOpen, onClose, onSuccess, initialData }: TransactionModalProps) {
  const [formData, setFormData] = useState({
    tanggal: '',
    tipe: 'pengeluaran',
    kategori: '',
    nominal: '',
    keterangan: '',
    bukti_transaksi_url: '',
    metode_pembayaran: 'transfer' // DEFAULT KE TRANSFER
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        tanggal: initialData.tanggal,
        tipe: initialData.tipe,
        kategori: initialData.kategori,
        nominal: initialData.nominal.toString(),
        keterangan: initialData.keterangan || '',
        bukti_transaksi_url: initialData.bukti_transaksi_url || '',
        metode_pembayaran: initialData.metode_pembayaran || 'transfer'
      });
      setImagePreview(initialData.bukti_transaksi_url || null);
    } else if (!initialData && isOpen) {
      setFormData({
        tanggal: new Date().toISOString().split('T')[0],
        tipe: 'pengeluaran',
        kategori: '', 
        nominal: '',
        keterangan: '',
        bukti_transaksi_url: '',
        metode_pembayaran: 'transfer'
      });
      setImagePreview(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const currentCategories = formData.tipe === 'pemasukan' ? KATEGORI_PEMASUKAN : KATEGORI_PENGELUARAN;
  const isCustomCategory = initialData && formData.kategori && !currentCategories.includes(formData.kategori);

  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `manual/${fileName}`;

      const { error: uploadError } = await supabaseClient.storage
        .from('transaction_proofs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabaseClient.storage.from('transaction_proofs').getPublicUrl(filePath);
      
      setFormData(prev => ({ ...prev, bukti_transaksi_url: data.publicUrl }));
      setImagePreview(data.publicUrl);
    } catch (error: any) {
      alert(`Gagal mengunggah gambar: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, bukti_transaksi_url: '' }));
    setImagePreview(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fakeEvent = {
        target: { files: e.dataTransfer.files }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      await handleUploadImage(fakeEvent);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Defense: Nominal tidak boleh negatif
    if (name === 'nominal' && Number(value) < 0) return;

    if (name === 'tipe') {
        setFormData(prev => ({ ...prev, tipe: value, kategori: '' }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Defense: Blokir tombol minus dan karakter aneh
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', '+', 'e', 'E', ','].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSuccess({
        ...formData,
        nominal: Number(formData.nominal),
      });
      onClose();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 text-slate-800">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg shadow-sm bg-blue-600">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">{initialData ? 'Edit Transaksi Kas' : 'Catat Transaksi Baru'}</h2>
                <p className="text-xs text-slate-500 font-medium">Input arus kas manual</p>
              </div>
            </div>
            <button onClick={onClose} disabled={loading || uploading} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar text-slate-800">
            <form id="cash-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold flex items-center gap-2 text-slate-700"><Calendar className="w-4 h-4 text-slate-400" /> Tanggal</label>
                <input required type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 outline-none font-medium" />
              </div>

              {/* NEW FIELD: METODE PEMBAYARAN */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold flex items-center gap-2 text-slate-700"><CreditCard className="w-4 h-4 text-slate-400" /> Metode Kas</label>
                <select 
                  name="metode_pembayaran" 
                  value={formData.metode_pembayaran} 
                  onChange={handleChange} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 outline-none cursor-pointer font-bold text-slate-800"
                >
                  <option value="transfer">Transfer (Bank)</option>
                  <option value="tunai">Tunai (Cash Fisik)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold flex items-center gap-2 text-slate-700"><ArrowRightLeft className="w-4 h-4 text-slate-400" /> Tipe Arus Kas</label>
                <select name="tipe" value={formData.tipe} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 outline-none cursor-pointer font-medium">
                  <option value="" disabled>-- Pilih Tipe --</option>
                  <option value="pemasukan">Pemasukan (+)</option>
                  <option value="pengeluaran">Pengeluaran (-)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold flex items-center gap-2 text-slate-700"><DollarSign className="w-4 h-4 text-slate-400" /> Nominal</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">Rp</span>
                  <input required type="number" name="nominal" placeholder="0" onKeyDown={handleKeyDown} value={formData.nominal} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 font-bold focus:border-blue-500 outline-none" />
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-sm font-bold flex items-center gap-2 text-slate-700"><Tag className="w-4 h-4 text-slate-400" /> Kategori</label>
                <div className="relative">
                  <select 
                    required 
                    name="kategori" 
                    value={formData.kategori} 
                    onChange={handleChange} 
                    className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 outline-none font-medium cursor-pointer"
                  >
                    <option value="" disabled>-- Pilih Kategori --</option>
                    {isCustomCategory && (
                      <option value={formData.kategori}>{formData.kategori} (Data Lama)</option>
                    )}
                    {currentCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-bold flex items-center gap-2 mb-2 text-slate-700"><UploadCloud className="w-4 h-4 text-slate-400" /> Bukti Transaksi (Opsional)</label>
                <div 
                  className={`flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed rounded-2xl transition-all ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <button type="button" onClick={() => imagePreview && setShowLightbox(true)} disabled={!imagePreview} className={`w-24 h-24 rounded-xl bg-white border flex items-center justify-center overflow-hidden shadow-sm shrink-0 transition-all ${isDragging ? 'border-blue-300' : 'border-slate-200 hover:border-blue-300'}`}>
                    {uploading ? <Loader2 className="w-6 h-6 animate-spin text-blue-600" /> : imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-blue-400' : 'text-slate-300'}`} />}
                  </button>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm font-bold text-slate-800">
                      {isDragging ? 'Lepaskan gambar di sini...' : 'Pilih atau Tarik Bukti Transaksi'}
                    </p>
                    <p className="text-xs text-slate-500 mb-3 font-medium">Format JPG, PNG (Maks. 5MB)</p>
                    <input type="file" id="bukti_transaksi_manual" accept="image/*" onChange={handleUploadImage} className="hidden" />
                    <div className="flex gap-2 justify-center sm:justify-start">
                      <label htmlFor="bukti_transaksi_manual" className="cursor-pointer px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold hover:bg-blue-50 transition-all shadow-sm text-slate-700">
                        {imagePreview ? 'Ganti Gambar' : 'Pilih Gambar'}
                      </label>
                      {imagePreview && <button type="button" onClick={handleRemoveImage} className="px-4 py-2 bg-white border border-rose-200 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-50 transition-colors">Hapus</button>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-bold flex items-center gap-2 mb-1.5 text-slate-700"><FileText className="w-4 h-4 text-slate-400" /> Keterangan Tambahan</label>
                <textarea name="keterangan" placeholder="Detail transaksi..." value={formData.keterangan} onChange={handleChange} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none resize-none font-medium" />
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
            <button onClick={onClose} disabled={loading} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all">Batal</button>
            <button type="submit" form="cash-form" disabled={loading || uploading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-50 transition-all">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Simpan Transaksi
            </button>
          </div>
        </div>
      </div>

      {showLightbox && imagePreview && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300 cursor-zoom-out" onClick={() => setShowLightbox(false)}>
          <div className="relative max-w-4xl max-h-[90vh] animate-in zoom-in-95 duration-300">
            <img src={imagePreview} className="rounded-2xl shadow-2xl border-4 border-white/20 max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setShowLightbox(false)} className="absolute -top-4 -right-4 p-2 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5 text-slate-800" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}