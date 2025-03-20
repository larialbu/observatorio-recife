"use client";

import { useState } from "react";
import { Footer } from "@/components/home/Footer";
import { ObsHeader } from "@/components/home/ObsHeader";
import { NavBarHome } from "@/components/home/NavBarHome";
import "../styles/home/style.scss";
import "../styles/explore/style.scss";
import { Modal } from "@/components/fontes/Modal"; // Novo componente Modal
import { SourcesCard } from "@/components/fontes/SourcesCard"; // Novo componente para os cards
import { Zenitho, Lumiflex } from "uvcanvas";

interface Sources {
  name: string;
  description: string;
  imageUrl?: string;
  href: string;
}

const collaborators: Sources[] = [
  {
    name: "Anac",
    description:
      "Agência Nacional de Aviação Civil, responsável pela regulação e fiscalização da aviação civil no Brasil.",
    imageUrl: "/images/sources/anac-logo.png",
    href: "https://www.gov.br/anac/pt-br/assuntos/dados-e-estatisticas/dados-estatisticos/dados-estatisticos",
  },
  {
    name: "Aena",
    description:
      "Aena é a empresa que administra diversos aeroportos no Brasil e em outros países.",
    imageUrl: "/images/sources/aena-logo.png",
    href: "https://www.aenabrasil.com.br/pt/corporativo/Estatisticas.html",
  },
  {
    name: "IBGE",
    description:
      "Instituto responsável por estatísticas e pesquisas socioeconômicas no Brasil.",
    imageUrl: "/images/sources/ibge-logo.png",
    href: "https://www.ibge.gov.br/",
  },
  {
    name: "CLP - Centro de Liderança Pública",
    description:
      "Organização que visa desenvolver competitividade e boa governança no setor público.",
    imageUrl: "/images/sources/clp-logo.png",
    href: "https://clp.org.br/",
  },
  {
    name: "Portos do Recife S.A",
    description:
      "Empresa responsável pela administração e operação do porto na capital pernambucana.",
    imageUrl: "/images/sources/porto-recife-logo.png",
    href: "https://www.portodorecife.pe.gov.br/mep.php",
  },
  {
    name: "Novo Caged",
    description: "Compila dados sobre o mercado de trabalho formal no Brasil.",
    imageUrl: "/images/sources/novo-caged-logo.png",
    href: "http://pdet.mte.gov.br/novo-caged",
  },
  {
    name: "Comex Stat",
    description: "Sistema de estatísticas do comércio exterior brasileiro.",
    imageUrl: "/images/sources/comex-stat-logo.png",
    href: "http://comexstat.mdic.gov.br/pt/municipio",
  },
  {
    name: "Prefeitura do Recife",
    description: "Administração municipal da capital pernambucana.",
    imageUrl: "/images/sources/prefeitura-recife-logo.png",
    href: "http://dados.recife.pe.gov.br/dataset/empresas-da-cidade-do-recife/resource/87fc9349-312c-4dcb-a311-1c97365bd9f5",
  },
  {
    name: "ANTAQ",
    description: "Agência Nacional de Transportes Aquaviários.",
    imageUrl: "/images/sources/antaq-logo.png",
    href: "https://www.gov.br/antaq/pt-br",
  },
  {
    name: "Empresas & Negócios - Gov.br",
    description: "Plataforma de serviços para empresas e empreendedores, promovendo acesso e desburocratização.",
    imageUrl: "/images/sources/empresas&negocios-govbr-logo.png",
    href: "https://www.gov.br/empresas-e-negocios/pt-br/mapa-de-empresas/painel-mapa-de-empresas",
  },
  {
    name: "Secretaria do Tesouro Nacional - STN",
    description: "Órgão do governo brasileiro responsável por gerir o dinheiro público do país.",
    imageUrl: "/images/sources/tesouro-nacional-logo.png",
    href: "http://www.tesourotransparente.gov.br/ckan/dataset/capag-municipios",
  },
];

export default function SourcesPage() {
  const [openModal, setOpenModal] = useState(false);
  const [activeCollaborator, setActiveCollaborator] = useState<Sources | null>(null);

  const handleOpenModal = (collab: Sources) => {
    setActiveCollaborator(collab);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTimeout(() => setActiveCollaborator(null), 300); // Limpa colaborador após animação
  };

  return (
    <>
      <ObsHeader />
      <NavBarHome simple />

      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center text-white">
        {/* Background e Ondas */}
        <div className="absolute inset-0">
          <div className="hue-rotate-[170deg]">
            <Zenitho />
          </div>
        </div>
        {/* Título e Descrição */}
        <div className="relative z-10 max-w-4xl text-center px-4 __title">
          <div className="flex flex-col lg:flex-row items-center lg:inline-flex gap-2 lg:gap-0">
            <div className="w-[64px] mr-[1em] icon-wrapper">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                className="mb-2"
              >
                <path d="M21.007 8.222A3.738 3.738 0 0 0 15.045 5.2a3.737 3.737 0 0 0 1.156 6.583 2.988 2.988 0 0 1-2.668 1.67h-2.99a4.456 4.456 0 0 0-2.989 1.165V7.4a3.737 3.737 0 1 0-1.494 0v9.117a3.776 3.776 0 1 0 1.816.099 2.99 2.99 0 0 1 2.668-1.667h2.99a4.484 4.484 0 0 0 4.223-3.039 3.736 3.736 0 0 0 3.25-3.687zM4.565 3.738a2.242 2.242 0 1 1 4.484 0 2.242 2.242 0 0 1-4.484 0zm4.484 16.441a2.242 2.242 0 1 1-4.484 0 2.242 2.242 0 0 1 4.484 0zm8.221-9.715a2.242 2.242 0 1 1 0-4.485 2.242 2.242 0 0 1 0 4.485z" />
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
          <path fill="#ffffff" className="dark:fill-[#0C1B2B]" fill-opacity="1" d="M0,192L48,202.7C96,213,192,235,288,245.3C384,256,480,256,576,240C672,224,768,192,864,197.3C960,203,1056,245,1152,229.3C1248,213,1344,139,1392,101.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </section>
      
      {/* Grid de Colaboradores */}
      <main className="relative w-full min-h-screen flex flex-col items-center justify-start bg-white dark:bg-[#0C1B2B] py-16 px-4">
        
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Explore nossas fontes de dados
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Clique em qualquer logo para ver detalhes.
          </p>
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {collaborators.map((collab) => (
            <SourcesCard
              key={collab.name}
              collaborator={collab}
              onClick={() => handleOpenModal(collab)}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        collaborator={activeCollaborator}
      />

      <Footer />
    </>
  );
}
