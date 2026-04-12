import { useState, useEffect } from 'react';

export interface Member {
  id: string;
  nama_lengkap: string;
  jenis_kelamin: 'Laki-laki' | 'Perempuan';
  tipe_membership: 'Reguler' | 'Weekend' | 'Prestasi';
  status_member: 'aktif' | 'cuti' | 'non-aktif';
  tempat_lahir?: string;
  tanggal_lahir?: string;
  alamat?: string;
  no_hp_utama?: string;
  asal_sekolah?: string;
  nama_wali?: string;    // Baru
  no_hp_wali?: string;   // Baru
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
  nama_wali: string;     // Baru
  no_hp_wali: string;    // Baru
  catatan: string;
}

export function useMembers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

  const initialFormState: MemberFormData = {
    nama_lengkap: '', 
    jenis_kelamin: '', 
    tipe_membership: '', 
    status_member: '', 
    tempat_lahir: '', 
    tanggal_lahir: '', 
    alamat: '', 
    no_hp_utama: '',
    asal_sekolah: '', 
    nama_wali: '',    // Diupdate
    no_hp_wali: '',   // Diupdate
    catatan: ''
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

  const openEditModal = (member: Member) => {
    setErrorMsg('');
    setSuccessMsg('');
    setEditingId(member.id);
    
    setFormData({
      nama_lengkap: member.nama_lengkap || '',
      jenis_kelamin: member.jenis_kelamin || '',
      tipe_membership: member.tipe_membership || '',
      status_member: member.status_member || '',
      tempat_lahir: member.tempat_lahir || '',
      tanggal_lahir: member.tanggal_lahir || '',
      alamat: member.alamat || '',
      no_hp_utama: member.no_hp_utama || '',
      asal_sekolah: member.asal_sekolah || '',
      nama_wali: member.nama_wali || '',   
      no_hp_wali: member.no_hp_wali || '',  
      catatan: member.catatan || ''
    });
    setIsModalOpen(true);
  };

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

    const url = editingId ? `/api/members/${editingId}` : '/api/members';
    const method = editingId ? 'PUT' : 'POST';

    const payload = Object.keys(formData).reduce((acc: any, key) => {
      const value = (formData as any)[key];
      acc[key] = value === "" ? null : value;
      return acc;
    }, {});

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload), 
      });

      const textResponse = await response.text(); 
      let result;
      try { 
        result = JSON.parse(textResponse); 
      } catch { 
        throw new Error(`Gagal memproses respon server: ${textResponse}`); 
      }

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
  
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/members/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Gagal menghapus member');
      
      fetchMembers();
      setDeleteTarget(null);
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
    'non-aktif': members.filter(m => m.status_member === 'non-aktif').length,
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