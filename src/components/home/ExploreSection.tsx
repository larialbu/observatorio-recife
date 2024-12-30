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
  { id: 1, name: "Movimentação dos Aeroportos", image: "/images/explore/aeroporto.png", route: "/observatorio/aeroportos"},
  { id: 2, name: "Movimentação dos Portos", image: "/images/explore/porto.png", route: "/observatorio/portos"},
  { id: 3, name: "IPCA", image: "/images/explore/ipca.png", route: "/observatorio/ipca" },
  { id: 4, name: "Balança Comercial", image: "/images/explore/balanca-comercial.png", route: "/observatorio/bal-comercial" },
  { id: 5, name: "Ranking de Competitividade dos Municípios", image: "/images/explore/icon-RCM.png", route: "/observatorio/ranking-comp" },
  { id: 6, name: "Empresas da Cidade do Recife", image: "/images/explore/emp-rec.png", route: "/observatorio/empresas" },
  { id: 7, name: "Variação e Atividade dos Empregos", image: "/images/explore/var-atv-emp.png", route: "/observatorio/empregos" },
  { id: 8, name: "PIB - Produto Interno Bruto", image: "/images/explore/pib.png", route: "/observatorio/pib" },
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

  return (
    <div className="w-full flex flex-col mt-[5em] items-center justify-center explore-content section-content">
      <div className="text-content w-[80%] max-w-[60%] p-4">
        <div className="title-content">
          <div className="text-2xl sm:text-3xl lg:text-4xl mb-5 font-bold __title">
            <p>Resultados para consulta:</p>
          </div>
        </div>
        <div className="mt-24 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-14">
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
                  <Image src={el.image} alt={el.name} width={110} height={70} />
                  <p className="text-center text-lg font-light mt-4 text-blueObs">{el.name}</p>
              </Link>
            </div>
          ))}
    </div>
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
