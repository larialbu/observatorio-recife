"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { loadAndSyncBundles } from "@/@api/cache/bundleDecompress";
import { getVersion } from "@/@api/cache/versionUtils";
import { useLoading } from "@/context/LoadingContext";
import { iconsExplore } from "@/utils/home/ExploreIconsObservatorio";

interface BundleContextType {
  bundleReady: boolean;
  error: string | null;
  currentBundle: string | null;
}

const BundleContext = createContext<BundleContextType>({
  bundleReady: false,
  error: null,
  currentBundle: null,
});

export const useBundleContext = () => useContext(BundleContext);

interface BundleProviderProps {
  children: React.ReactNode;
  pathname: string;
}

export const BundleProvider: React.FC<BundleProviderProps> = ({
  children,
  pathname,
}) => {
  const [bundleReady, setBundleReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentBundle, setCurrentBundle] = useState<string | null>(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const { setLoading } = useLoading();

  const getBundleKeyFromPath = (path: string): string | null => {
    const cleanPath = path.split("?")[0];
    for (const category of iconsExplore) {
      for (const item of category.items) {
        const itemPath = item.href.split("?")[0];
        if (itemPath === cleanPath) {
          return item.bundleKey;
        }
      }
    }
    return null;
  };

  // Este useEffect precisa ser eliminado kkkk (é o que dá o refresh após 1 segundo)
  useEffect(() => {
    if (shouldRefresh && bundleReady && currentBundle) {
      console.log(`🔄 REFRESH FORÇADO - Bundle ${currentBundle} pronto, recarregando página...`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [shouldRefresh, bundleReady, currentBundle]);

  useEffect(() => {
    const checkAndLoadBundle = async () => {
      const bundleKey = getBundleKeyFromPath(pathname);

      if (!bundleKey) {
        setBundleReady(true);
        setCurrentBundle(null);
        return;
      }

      setCurrentBundle(bundleKey);
      setError(null);
      setLoading(true);

      try {
        const currentVersion = await getVersion(bundleKey);

        const manifestResponse = await fetch("/api/bundles/manifest", {
          cache: "no-store",
        });

        if (!manifestResponse.ok) {
          throw new Error("Erro ao verificar manifest");
        }

        const manifest = await manifestResponse.json();
        const bundleInfo = manifest[bundleKey];

        if (!bundleInfo) {
          throw new Error(`Bundle "${bundleKey}" não encontrado no manifest`);
        }

        if (currentVersion !== null && currentVersion >= bundleInfo.version) {
          console.log(`Bundle ${bundleKey} já está atualizado (v${currentVersion})`);
          setBundleReady(true);
          setLoading(false);
          return;
        }

        console.log(`Baixando bundle ${bundleKey} (v${bundleInfo.version})...`);

        await loadAndSyncBundles(
          (key, progress) => {
            console.log(`Bundle ${key}: ${progress.toFixed(1)}%`);
          },
          [bundleKey]
        );

        console.log(`Bundle ${bundleKey} carregado com sucesso!`);
        
        // GAMBIARRA MISERAVI: dar refresh na página pós download dos bundles
        setShouldRefresh(true);
        setBundleReady(true);

      } catch (err) {
        console.error("Erro ao carregar bundle:", err);
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setBundleReady(false);
      } finally {
        setLoading(false);
      }
    };

    checkAndLoadBundle();
  }, [pathname, setLoading]);

  return (
    <BundleContext.Provider
      value={{ bundleReady, error, currentBundle }}
    >
      {children}
    </BundleContext.Provider>
  );
};