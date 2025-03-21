// Página principal (exemplo de uso)
"use client";
import "./styles/home/style.scss";

import { useState, useEffect } from "react";
import { Banner } from "@/components/home/Banner";
import { ExploreSection } from "@/components/home/ExploreSection";
import { Footer } from "@/components/home/Footer";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import NewsSection from "@/components/home/NewsSection";
import { loadAndSyncBundles } from "@/@api/cache/parquetDecompress";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { checkSaves } from "@/@api/cache/indexDB";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [bundleProgress, setBundleProgress] = useState<{ [key: string]: number }>({});
  const [progress, setProgress] = useState(0) as any;

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  useEffect(() => {
    const checkDataAndLoad = async () => {
      const exists = await checkSaves("parquetDB", "parquetFiles", "dataSaved");

      if (!exists) {
        setProgress(0);
        setLoading(true);
        await loadAndSyncBundles((bundleKey, progress) => {
          setBundleProgress(prev => ({
            ...prev,
            [bundleKey]: progress,
          }));
        });

      } else{
        setProgress(100);
      }
      setLoading(false);
    };

    checkDataAndLoad();
  }, []);

  console.log(bundleProgress)

  return (
    <div className="min-h-screen dark:bg-[#0C1B2B]">
      {loading && <LoadingScreen />}
      <Banner onSearch={handleSearch} />
      <ExploreSection searchTerm={searchTerm} bundleProgress={bundleProgress} progress={progress} />
      <NewsSection />
      <SocialIconsContainer />
      <Footer />
    </div>
  );
};

export default Page;