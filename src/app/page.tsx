"use client";
import "./styles/home/style.scss";

import { useState, useEffect } from "react";
import { Banner } from "@/components/home/Banner";
import { ExploreSection } from "@/components/home/ExploreSection";
import { Footer } from "@/components/home/Footer";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import { AboutUs } from "@/components/home/AboutSection";
import NewsSection from "@/components/home/NewsSection";
import { loadParquetBundle } from "@/@api/cache/parquetDecompress";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import { checkSaves } from "@/@api/cache/indexDB";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para atualizar o termo de busca
  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  useEffect(() => {
    const checkDataAndLoad = async () => {
      setLoading(true);
      const exists = await checkSaves("parquetDB", "parquetFiles", "dataSaved");

      if (!exists) {
        console.log("Dados não encontrados. Carregando e salvando...");
        await loadParquetBundle();
      } else {
        console.log("Dados já salvos.");
      }

      setLoading(false);
    };

    checkDataAndLoad();
  }, []);

  return (
    <div className="min-h-screen dark:bg-[#0C1B2B]">
      {loading && <LoadingScreen />}
      {/* Banner com input de busca */}
      <Banner onSearch={handleSearch} />

      {/* Seção de Explorar com filtro baseado no termo de busca */}
      <ExploreSection searchTerm={searchTerm} />
      
      {/* Seção de notícias */}
      <NewsSection />

      {/* Ícones sociais */}
      <SocialIconsContainer />

      {/* Rodapé */}
      <Footer />
    </div>
  );
};

export default Page;
