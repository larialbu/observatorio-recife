"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { loadAndSyncBundles } from "@/@api/cache/bundleDecompress";
import { getVersion } from "@/@api/cache/versionUtils";
import { iconsExplore } from "@/utils/home/ExploreIconsObservatorio";

interface BundleContextType {
  bundleReady: boolean;
  loading: boolean;
  error: string | null;
  currentBundle: string | null;
}

const BundleContext = createContext<BundleContextType>({
  bundleReady: false,
  loading: false,
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentBundle, setCurrentBundle] = useState<string | null>(null);

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

  useEffect(() => {
    const checkAndLoadBundle = async () => {
      const bundleKey = getBundleKeyFromPath(pathname);

      if (!bundleKey) {
        setBundleReady(true);
        setLoading(false);
        setCurrentBundle(null);
        return;
      }

      setCurrentBundle(bundleKey);
      setError(null);

      try {
        const currentVersion = await getVersion(bundleKey);

        const manifestResponse = await fetch("/api/minio/manifest", {
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
          setBundleReady(true);
          setLoading(false);
          return;
        }

        await loadAndSyncBundles(
          (key, progress) => {
            console.log(`Bundle ${key}: ${progress.toFixed(1)}%`);
          },
          [bundleKey]
        );

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
  }, [pathname]);

  return (
    <BundleContext.Provider
      value={{ bundleReady, loading, error, currentBundle }}
    >
      {children}
    </BundleContext.Provider>
  );
};
