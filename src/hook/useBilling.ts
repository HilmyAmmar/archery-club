import { useState, useEffect, useMemo, useCallback } from 'react';

// 1. TAMBAH BUKTI TRANSAKSI DI INTERFACE
export interface BillingRecord {
  id: string;
  member_id: string;
  month: number;
  year: number;
  nominal_tagihan: number;
  nominal_bayar: number;
  tanggal_bayar: string | null;
  status: 'lunas' | 'belum' | 'cicil';
  keterangan: string | null;
  bukti_transaksi: string | null;
  members?: {
    nama_lengkap: string;
    tipe_membership: string;
    no_hp_wali: string;
    nama_wali: string;   
  };
}

export function useBillings() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(String(today.getMonth() + 1));
  const [selectedYear, setSelectedYear] = useState(String(today.getFullYear()));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [billings, setBillings] = useState<BillingRecord[]>([]);
  const [totalActiveMembers, setTotalActiveMembers] = useState(0); 
  const [isFetching, setIsFetching] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<BillingRecord | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // --- 1. Fungsi Cek Jumlah Member Aktif ---
  const checkTotalActiveMembers = useCallback(async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/billings/count', {
            headers: { 'Authorization': `Bearer ${token}` }
        }); 
        const json = await res.json();
        
        if (json.success) {
        setTotalActiveMembers(json.count);
        }
    } catch (error) {
        console.error("Gagal ambil count member:", error);
    }
    }, []);

  // --- 2. FETCH DATA (GET) ---
  const fetchBillings = useCallback(async () => {
    setIsFetching(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/billings?month=${selectedMonth}&year=${selectedYear}`, {
          headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      
      if (json.success) {
        setBillings(json.data);
        await checkTotalActiveMembers(); 
      } else {
        console.error(json.message);
      }
    } catch (error) {
      console.error("Error fetching billings:", error);
    } finally {
      setIsFetching(false);
    }
  }, [selectedMonth, selectedYear, checkTotalActiveMembers]);

  useEffect(() => {
    fetchBillings();
  }, [fetchBillings]);

  // --- 3. GENERATE/SYNC TAGIHAN (POST) ---
  const handleGenerateBilling = async () => {
    setIsGenerating(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/billings', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ month: Number(selectedMonth), year: Number(selectedYear) }),
      });
      const json = await res.json();

      if (json.success) {
        await fetchBillings(); 
        return true;
      } else {
        alert(json.message);
        return false;
      }
    } catch (error) {
      alert('Terjadi kesalahan sistem.');
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  // --- 4. UPDATE PEMBAYARAN (PUT) ---
  const handleSavePayment = async (updatedData: any) => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/billings', {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: updatedData.id,
          nominal_bayar: updatedData.nominal_bayar,
          tanggal_bayar: updatedData.tanggal_bayar,
          keterangan: updatedData.keterangan,
          nominal_tagihan: updatedData.tagihan,
          bukti_transaksi: updatedData.bukti_transaksi
        }),
      });
      
      if ((await res.json()).success) {
        setIsModalOpen(false);
        fetchBillings();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // --- MODAL CONTROLS ---
  const openModal = (bill: BillingRecord) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBill(null);
  };

  // ==========================================
  // --- LOGIC TOMBOL PINTAR (FINAL) ---
  // ==========================================

  const hasData = billings.length > 0;
  const isMissingMembers = hasData && (billings.length < totalActiveMembers);

  const stats = useMemo(() => {
    return billings.reduce(
      (acc, curr) => {
        if (curr.status === 'lunas') acc.lunas++;
        else if (curr.status === 'cicil') acc.cicil++;
        else acc.belum++;
        return acc;
      },
      { lunas: 0, belum: 0, cicil: 0 }
    );
  }, [billings]);

  const filteredBillings = useMemo(() => {
    return billings.filter((bill) => {
      const matchName = bill.members?.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' ? true : bill.status === statusFilter;
      
      return matchName && matchStatus;
    });
  }, [billings, searchQuery, statusFilter]);

  return {
    selectedMonth, setSelectedMonth,
    selectedYear, setSelectedYear,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    billings: filteredBillings,
    stats,
    isFetching,
    isGenerating,
    isUpdating,
    isModalOpen,
    selectedBill,
    openModal,
    closeModal,
    handleGenerateBilling,
    handleSavePayment,
    hasData,
    isMissingMembers, 
    totalActiveMembers
  };
}