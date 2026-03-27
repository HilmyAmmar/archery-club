import { useState, useEffect } from 'react';

export interface Member {
  id: string;
  nama_lengkap: string;
  jenis_kelamin: 'Laki-laki' | 'Perempuan';
  tipe_membership: 'Reguler' | 'Weekend' | 'Private' | 'Ekskul';
  status_member: 'aktif' | 'cuti' | 'keluar';
  tempat_lahir?: string;
  tanggal_lahir?: string;
  alamat?: string;
  no_hp_utama?: string;
  asal_sekolah?: string;
  nama_ayah?: string;
  no_hp_ayah?: string;
  nama_ibu?: string;
  no_hp_ibu?: string;
  catatan?: string;
  created_at?: string;
}

interface MemberFormData {
  nama_lengkap: string;
  jenis_kelamin: string;
  tipe_membership: string;
  status_member: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  no_hp_utama: string;
  asal_sekolah: string;
  nama_ayah: string;
  no_hp_ayah: string;
  nama_ibu: string;
  no_hp_ibu: string;
  catatan: string;
}

export function useMembers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  
  // STATE BARU: Untuk Edit & Delete
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

  const initialFormState: MemberFormData = {
    nama_lengkap: '', jenis_kelamin: '', tipe_membership: '', status_member: '',
    tempat_lahir: '', tanggal_lahir: '', alamat: '', no_hp_utama: '',
    asal_sekolah: '', nama_ayah: '', no_hp_ayah: '', nama_ibu: '', no_hp_ibu: '', catatan: ''
  };
  
  const [formData, setFormData] = useState<MemberFormData>(initialFormState);

  const fetchMembers = async () => {
    setIsFetching(true);
    try {
      const res = await fetch('/api/members');
      const data = await res.json();
      if (data.success) setMembers(data.data as Member[]);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // FUNGSI BARU: Buka modal untuk EDIT
  const openEditModal = (member: Member) => {
    setErrorMsg('');
    setSuccessMsg('');
    setEditingId(member.id);
    
    // Isi form dengan data member yang dipilih
    setFormData({
      nama_lengkap: member.nama_lengkap || '',
      jenis_kelamin: member.jenis_kelamin || 'Laki-laki',
      tipe_membership: member.tipe_membership || 'Reguler',
      status_member: member.status_member || 'aktif',
      tempat_lahir: member.tempat_lahir || '',
      tanggal_lahir: member.tanggal_lahir || '',
      alamat: member.alamat || '',
      no_hp_utama: member.no_hp_utama || '',
      asal_sekolah: member.asal_sekolah || '',
      nama_ayah: member.nama_ayah || '',
      no_hp_ayah: member.no_hp_ayah || '',
      nama_ibu: member.nama_ibu || '',
      no_hp_ibu: member.no_hp_ibu || '',
      catatan: member.catatan || ''
    });
    setIsModalOpen(true);
  };

  // FUNGSI BARU: Buka modal untuk TAMBAH (Reset state edit)
  const openAddModal = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Tentukan URL dan Method berdasarkan mode (Edit atau Tambah)
    const url = editingId ? `/api/members/${editingId}` : '/api/members';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const textResponse = await response.text(); 
      let result;
      try { result = JSON.parse(textResponse); } 
      catch { throw new Error(`Gagal memproses respon server: ${textResponse}`); }

      if (!response.ok) throw new Error(result.message || 'Gagal menyimpan data');

      setSuccessMsg(editingId ? 'Data berhasil diperbarui!' : 'Member berhasil ditambahkan!');
      fetchMembers(); 

      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMsg('');
        setEditingId(null);
        setFormData(initialFormState);
      }, 1500);

    } catch (error: any) {
      setErrorMsg(error.message || 'Terjadi kesalahan sistem');
    } finally {
      setIsLoading(false);
    }
  };

  // FUNGSI BARU: Eksekusi hapus data
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/members/${deleteTarget.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Gagal menghapus member');
      
      fetchMembers();
      setDeleteTarget(null); // Tutup modal konfirmasi
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus data. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    aktif: members.filter(m => m.status_member === 'aktif').length,
    cuti: members.filter(m => m.status_member === 'cuti').length,
    keluar: members.filter(m => m.status_member === 'keluar').length,
  };

  return {
    members, stats, isFetching,
    isModalOpen, setIsModalOpen,
    isLoading, errorMsg, successMsg,
    formData, handleChange, handleSubmit,
    openAddModal, openEditModal, editingId,
    deleteTarget, setDeleteTarget, confirmDelete
  };
}