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
    name: "/",
    role: "/",
    image: "/",
  },
  {
    name: "/",
    role: "/",
    image: "/",
  },
  {
    name: "Ben-Hur Beltrão",
    role: "Gestor de Inovação",
    image: "/",
  },
  {
    name: "Filipe Braga",
    role: "Gerente de Estudos Econômicos",
    image: "/",
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

const TeamPage: React.FC = () => {
  return (
    <>
      <ObsHeader />
      <NavBarHome simple />
      <section className="min-h-screen bg-gradient-to-b dark:bg-[#0C1B2B] px-6 py-16">
        {/* Título da Página */}
        <div className="text-center w-full flex flex-col items-center mb-12">
          <div className="w-20 flex hover:rotate-45">
            <img src="/images/logos/observatorio_logo.png" alt="" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white">
            Conheça Nossa Equipe
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Pessoas dedicadas em construir o futuro com inovação e colaboração.
          </p>
        </div>

        {/* Grid de Membros da Equipe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) =>
            member.isHighlighted ? (
              <div
                key={index}
                className="group col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl transform transition hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
              >
                {/* Imagem do Membro Destacado */}
                <div className="relative w-full h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 from-black via-transparent to-transparent opacity-50"></div>
                </div>
                {/* Conteúdo do Card */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              </div>
            ) : (
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
            )
          )}
        </div>
      </section>

      {/* Última Seção com 5 Membros */}
      <section className="dark:bg-[#0C1B2B] px-6 py-16">
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
      {/* Footer */}
      <Footer />
    </>
  );
};

export default TeamPage;
