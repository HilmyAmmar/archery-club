import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/app/lib/api-client';
import { useLanguage } from '@/i18n/LanguageProvider';

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
  const { t } = useLanguage();
  const [transactions, setTransactions] = useState<CashTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiFetch('/api/cash');
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.message || t.admin.cash.fetchFailed);
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
    const res = await apiFetch('/api/cash', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || t.admin.cash.saveFailed);

    await fetchTransactions();
    return json.data;
  };

  const updateTransaction = async (id: string, payload: Partial<CashTransaction>) => {
    const res = await apiFetch(`/api/cash/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || t.admin.cash.updateFailed);
    
    await fetchTransactions();
    return json.data;
  };

  const deleteTransaction = async (id: string) => {
    const res = await apiFetch(`/api/cash/${id}`, { 
      method: 'DELETE'
    });
    
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || t.admin.cash.deleteFailed);
    
    await fetchTransactions();
  };

  return { transactions, isLoading, error, refetch: fetchTransactions, addTransaction, updateTransaction, deleteTransaction };
}