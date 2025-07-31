"use client";

import "../styles/home/style.scss";
import "../styles/explore/style.scss";

import React from "react";

import { HighlightMemberProps, HighlightSection } from "@/components/equipe/HighlightSection";
import { TeamGrid } from "@/components/equipe/TeamGrid";
import { TechnologyDesignSection } from "@/components/equipe/TechnologyDesignSection";
import { Footer } from "@/components/home/Footer";
import { NavBarHome } from "@/components/home/NavBarHome";
import { ObsHeader } from "@/components/home/ObsHeader";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const highlightedMembers: HighlightMemberProps[] = [
  {
    name: "João Campos",
    role: "Prefeito da Cidade do Recife",
    image: "/images/team/prefeito.avif",
    description:
      "Engenheiro civil formado pela UFPE, João Campos é o prefeito mais jovem da história do Recife. Eleito em 2020 e reeleito em 2024, sua gestão prioriza o desenvolvimento sustentável e a inovação, promovendo políticas públicas que fortalecem a economia local, atraem investimentos e impulsionam novos negócios, consolidando o Recife como um polo econômico estratégico.",
  },
  {
    name: "Carlos Andrade Lima",
    role: "Secretário de Desenvolvimento Econômico",
    image: "/images/team/secretario.avif",
    description:
      "Como Secretário de Desenvolvimento Econômico do Recife, Carlos Andrade Lima lidera iniciativas para impulsionar o crescimento sustentável da cidade, com foco na geração de negócios, atração de investimentos e fortalecimento de empreendimentos. Advogado, combina visão estratégica com ações para consolidar o Recife como um polo inovador e atrativo.",
    reverse: true,
    imagePosition: "object-top",
  },
  {
    name: "Gelisa Bosi",
    role: "Secretária Executiva de Desenvolvimento e Inovação",
    image: "/images/team/sec-exc-gelisa.avif",
    description:
      "Responsável por promover o crescimento econômico sustentável do Recife, Gelisa Bosi atua na atração de investimentos, no fortalecimento de negócios e na melhoria do ambiente de negócios, consolidando a cidade como um polo atrativo para empresas e pessoas.",
  },
];

const teamMembers: TeamMember[] = [
  {
    name: "Pedro Lacerda",
    role: "Gerente Geral do Investe Recife",
    image: "/images/team/ger-pedro.avif",
  },
  {
    name: "Ben-Hur Beltrão",
    role: "Gestor de Inovação",
    image: "/images/team/gest-inov-benhur.avif",
  },
  {
    name: "Hugo Borba",
    role: "Gerente de Estudos Econômicos",
    image: "/images/team/hugo-borba.avif",
  },
];

// Equipe de tecnologia e design
const lastSectionMembers: TeamMember[] = [
  {
    name: "Brenno França",
    role: "Desenvolvedor Full Stack",
    image: "/images/team/dev-brenno.avif",
  },
  {
    name: "Italo Correia",
    role: "Desenvolvedor Full Stack",
    image: "/images/team/dev-italo.avif",
  },
  {
    name: "Rhuanderson Iago",
    role: "Designer UI/UX",
    image: "/images/team/design-rhuan.avif",
  },
  {
    name: "Rodrigo Andrade",
    role: "Desenvolvedor Full Stack",
    image: "/images/team/dev-rodrigo.avif",
  },
];

export default function TeamPage() {
  return (
    <>
      <ObsHeader />
      <NavBarHome simple />

      <section className="relative min-h-screen bg-gradient-to-b dark:bg-[#0C1B2B] px-6 py-16">
        <svg
          className="absolute top-0 left-0 w-full pointer-events-none fill-blue-50 dark:fill-[#0c2136]"
          viewBox="0 0 1440 320"
        >
          <path fillOpacity="1" d="M0,64L1440,192L1440,0L0,0Z" />
        </svg>

        {/* Título e descrição */}
        <div className="relative z-10 text-center w-full flex flex-col items-center mb-12">
          <div className="w-20 flex hover:rotate-45 transition-transform">
            <img
              src="/images/logos/observatorio_logo.png"
              alt="Logo Observatório"
            />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white">
            Conheça Nossa Equipe
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Pessoas dedicadas em construir o futuro com inovação e colaboração.
          </p>
        </div>

        {/* Membros destacados */}
        {highlightedMembers.map((member, index) => (
          <HighlightSection key={index} {...member} />
        ))}

        {/* Grid com outros membros */}
        <TeamGrid members={teamMembers} />
      </section>

      {/* Última Seção: Equipe de Tecnologia & Design */}
      <TechnologyDesignSection lastSectionMembers={lastSectionMembers} />

      {/* Rodapé */}
      <Footer />
    </>
  );
}
