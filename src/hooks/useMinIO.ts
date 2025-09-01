import { useCallback, useState } from "react";

export interface MinIOFile {
  name: string;
  size?: number;
  lastModified?: string;
}

export interface UseMinIOReturn {
  files: MinIOFile[];
  loading: boolean;
  error: string | null;
  manifest: any;
  listFiles: () => Promise<void>;
  downloadFile: (filename: string) => Promise<ArrayBuffer>;
  getManifest: () => Promise<any>;
  clearError: () => void;
}

export function useMinIO(): UseMinIOReturn {
  const [files, setFiles] = useState<MinIOFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manifest, setManifest] = useState<any>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const listFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/bundles/list');
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setFiles(data.files || []);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao listar arquivos');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadFile = useCallback(async (filename: string): Promise<ArrayBuffer> => {
    setError(null);
    
    try {
      const response = await fetch(`/api/bundles/download/${encodeURIComponent(filename)}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      return await response.arrayBuffer();
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao baixar arquivo';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  }, []);

  const getManifest = useCallback(async (): Promise<any> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/bundles/manifest', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setManifest(data);
      return data;
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao buscar manifest';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    files,
    loading,
    error,
    manifest,
    listFiles,
    downloadFile,
    getManifest,
    clearError,
  };
}