"use client";

import { Footer } from "@/components/home/Footer";
import "../styles/home/style.scss";
import "../styles/explore/style.scss";
import React, { useEffect, useState } from "react";
import { ObsHeader } from "@/components/home/ObsHeader";
import { NavBarHome } from "@/components/home/NavBarHome";

interface Collaborator {
  name: string;
  description: string;
  imageUrl?: string;
}

const collaborators: Collaborator[] = [
  {
    name: "Anac",
    description:
      "Agência Nacional de Aviação Civil, responsável pela regulação e fiscalização da aviação civil no Brasil.",
    imageUrl: "/images/colab/anac-logo.png",
  },
  {
    name: "Aena",
    description:
      "Aena é a empresa que administra diversos aeroportos no Brasil e em outros países.",
    imageUrl: "/images/colab/aena-logo.png",
  },
  {
    name: "IGBE",
    description:
      "Instituto responsável por estatísticas, estudos e pesquisas socioeconômicas de nível nacional.",
    imageUrl: "/images/colab/ibge-logo.png",
  },
  {
    name: "CLP - Centro de Liderança Pública",
    description:
      "Organização que visa desenvolver a competitividade e a boa governança no setor público.",
    imageUrl: "/images/colab/clp-logo.png",
  },
  {
    name: "Portos do Recife S.A",
    description:
      "Empresa responsável pela administração e operação do porto na capital pernambucana.",
    imageUrl: "/images/colab/porto-recife-logo.png",
  },
  {
    name: "Novo Caged",
    description:
      "O Novo Caged compila dados sobre o mercado de trabalho formal no Brasil.",
    imageUrl: "/images/colab/novo-caged-logo.png",
  },
  {
    name: "Comex Stat",
    description:
      "Sistema integrado de estatísticas do comércio exterior brasileiro.",
    imageUrl: "/images/colab/comex-stat-logo.png",
  },
  {
    name: "Prefeitura do Recife",
    description:
      "Governo municipal responsável pela administração da capital de Pernambuco.",
    imageUrl: "/images/colab/prefeitura-recife-logo.png",
  },
];

/**
 * Hook para definir o raio de forma responsiva,
 * com base na largura atual da janela (window.innerWidth).
 * Ajuste os valores como preferir.
 */
function useResponsiveRadius() {
  const [radius, setRadius] = useState(240);

  useEffect(() => {
    function updateRadius() {
      const width = window.innerWidth;

      if (width < 400) {
        // Bem pequeno
        setRadius(100);
      } else if (width < 640) {
        // Mobile landscape / tablets pequenOs
        setRadius(140);
      } else if (width < 1024) {
        // Tablets maiores / telas medianas
        setRadius(180);
      } else {
        // Desktops grandes
        setRadius(240);
      }
    }

    updateRadius(); // Atualiza logo no início
    window.addEventListener("resize", updateRadius);
    return () => {
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

  return radius;
}

export default function CollaboratorsRadial() {
  // Vamos buscar o raio responsivo via hook
  const radius = useResponsiveRadius();
  // Quantidade total de itens e cálculo do ângulo de espaçamento
  const total = collaborators.length;
  const angleStep = (2 * Math.PI) / total;

  return (
    <>
      <ObsHeader />
      <NavBarHome simple />
      
      <main className="min-h-screen flex flex-col items-center justify-center p-8 dark:bg-[#0C1B2B]">
        {/* Título */}
        <h1 className="text-2xl lg:text-4xl font-bold mb-12 text-gray-800 text-center dark:text-white">
          Colaboradores do Observatório Econômico
        </h1>

        {/**
         * Container radial: 
         * - w-full + max-w-[600px] = não excede 600px em telas grandes
         * - aspect-square = mantém a forma quadrada em qualquer largura
         */}
        <div className="relative w-full max-w-[600px] aspect-square mx-auto">
          {/* Círculo Central (logo do Observatório) */}
          <div
            className="
              absolute top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              w-24 h-24 flex flex-col items-center justify-center 
              rounded-full bg-gray-100 shadow-xl
              text-center z-10
              dark:bg-[#122233]
              sm:w-36 sm:h-36
            "
          >
            <img
              src="/images/logos/observatorio_logo.png"
              alt="Observatório Econômico"
              className="w-24 mx-auto hover:rotate-45"
            />
          </div>

          {/* Distribuição dos colaboradores em volta do centro */}
          {collaborators.map((collab, index) => {
            // Ângulo (radianos) para cada colaborador
            const angle = index * angleStep;

            // Cálculo das posições (x, y) com base no raio atual
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            // CSS inline para posicionar o item (círculo) no local correto
            // Observando que top/left 50% (top-1/2 left-1/2) é o centro do container
            const style = {
              transform: `translate(${x}px, ${y}px)`,
            };

            return (
              <div
                key={collab.name}
                className="
                  group
                  absolute
                  md:top-[39%] md:left-[39%]
                  sm:top-[42%] sm:left-[42%]
                    top-[39%] left-[39%]
                  -translate-x-1/2 -translate-y-1/2
                  flex flex-col items-center
                  hover:z-20
                  transition-all
                "
                style={style}
              >
                {/* Círculo com a logo do colaborador */}
                <div
                  className="
                  md:w-32 md:h-32
                  sm:w-24 sm:h-24
                    w-16 h-16 rounded-full
                    shadow-md
                    bg-gray-100
                    flex items-center justify-center
                    cursor-pointer
                    transition-transform
                    group-hover:scale-110
                    dark:bg-[#122233]
                  "
                >
                  {collab.imageUrl ? (
                    <img
                      src={collab.imageUrl}
                      alt={collab.name}
                      className="
                         bject-contain 
                        dark:invert 
                        dark:grayscale 
                        dark:brightness-0
                        sm:w-16
                        w-11 
                      "
                    />
                  ) : (
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      {collab.name}
                    </span>
                  )}
                </div>

                {/* Tooltip / Balão de informação no Hover */}
                <div
                  className="
                    pointer-events-none
                    opacity-0 
                    group-hover:opacity-100
                    transition-opacity
                    absolute bottom-[110%] w-44
                    bg-white text-gray-700 text-sm rounded-md p-3
                    shadow-lg
                    transform -translate-x-1/2
                    dark:bg-[#1f2f40]
                    dark:text-gray-100
                  "
                >
                  <h3 className="font-bold mb-1">{collab.name}</h3>
                  <p className="text-xs leading-tight">{collab.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
