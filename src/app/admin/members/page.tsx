'use client';

import AdminLayout from '@/components/admin/adminLayout';
import MemberFormModal from '@/components/admin/MemberFormModal';
import { useMembers } from '@/hook/useMember';
import { UserCheck, UserMinus, UserX, PlusCircle, Loader2, Search, Users, Edit2, Trash2, AlertTriangle } from 'lucide-react';

export default function Members() {
  const { 
    members, stats, isFetching, 
    isModalOpen, setIsModalOpen, 
    isLoading, errorMsg, successMsg, 
    formData, handleChange, handleSubmit,
    openAddModal, openEditModal, editingId,
    deleteTarget, setDeleteTarget, confirmDelete
  } = useMembers();

  const actionButton = (
    <button 
      onClick={openAddModal}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm active:scale-95"
    >
      <PlusCircle className="w-4 h-4" /> Tambah Member
    </button>
  );

  return (
    <AdminLayout title="Data Member" subtitle="Kelola anggota club panahan FAST" action={actionButton}>
      <div className="flex flex-col gap-8 animate-in fade-in duration-500 relative z-10">
        
        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Aktif</p>
              {isFetching ? <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div> : <p className="text-2xl font-bold text-slate-800">{stats.aktif}</p>}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <UserMinus className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Cuti</p>
              {isFetching ? <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div> : <p className="text-2xl font-bold text-slate-800">{stats.cuti}</p>}
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <UserX className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Keluar</p>
              {isFetching ? <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div> : <p className="text-2xl font-bold text-slate-800">{stats.keluar}</p>}
            </div>
          </div>
        </div>

        {/* --- TABEL DATA MEMBER --- */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" /> Daftar Anggota
            </h3>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Cari nama..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full sm:w-64 transition-all" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Nama Lengkap</th>
                  <th className="p-4 font-semibold">Kontak</th>
                  <th className="p-4 font-semibold">Paket</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isFetching ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3 text-blue-500" />
                      <p className="font-medium">Memuat data dari database...</p>
                    </td>
                  </tr>
                ) : members.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400">
                      <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="font-medium">Belum ada data member.</p>
                      <p className="text-sm mt-1">Klik "Tambah Member" untuk memulai.</p>
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member.id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{member.nama_lengkap}</span>
                          <span className="text-xs text-slate-500 mt-0.5">{member.jenis_kelamin}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600 font-medium">{member.no_hp_utama || '-'}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200">{member.tipe_membership}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-md flex items-center w-fit gap-1.5 ${
                          member.status_member === 'aktif' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          member.status_member === 'cuti' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          'bg-rose-50 text-rose-700 border border-rose-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${member.status_member === 'aktif' ? 'bg-emerald-500' : member.status_member === 'cuti' ? 'bg-amber-500' : 'bg-rose-500'}`}></span>
                          {member.status_member.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {/* TOMBOL EDIT & DELETE */}
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(member)}
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Edit Member"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setDeleteTarget(member)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Hapus Member"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* --- FORM MODAL (Tambah/Edit) --- */}
      <MemberFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        isLoading={isLoading} 
        errorMsg={errorMsg} 
        successMsg={successMsg} 
        formData={formData} 
        isEditMode={!!editingId} // Tru jika editingId ada isinya
        onChange={handleChange} 
        onSubmit={handleSubmit} 
      />

      {/* --- MODAL KONFIRMASI DELETE --- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Hapus Member?</h3>
              <p className="text-slate-500 text-sm">
                Apakah lu yakin mau menghapus <strong>{deleteTarget.nama_lengkap}</strong>? Data yang dihapus nggak bisa dikembalikan.
              </p>
            </div>
            <div className="p-4 bg-slate-50 flex items-center justify-center gap-3">
              <button 
                onClick={() => setDeleteTarget(null)}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isLoading}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Ya, Hapus!
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}