import { useState, useEffect, useCallback } from 'react';

export function useLogs() {
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLogs = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/logs');
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.message || 'Gagal mengambil log');
            setLogs(json.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    return { logs, isLoading, error, refetch: fetchLogs };
}