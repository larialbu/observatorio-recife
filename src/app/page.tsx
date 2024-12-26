"use client";
import "./styles/home/style.scss";

import { Banner } from "@/components/home/Banner"
import { ExploreSection } from "@/components/home/ExploreSection";
import { Footer } from "@/components/home/Footer";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import { AboutSection } from "@/components/home/AboutSection";
import { Head } from "next/document";
import { useState } from "react";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Função para atualizar o termo de busca
  const handleSearch = (term: string) => {
    console.log("Termo pesquisado:", term); // Verifique o termo aqui
    setSearchTerm(term);
  };


   <Head>
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>

  return (
    <div className="min-h-screen">
      {/* Carrossel */}
      <Banner onSearch={handleSearch} /> {/* Passando a função de busca */}
      
      <ExploreSection searchTerm={searchTerm} /> {/* Passando o termo de busca */}

      <AboutSection />

      <SocialIconsContainer />

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
