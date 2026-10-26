'use client';

import { PlusCircle, X, Loader2, Save, UserCheck, Edit2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { labelOf } from '@/i18n/helpers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  errorMsg: string;
  successMsg: string;
  formData: any;
  isEditMode: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function MemberFormModal({ isOpen, onClose, isLoading, errorMsg, successMsg, formData, isEditMode, onChange, onSubmit }: Props) {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const selectClassName = "w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%24%2024%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* HEADER MODAL */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg shadow-sm ${isEditMode ? 'bg-amber-500' : 'bg-blue-600'}`}>
              {isEditMode ? <Edit2 className="w-5 h-5 text-white" /> : <PlusCircle className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {isEditMode ? t.admin.memberForm.editHeading : t.admin.memberForm.addHeading}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {isEditMode ? t.admin.memberForm.editHint : t.admin.memberForm.addHint}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY MODAL */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {errorMsg && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-3">
              <X className="w-5 h-5 shrink-0 mt-0.5" /> <p>{errorMsg}</p>
            </div>
          )}
          {successMsg && (
            <div className="mb-6 bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm font-medium border border-emerald-100 flex items-start gap-3">
              <UserCheck className="w-5 h-5 shrink-0 mt-0.5" /> <p>{successMsg}</p>
            </div>
          )}

          <form id="member-form" onSubmit={onSubmit} className="flex flex-col gap-8">
            {/* --- DATA UTAMA --- */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-slate-200"></span> {t.admin.memberForm.mainData}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.fullName} <span className="text-red-500">*</span></label>
                  <input required type="text" name="nama_lengkap" value={formData.nama_lengkap} onChange={onChange} placeholder={t.admin.memberForm.fullNamePlaceholder} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.gender} <span className="text-red-500">*</span></label>
                  <select required name="jenis_kelamin" value={formData.jenis_kelamin || ""} onChange={onChange} className={selectClassName}>
                    <option value="" disabled hidden>{t.admin.memberForm.genderPlaceholder}</option>
                    <option value="Laki-laki">{labelOf(t.admin.genderLabels, "Laki-laki")}</option>
                    <option value="Perempuan">{labelOf(t.admin.genderLabels, "Perempuan")}</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.membershipType} <span className="text-red-500">*</span></label>
                  <select required name="tipe_membership" value={formData.tipe_membership || ""} onChange={onChange} className={selectClassName}>
                    <option value="" disabled hidden>{t.admin.memberForm.membershipPlaceholder}</option>
                    <option value="Reguler">{labelOf(t.admin.packageLabels, "Reguler")}</option>
                    <option value="Weekend">{labelOf(t.admin.packageLabels, "Weekend")}</option>
                    <option value="Prestasi">{labelOf(t.admin.packageLabels, "Prestasi")}</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.memberStatus} <span className="text-red-500">*</span></label>
                    <select required name="status_member" value={formData.status_member || ""} onChange={onChange} className={selectClassName}>
                        <option value="" disabled hidden>{t.admin.memberForm.statusPlaceholder}</option>
                        <option value="aktif">{t.admin.members.active}</option>
                        <option value="cuti">{t.admin.members.onLeave}</option>
                        <option value="non-aktif">{t.admin.members.inactive}</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.phone}</label>
                  <input 
                    type="text" 
                    name="no_hp_utama" 
                    value={formData.no_hp_utama || ''} 
                    onChange={onChange} 
                    placeholder={t.admin.memberForm.phonePlaceholder} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" 
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.birthPlace}</label>
                  <input type="text" name="tempat_lahir" value={formData.tempat_lahir || ''} onChange={onChange} placeholder={t.admin.memberForm.birthPlacePlaceholder} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.birthDate}</label>
                  <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir || ''} onChange={onChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
            </div>

            {/* --- INFORMASI TAMBAHAN --- */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-slate-200"></span> {t.admin.memberForm.extraInfo}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.school}</label>
                  <input type="text" name="asal_sekolah" value={formData.asal_sekolah || ''} onChange={onChange} placeholder={t.admin.memberForm.schoolPlaceholder} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.guardian}</label>
                  <input type="text" name="nama_wali" value={formData.nama_wali || ''} onChange={onChange} placeholder={t.admin.memberForm.guardianPlaceholder} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.guardianPhone}</label>
                  <input type="text" name="no_hp_wali" value={formData.no_hp_wali || ''} onChange={onChange} placeholder={t.admin.memberForm.guardianPhonePlaceholder} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                </div>
                
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.address}</label>
                  <textarea name="alamat" value={formData.alamat || ''} onChange={onChange} rows={2} placeholder={t.admin.memberForm.addressPlaceholder} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"></textarea>
                </div>
                
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-600">{t.admin.memberForm.notes}</label>
                  <textarea name="catatan" value={formData.catatan || ''} onChange={onChange} rows={2} placeholder={t.admin.memberForm.notesPlaceholder} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* FOOTER MODAL */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} disabled={isLoading} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50">
            {t.admin.common.cancel}
          </button>
          <button type="submit" form="member-form" disabled={isLoading} className={`text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${isEditMode ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> {t.admin.common.saving}</> : <><Save className="w-4 h-4" /> {isEditMode ? t.admin.memberForm.saveChanges : t.admin.memberForm.saveData}</>}
          </button>
        </div>
      </div>
    </div>
  );
}