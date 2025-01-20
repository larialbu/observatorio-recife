"use client";

import "../styles/home/style.scss";
import "../styles/explore/style.scss";

import React from "react";
import { NavBarHome } from "@/components/home/NavBarHome";
import { ObsHeader } from "@/components/home/ObsHeader";
import { Footer } from "@/components/home/Footer";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  isHighlighted?: boolean;
};

// ARRAYS DE MEMBROS
const teamMembers: TeamMember[] = [
  {
    name: "João Campos",
    role: "Prefeito da Cidade do Recife",
    image: "/images/team/prefeito.jpeg",
    isHighlighted: true,
  },
  {
    name: "Carlos Andrade Lima",
    role: "Secretário de Desenvolvimento Econômico",
    image: "/images/team/secretario.jpeg",
    isHighlighted: true,
  },
  {
    name: "Gelisa Bosi",
    role: "Secretária Executiva de Desenvolvimento e Inovação",
    image: "/images/team/sec-exc-gelisa.png",
    isHighlighted: true,
  },
  {
    name: "Pedro Lacerda",
    role: "Gerente Geral do Investe Recife",
    image: "/",
  },
  {
    name: "Ben-Hur Beltrão",
    role: "Gestor de Inovação",
    image: "/images/team/gest-inov-benhur.jpg",
  },
  {
    name: "Filipe Braga",
    role: "Gerente de Estudos Econômicos",
    image: "/images/team/eco-filipe.png",
  },
];

const lastSectionMembers: TeamMember[] = [
  {
    name: "Brenno França",
    role: "Desenvolvedor Full Stack",
    image: "/images/team/dev-brenno.jpg",
  },
  {
    name: "Italo Correia",
    role: "Desenvolvedor Full Stack",
    image: "/images/team/dev-italo.jpg",
  },
  {
    name: "Larissa Albuquerque",
    role: "Desenvolvedora Full Stack",
    image: "/images/team/dev-lari.jpg",
  },
  {
    name: "Rhuanderson Iago",
    role: "Designer UI/UX",
    image: "/images/team/design-rhuan.jpg",
  },
  {
    name: "Rodrigo Andrade",
    role: "Desenvolvedor Full Stack",
    image: "/images/team/dev-rodrigo.jpg",
  },
];

