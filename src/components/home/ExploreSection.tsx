"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import Image from "next/image";
import Link from "next/link";

interface ExploreSectionProps {
  searchTerm: string; // Termo de busca
}

// Elementos que serão exibidos e filtrados
const elements = [
  {
    id: 1,
    name: "Movimentação dos Aeroportos",
    lightImage: "/images/explore/light/aeroporto.png",
    darkImage: "/images/explore/dark/aeroporto.png",
    route: "/observatorio/aeroportos",
  },
  {
    id: 2,
    name: "Movimentação dos Portos",
    lightImage: "/images/explore/light/porto.png",
    darkImage: "/images/explore/dark/porto.png",
    route: "/observatorio/portos",
  },
  {
    id: 3,
    name: "IPCA",
    lightImage: "/images/explore/light/ipca.png",
    darkImage: "/images/explore/dark/ipca.png",
    route: "/observatorio/ipca",
  },
  {
    id: 4,
    name: "Balança Comercial",
    lightImage: "/images/explore/light/balanca-comercial.png",
    darkImage: "/images/explore/dark/balanca-comercial.png",
    route: "/observatorio/bal-comercial",
  },
  {
    id: 5,
    name: "Ranking de Competitividade dos Municípios",
    lightImage: "/images/explore/light/icon-RCM.png",
    darkImage: "/images/explore/dark/icon-RCM.png",
    route: "/observatorio/ranking-comp",
  },
  {
    id: 6,
    name: "Empresas da Cidade do Recife",
    lightImage: "/images/explore/light/emp-rec.png",
    darkImage: "/images/explore/dark/emp-rec.png",
    route: "/observatorio/empresas",
  },
  {
    id: 7,
    name: "Variação e Atividade dos Empregos",
    lightImage: "/images/explore/light/var-atv-emp.png",
    darkImage: "/images/explore/dark/var-atv-emp.png",
    route: "/observatorio/empregos",
  },
  {
    id: 8,
    name: "PIB - Produto Interno Bruto",
    lightImage: "/images/explore/light/pib.png",
    darkImage: "/images/explore/dark/pib.png",
    route: "/observatorio/pib",
  },
];

export const ExploreSection: React.FC<ExploreSectionProps> = ({ searchTerm }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Filtrar elementos com base no termo de busca
  const filteredElements = elements.filter((el) =>
    el.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para lidar com o clique no botão de explorar
  const handleNavigation = () => {
    setLoading(true);
    router.push("/explorar");
  };

  // Definir classes dinâmicas com base na quantidade de elementos
  const gridClasses =
    filteredElements.length === 1
      ? "grid-cols-1 justify-center items-center"
      : filteredElements.length === 2
      ? "grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const gapClasses =
    filteredElements.length === 1
      ? "gap-y-16"
      : filteredElements.length <= 3
      ? "gap-y-20 gap-x-10"
      : "gap-y-24 gap-x-14";

  return (
    <div className="w-full flex flex-col mt-[5em] items-center justify-center explore-content section-content dark:text-white dark:bg-[#0C1B2B] duration-[10ms] dark:transition-colors dark:duration-1000">
      <div className="text-content w-[80%] max-w-[60%] p-4">
        <div className="title-content">
          <div className="text-2xl sm:text-3xl lg:text-4xl mb-5 font-bold __title">
            <p className="transition-all duration-[800ms]">Resultados para consulta:</p>
            {filteredElements.length > 0 ? (
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">{filteredElements.length} resultado(s) encontrado(s):</p>
            ) : (
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Nenhum resultado encontrado.</p>
            )}
          </div>
        </div>
        <div className={`mt-24 grid ${gridClasses} ${gapClasses} w-full`}>
          {/* Renderização dos elementos filtrados */}
          {filteredElements.map((el) => (
            <div
              key={el.id}
              className={`flex flex-col items-center ${
                searchTerm === "" && (el.id === 7 || el.id === 8)
                  ? "left-[200px] lg:relative"
                  : ""
              }`}
            >
              <Link href={el.route} className="flex flex-col items-center justify-center">
                {/* Alternar entre imagens claro/escuro */}
                <Image
                  src={el.lightImage}
                  alt={el.name}
                  width={el.id === 1 ? 97 : 110}
                  height={el.id === 1 ? 80 : 70}
                  className="dark:hidden"
                />
                <Image
                  src={el.darkImage}
                  alt={el.name}
                  width={el.id === 1 ? 97 : 110}
                  height={el.id === 1 ? 80 : 70}
                  className="hidden dark:block"
                />
                <p className="text-center text-lg font-light mt-4 text-blueObs dark:text-white">{el.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="button-content mt-40">
        {loading ? <LoadingScreen /> : ""}
        <button
          className="lg:text-[18px] font-bold text-white drop-shadow-xl rounded-full bg-[#EC6625] py-4 px-20 hover:bg-[#ce5a21] hover:scale-105 hover:drop-shadow-2xl transition duration-200 sm:hover:scale-85"
          onClick={handleNavigation}
          disabled={loading}
        >
          Explorar
        </button>
      </div>
    </div>
  );
};
