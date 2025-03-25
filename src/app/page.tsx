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
import { useLoading } from "@/app/layout";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bundleProgress, setBundleProgress] = useState<{ [key: string]: number }>({});
  const [progress, setProgress] = useState(0);
  const [checkBundles, setCheckBundles] = useState({});
  const { setLoading } = useLoading();

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  useEffect(() => {
    const checkDataAndLoad = async () => {
      setLoading(true);

      const response = await fetch("/manifest.json", { cache: "no-store" });
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
        }
      }
      setBundleProgress(updatedBundleProgress);
      setProgress(0);

      await loadAndSyncBundles((bundleKey, percent) => {
        setBundleProgress(prev => ({
          ...prev,
          [bundleKey]: percent,
        }));

        const allKeys = Object.keys(manifest);
        const individualProgresses = allKeys.map(key =>
          key === bundleKey ? percent : (bundleProgress[key] || 0)
        );
        const avgProgress = individualProgresses.reduce((a, b) => a + b, 0) / allKeys.length;
        setProgress(avgProgress);
      });

      setLoading(false);
    };

    checkDataAndLoad();
  }, []);

  return (
    <div className="min-h-screen dark:bg-[#0C1B2B]">
      <Banner onSearch={handleSearch} />
      <ExploreSection searchTerm={searchTerm} bundleProgress={bundleProgress} progress={progress} />
      <NewsSection />
      <SocialIconsContainer />
      <Footer />
    </div>
  );
};

export default Page;
