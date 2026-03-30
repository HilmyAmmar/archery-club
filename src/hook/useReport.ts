import { useState, useEffect, useCallback } from 'react';

export function useReport() {
  const [data, setData] = useState<any>({ monthly: [], categories: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/reports');
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setData(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { ...data, isLoading, error, refetch: fetchReports };
}