"use client";
import "./styles/home/style.scss";

import { useState } from "react";
import { Banner } from "@/components/home/Banner";
import { ExploreSection } from "@/components/home/ExploreSection";
import { Footer } from "@/components/home/Footer";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import { AboutUs } from "@/components/home/AboutSection";
import NewsSection from "@/components/home/NewsSection";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Função para atualizar o termo de busca
  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="min-h-screen dark:bg-[#0C1B2B]">
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
