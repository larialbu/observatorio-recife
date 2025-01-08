"use client";
import "./styles/home/style.scss";

import { Banner } from "@/components/home/Banner"
import { ExploreSection } from "@/components/home/ExploreSection";
import { Footer } from "@/components/home/Footer";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import { AboutUs } from "@/components/home/AboutSection";
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
    <div className="min-h-screen dark:bg-[#0C1B2B]">
      {/* Carrossel */}
      <Banner onSearch={handleSearch} /> {/* Passando a função de busca */}
      
      <ExploreSection  /> {/* Passando o termo de busca  searchTerm={searchTerm}*/}

      <AboutUs />

      <SocialIconsContainer />

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
