"use client";
import "./styles/home/style.scss";
import { useState, useEffect } from "react";
import { loadAndSyncBundles } from "@/@api/cache/bundleDecompress";
import { checkSaves } from "@/@api/cache/indexDB";
import { Banner } from "@/components/home/Banner";
import { ExploreSection } from "@/components/home/ExploreSection";
import { Footer } from "@/components/home/Footer";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import { useLoading } from "@/context/LoadingContext";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bundleProgress, setBundleProgress] = useState<{ [key: string]: number }>({});
  const [progress, setProgress] = useState(0);
  const [checkBundles, setCheckBundles] = useState({});
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const { setLoading } = useLoading();

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  useEffect(() => {
    const checkDataAndLoad = async () => {
      setLoading(true);
      setLoadingError(null);
      
      try {
        const response = await fetch("/api/bundles/manifest", { 
          cache: "no-store",
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Erro ao buscar manifest: ${response.status} ${response.statusText}`);
        }
        
        const manifest = await response.json();

        const manifestEntries = Object.entries(manifest).map(([bundleKey, info]: any) => ({
          bundleKey,
          version: info.version,
        }));

        const outdatedBundles = await checkSaves(manifestEntries);
        setCheckBundles(outdatedBundles);
        

        if (!outdatedBundles || outdatedBundles.length === 0) {
          
          const updatedBundleProgress: { [key: string]: number } = {};
          for (const entry of manifestEntries) {
            updatedBundleProgress[entry.bundleKey] = 100;
          }
          setBundleProgress(updatedBundleProgress);
          setProgress(100);
          setLoading(false);
          return;
        }

        const updatedBundleProgress: { [key: string]: number } = {};
        for (const entry of manifestEntries) {
          if (!outdatedBundles.includes(entry.bundleKey)) {
            updatedBundleProgress[entry.bundleKey] = 100;
          } else {
            updatedBundleProgress[entry.bundleKey] = 0;
          }
        }
        setBundleProgress(updatedBundleProgress);
        setProgress(0);


        await loadAndSyncBundles(
          (bundleKey, percent) => {
            setBundleProgress(prev => ({
              ...prev,
              [bundleKey]: percent,
            }));

            const allKeys = Object.keys(manifest);
            const currentProgress = { ...updatedBundleProgress, [bundleKey]: percent };
            const totalProgress = allKeys.reduce((sum, key) => sum + (currentProgress[key] || 0), 0);
            const avgProgress = totalProgress / allKeys.length;
            
            setProgress(Math.min(avgProgress, 99));

          },
          outdatedBundles
        );

        setProgress(100);
        
      } catch (error) {
        console.error("❌ Erro durante inicialização:", error);
        setLoadingError(error instanceof Error ? error.message : 'Erro desconhecido');
        
        setProgress(100);
      } finally {
        setLoading(false);
      }
    };

    checkDataAndLoad();
  }, []);

  if (loadingError) {
    return (
      <div className="min-h-screen dark:bg-[#0C1B2B] flex items-center justify-center">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg max-w-md mx-4">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">⚠️</span>
            <h3 className="font-bold text-lg">Erro de Carregamento</h3>
          </div>
          <p className="mb-4">{loadingError}</p>
          <div className="space-x-2">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
            >
              🔄 Tentar Novamente
            </button>
            <button 
              onClick={() => setLoadingError(null)} 
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
            >
              ✕ Continuar Mesmo Assim
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-[#0C1B2B]">
      <Banner onSearch={handleSearch} />
      <ExploreSection 
        searchTerm={searchTerm} 
        bundleProgress={bundleProgress} 
        progress={progress} 
      />
      <SocialIconsContainer />
      <Footer />
    </div>
  );
};

export default Page;