import { useState, useEffect, useCallback } from 'react';

export interface CashTransaction {
  id: string;
  tanggal: string;
  tipe: 'pemasukan' | 'pengeluaran';
  kategori: string;
  nominal: number;
  keterangan: string;
  bukti_transaksi_url: string | null;
  payment_id: string | null;
  metode_pembayaran: 'tunai' | 'transfer'; 
  created_at: string;
}

export function useCash() {
  const [transactions, setTransactions] = useState<CashTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Ambil token buat jaga-jaga kalau GET nya diproteksi juga
      const token = localStorage.getItem('token');
      const res = await fetch('/api/cash', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.message || 'Gagal mengambil data kas');
      setTransactions(json.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async (payload: Partial<CashTransaction>) => {
    // 2. Pasang token buat POST
    const token = localStorage.getItem('token');
    const res = await fetch('/api/cash', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });
    
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal menyimpan transaksi');

    await fetchTransactions();
    return json.data;
  };

  const updateTransaction = async (id: string, payload: Partial<CashTransaction>) => {
    // 3. Pasang token buat PUT
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/cash/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });
    
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal update transaksi');
    
    await fetchTransactions();
    return json.data;
  };

  const deleteTransaction = async (id: string) => {
    // 4. Pasang token buat DELETE
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/cash/${id}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal menghapus transaksi');
    
    await fetchTransactions();
  };

  return { transactions, isLoading, error, refetch: fetchTransactions, addTransaction, updateTransaction, deleteTransaction };
}