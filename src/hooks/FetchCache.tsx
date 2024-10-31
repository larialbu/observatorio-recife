import { useEffect, useState } from "react";

interface FetchWithCacheResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetchWithCache<T>(url: string, cacheKey: string, dependencies: any[] = [], forceUpdate = false): FetchWithCacheResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData && !forceUpdate) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
      localStorage.setItem(cacheKey, JSON.stringify(jsonData));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, ...dependencies]);

  return { data, loading, error, refetch: fetchData };
}