export default function TeamPage() {
  // Identificamos João e Carlos no array
  const joao = teamMembers.find((member) => member.name === "João Campos");
  const carlos = teamMembers.find((member) => member.name === "Carlos Andrade Lima");
  const gelisa = teamMembers.find((member) => member.name === "Gelisa Bosi");
  // “others” = resto dos membros
  const others = teamMembers.filter(
    (member) =>
      member.name !== "João Campos" && member.name !== "Carlos Andrade Lima" && member.name !== "Gelisa Bosi"
  );

  return (
    <>
      <ObsHeader />
      <NavBarHome simple />

      <section className="relative min-h-screen bg-gradient-to-b dark:bg-[#0C1B2B] px-6 py-16">
        {/* Título da Página */}
        <svg
          className="absolute top-0 left-0 w-full pointer-events-none fill-blue-50 dark:fill-[#0c2136]"
          viewBox="0 0 1440 320"
        >
          <path fillOpacity="1" d="M0,64L1440,192L1440,0L0,0Z" />
        </svg>
        <div className="text-center w-full flex flex-col items-center mb-12 relative z-10">
          <div className="w-20 flex hover:rotate-45 transition-transform">
            <img src="/images/logos/observatorio_logo.png" alt="Logo Observatorio" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white">
            Conheça Nossa Equipe
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Pessoas dedicadas em construir o futuro com inovação e colaboração.
          </p>
        </div>
        


        {/* LINHA EXCLUSIVA - JOÃO CAMPOS */}
        {joao && (
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 max-w-6xl mx-auto mb-12">
            {/* Card com só a FOTO do João (à esquerda em telas grandes) */}
            <div
              className="
                group
                bg-white
                dark:bg-gray-800
                rounded-3xl
                shadow-2xl
                overflow-hidden
                transform
                transition
                hover:-translate-y-3
                hover:shadow-2xl
                w-full
                lg:w-1/2
              "
            >
              <div className="relative w-full h-72 overflow-hidden">
                <img
                  src={joao.image}
                  alt={joao.name}
                  className="w-full h-full object-cover scale-150 transition-transform duration-1000 group-hover:scale-[1.7]"
                />
                <div className="absolute inset-0 from-black via-transparent to-transparent opacity-50" />
              </div>
              {/* REMOVIDO: nome e role dentro do card */}
            </div>

            {/* Texto Sobre João (à direita) - incluindo nome e role antes da descrição */}
            <div className="w-full lg:w-1/2 text-left">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {joao.name}
              </h2>
              <h3 className="text-lg text-gray-500 dark:text-gray-400 mb-4">
                {joao.role}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300">
                Aqui você pode inserir uma descrição mais ampla sobre João Campos.
                Destaque suas principais iniciativas, trajetória política, valores e
                objetivos para a cidade do Recife, etc.
              </p>
            </div>
          </div>
        )}

        {/* LINHA EXCLUSIVA - CARLOS ANDRADE LIMA */}
        {carlos && (
          <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto mb-12">
            {/* Texto Sobre Carlos (à esquerda em telas grandes) - incluindo nome e role antes da descrição */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1 text-left">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {carlos.name}
              </h2>
              <h3 className="text-lg text-gray-500 dark:text-gray-400 mb-4">
                {carlos.role}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300">
                Aqui você pode inserir uma descrição sobre o Secretário Carlos
                Andrade Lima, suas estratégias para o desenvolvimento econômico,
                iniciativas de inovação, etc.
              </p>
            </div>

            {/* Card com só a FOTO do Carlos (à direita em telas grandes) */}
            <div
              className="
                group
                bg-white
                dark:bg-gray-800
                rounded-3xl
                shadow-2xl
                overflow-hidden
                transform
                transition
                hover:-translate-y-3
                hover:shadow-2xl
                w-full
                lg:w-1/2
                order-1
                lg:order-2
              "
            >
              <div className="relative w-full h-72 overflow-hidden">
                <img
                  src={carlos.image}
                  alt={carlos.name}
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 from-black via-transparent to-transparent opacity-50" />
                </div>
                {/* REMOVIDO: nome e role dentro do card */}
              </div>
          </div>
        )}

        {/* LINHA EXCLUSIVA - GELISA BOSI */}
        {gelisa && (
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 max-w-6xl mx-auto mb-12">
            {/* Card com só a FOTO do João (à esquerda em telas grandes) */}
            <div
              className="
                group
                bg-white
                dark:bg-gray-800
                rounded-3xl
                shadow-2xl
                overflow-hidden
                transform
                transition
                hover:-translate-y-3
                hover:shadow-2xl
                w-full
                lg:w-1/2
              "
            >
              <div className="relative w-full h-72 overflow-hidden">
                <img
                  src={gelisa.image}
                  alt={gelisa.name}
                  className="w-full h-full scale-110 object-cover object-left transition-transform duration-1000 group-hover:scale-[1.2]"
                />
                <div className="absolute inset-0 from-black via-transparent to-transparent opacity-50" />
              </div>
              {/* REMOVIDO: nome e role dentro do card */}
            </div>

            {/* Texto Sobre João (à direita) - incluindo nome e role antes da descrição */}
            <div className="w-full lg:w-1/2 text-left">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {gelisa.name}
              </h2>
              <h3 className="text-lg text-gray-500 dark:text-gray-400 mb-4">
                {gelisa.role}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300">
                Aqui você pode inserir uma descrição mais ampla sobre João Campos.
                Destaque suas principais iniciativas, trajetória política, valores e
                objetivos para a cidade do Recife, etc.
              </p>
            </div>
          </div>
        )}

        {/* GRID COM OS DEMAIS MEMBROS */}
        <div className="flex flex-wrap items-start justify-between max-w-6xl mx-auto gap-y-8">
  {others.map((member, index) => (
    <div
      key={index}
      className="
        group
        w-72
        bg-white
        dark:bg-gray-800
        rounded-3xl
        shadow-xl
        transform
        transition
        hover:-translate-y-3
        hover:shadow-2xl
        overflow-hidden
      "
    >
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />
        <div className="absolute inset-0 from-black via-transparent to-transparent opacity-50"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {member.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {member.role}
        </p>
      </div>
    </div>
  ))}
</div>

      </section>

      {/* Última Seção com 5 Membros */}
      <section className="relative w-full bg-gradient-to-t from-white to-blue-50 dark:bg-[#0c2136] dark:from-[#0c2136] dark:to-[#0c2136] px-6 py-16 overflow-hidden">
        {/* Forma de onda no topo (conectando com a seção anterior) */}
        <svg
          className="absolute top-0 left-0 w-full pointer-events-none fill-white dark:fill-[#0C1B2B]"
          viewBox="0 0 1440 320"
        >
          <path fillOpacity="1" d="M0,64L1440,192L1440,0L0,0Z" />
        </svg>

        <div className="max-w-6xl mx-auto mb-12 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Nossa Equipe de Tecnologia & Design
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Criando soluções que transformam ideias em realidade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {lastSectionMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl transform transition hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
            >
              {/* Imagem do Membro */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 from-black via-transparent to-transparent opacity-50"></div>
              </div>
              {/* Conteúdo do Card */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
