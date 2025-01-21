"use client";

import { useState } from "react";

import { Footer } from "@/components/home/Footer";
import { ObsHeader } from "@/components/home/ObsHeader";
import { NavBarHome } from "@/components/home/NavBarHome";
import "../styles/home/style.scss";
import "../styles/explore/style.scss";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

// INTERFACE
interface Collaborator {
  name: string;
  description: string;
  imageUrl?: string;
  href: string;
}

// LISTA DE COLABORADORES
const collaborators: Collaborator[] = [
  {
    name: "Anac",
    description:
      "Agência Nacional de Aviação Civil, responsável pela regulação e fiscalização da aviação civil no Brasil.",
    imageUrl: "/images/colab/anac-logo.png",
    href: "https://www.gov.br/anac/pt-br/assuntos/dados-e-estatisticas/dados-estatisticos/dados-estatisticos",
  },
  {
    name: "Aena",
    description:
      "Aena é a empresa que administra diversos aeroportos no Brasil e em outros países.",
    imageUrl: "/images/colab/aena-logo.png",
    href: "https://www.aenabrasil.com.br/pt/corporativo/Estatisticas.html",
  },
  {
    name: "IBGE",
    description:
      "Instituto responsável por estatísticas e pesquisas socioeconômicas no Brasil.",
    imageUrl: "/images/colab/ibge-logo.png",
    href: "https://www.ibge.gov.br/",
  },
  {
    name: "CLP - Centro de Liderança Pública",
    description:
      "Organização que visa desenvolver competitividade e boa governança no setor público.",
    imageUrl: "/images/colab/clp-logo.png",
    href: "https://clp.org.br/",
  },
  {
    name: "Portos do Recife S.A",
    description:
      "Empresa responsável pela administração e operação do porto na capital pernambucana.",
    imageUrl: "/images/colab/porto-recife-logo.png",
    href: "https://www.portodorecife.pe.gov.br/mep.php",
  },
  {
    name: "Novo Caged",
    description: "Compila dados sobre o mercado de trabalho formal no Brasil.",
    imageUrl: "/images/colab/novo-caged-logo.png",
    href: "http://pdet.mte.gov.br/novo-caged",
  },
  {
    name: "Comex Stat",
    description: "Sistema de estatísticas do comércio exterior brasileiro.",
    imageUrl: "/images/colab/comex-stat-logo.png",
    href: "http://comexstat.mdic.gov.br/pt/municipio",
  },
  {
    name: "Prefeitura do Recife",
    description: "Administração municipal da capital pernambucana.",
    imageUrl: "/images/colab/prefeitura-recife-logo.png",
    href: "http://dados.recife.pe.gov.br/dataset/empresas-da-cidade-do-recife/resource/87fc9349-312c-4dcb-a311-1c97365bd9f5",
  },
  {
    name: "ANTAQ",
    description: "Agência Nacional de Transportes Aquaviários.",
    imageUrl: "/images/colab/antaq-logo.png",
    href: "https://www.gov.br/antaq/pt-br",
  },
  {
    name: "Empresas & Negócios - Gov.br",
    description: "Plataforma unificada de serviços do governo federal.",
    imageUrl: "/images/colab/empresas&negocios-govbr-logo.png",
    href: "https://www.gov.br/empresas-e-negocios/pt-br/mapa-de-empresas/painel-mapa-de-empresas",
  },
];

