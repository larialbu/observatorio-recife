import React from "react";
import { ExploreDiv } from "./ExploreDiv";
import Link from "next/link";
import { iconsExplore } from "./ExploreIconsObservatorio";

interface ExploreSectionProps {
  searchTerm: string; // Recebe o termo de busca como prop
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({ searchTerm }) => {
  // Calcula o número total de resultados encontrados
  const totalResults = iconsExplore.reduce(
    (count, section) =>
      count +
      section.items.filter((item) =>
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ).length,
    0
  );

  return (
    <div className="w-full flex flex-col mt-[5em] items-center explore-content section-content">
      {/* Título da seção */}
      <div className="w-[75%] dark:text-white">
        <p className="text-2xl sm:text-3xl lg:text-4xl lg:pr-[40%] font-bold __title">Resultados para consulta:</p>
        <p className="text-gray-500 text-xl mt-1 dark:text-gray-400">
          {totalResults > 0
            ? `${totalResults} resultado${totalResults > 1 ? 's' : ''} encontrado${totalResults > 1 ? 's' : ''}.`
            : "Nenhum resultado encontrado."
          }
        </p>
      </div>

      {/* Component de exploração com filtro */}
      <ExploreDiv searchTerm={searchTerm} />

      {/* Botão para explorar mais */}
      <div className="mt-40">
        <Link href={"/explorar"}>
          <button className="lg:text-[18px] font-bold text-white drop-shadow-xl rounded-full bg-[#EC6625] py-4 px-20 hover:bg-[#ce5a21] hover:scale-105 hover:drop-shadow-2xl transition duration-200 sm:hover:scale-85">
            Explorar
          </button>
        </Link>
      </div>
    </div>
  );
};