export default function SourcesPage() {
  const [openModal, setOpenModal] = useState(false);
  const [activeCollaborator, setActiveCollaborator] = useState<Collaborator | null>(
    null
  );

  function handleOpenModal(collab: Collaborator) {
    setActiveCollaborator(collab);
    setOpenModal(true);
  }

  function handleCloseModal() {
    // Fecha a modal
    setOpenModal(false);
    // Limpa o colaborador após um pequeno atraso (para animação de saída)
    setTimeout(() => {
      setActiveCollaborator(null);
    }, 300);
  }

  return (
    <>
      <ObsHeader />
      <NavBarHome simple />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden text-white">
        {/* FUNDO GRADIENTE + ONDAS */}
        <div className="absolute inset-0">
          <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-800 w-full h-full opacity-90 dark:from-cyan-600 dark:via-blue-800 dark:to-blue-900" />
          <svg
            className="absolute bottom-0 left-0 w-full pointer-events-none fill-white"
            viewBox="0 0 1440 320"
          >
            <path fillOpacity="0.5" d="M0,224L1440,288L1440,320L0,320Z" />
          </svg>
        </div>

        {/* CONTEÚDO DO HERO */}
        <div className="relative z-10 max-w-4xl text-center px-4 __title">
          <div className="inline-flex">
            <div className="w-[64px] mr-[1em] icon-wrapper">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
                <path d="M21.007 8.222A3.738 3.738 0 0 0 15.045 5.2a3.737 3.737 0 0 0 1.156 6.583 2.988 2.988 0 0 1-2.668 1.67h-2.99a4.456 4.456 0 0 0-2.989 1.165V7.4a3.737 3.737 0 1 0-1.494 0v9.117a3.776 3.776 0 1 0 1.816.099 2.99 2.99 0 0 1 2.668-1.667h2.99a4.484 4.484 0 0 0 4.223-3.039 3.736 3.736 0 0 0 3.25-3.687zM4.565 3.738a2.242 2.242 0 1 1 4.484 0 2.242 2.242 0 0 1-4.484 0zm4.484 16.441a2.242 2.242 0 1 1-4.484 0 2.242 2.242 0 0 1 4.484 0zm8.221-9.715a2.242 2.242 0 1 1 0-4.485 2.242 2.242 0 0 1 0 4.485z"/>
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-md">
              Fontes do Observatório
            </h1>
          </div>
          <p className="text-base md:text-xl font-light opacity-90 max-w-3xl mx-auto mb-6">
            Conheça as instituições e bases de dados que abastecem nossas análises
            e pesquisas econômicas.
          </p>
        </div>
      </section>

      {/* SEÇÃO PRINCIPAL */}
      <main
        className="
          relative
          w-full
          min-h-screen
          flex
          flex-col
          items-center
          justify-start
          bg-white
          dark:bg-[#0C1B2B]
          py-16
          px-4
        "
      >
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Explore nossas fontes de dados
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Clique em qualquer logo para ver detalhes (nome e descrição).
          </p>
        </div>

        {/* GRID DE COLABORADORES */}
        <div
          className="
            w-full
            max-w-6xl
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-8
          "
        >
          {collaborators.map((collab) => (
            <div
              key={collab.name}
              onClick={() => handleOpenModal(collab)}
              className="
                group
                relative
                flex
                flex-col
                items-center
                justify-center
                rounded-xl
                bg-white
                dark:bg-[#1d2b3d]
                shadow-md
                cursor-pointer
                p-6
                transition
                hover:scale-105
                hover:shadow-2xl
              "
            >
              {/* BORDA GRADIENTE DECORATIVA (opcional) */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-xl
                  pointer-events-none
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                "
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,255,188,0.4), rgba(0,153,255,0.4))",
                }}
              />
              {/* LOGO */}
              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >
                {collab.imageUrl ? (
                  <img
                    src={collab.imageUrl}
                    alt={collab.name}
                    className="
                      w-24
                      h-24
                      object-contain
                      pointer-events-none
                      transition-transform
                      mb-2
                      dark:invert dark:grayscale dark:brightness-0 duration-0 dark:duration-0
                    "
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Sem logo
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL (PURO CSS) */}
      {openModal && activeCollaborator && (
        <div
          className={`
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-sm
            transition-opacity
            duration-300
            ${
              openModal
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }
          `}
        >
          {/* Conteúdo do modal */}
          <div
            className={`
              relative
              w-full
              max-w-lg
              bg-white
              dark:bg-[#1d2b3d]
              rounded-lg
              shadow-2xl
              overflow-hidden
              p-6
              mx-4
              transition-transform
              duration-300
              ${
                openModal
                  ? "translate-y-0" // Ao abrir, posicionado normal
                  : "translate-y-8" // Ao fechar, vai descer um pouco
              }
            `}
          >
            {/* Botão fechar */}
            <button
              onClick={handleCloseModal}
              className="
                absolute
                top-3
                right-3
                w-8
                h-8
                bg-gray-200
                dark:bg-gray-700
                rounded-full
                flex
                items-center
                justify-center
                text-gray-600
                dark:text-gray-300
                hover:brightness-110
                transition
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Conteúdo da modal */}
            <div className="flex flex-col items-center justify-center space-y-4 mt-2">
              {/* Logo */}
              {activeCollaborator.imageUrl && (
                <img
                  src={activeCollaborator.imageUrl}
                  alt={activeCollaborator.name}
                  className="w-32 h-auto object-contain mb-2 pointer-events-none dark:invert dark:grayscale dark:brightness-0 duration-0 dark:duration-0"
                />
              )}

              {/* Nome */}
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {activeCollaborator.name}
              </h3>

              {/* Descrição */}
              <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                {activeCollaborator.description}
              </p>

              <Link href={activeCollaborator.href} className="px-4 py-3 bg-[#3381d4] rounded-lg text-white font-semibold dark:bg-[#EC6625]" target="_blank">
                Saiba mais
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
