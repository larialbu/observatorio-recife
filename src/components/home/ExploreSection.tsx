import React from "react";
import { ExploreDiv } from "./ExploreDiv";
import Link from "next/link";
import { iconsExplore } from "./ExploreIconsObservatorio";

interface ExploreSectionProps {
  searchTerm: string; // Recebe o termo de busca como prop
  bundleProgress: any;
  progress: any;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({ searchTerm, bundleProgress, progress }) => {
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
    <div className="w-full flex flex-col mt-[5em] items-center explore-content section-content relative">
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
      <ExploreDiv searchTerm={searchTerm} bundleProgress={bundleProgress} progress={progress} />

      <div className="mt-40 z-50 mb-40">
        <Link href={"/explorar"}>
          <button className="lg:text-[18px] font-bold text-white drop-shadow-xl rounded-full bg-[#EC6625] py-4 px-20 hover:bg-[#ce5a21] hover:scale-105 hover:drop-shadow-2xl transition duration-200 sm:hover:scale-85">
            Explorar
          </button>
        </Link>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute lg:bottom-[-20px] bottom-0"
      >
        <defs>
          <linearGradient id="svgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--svg-gradient-end)" />
            <stop offset="100%" stopColor="var(--svg-gradient-start)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#svgGradient)"
          d="M0,192L48,208C96,224,192,256,288,234.7C384,213,480,139,576,112C672,85,768,107,864,128C960,149,1056,171,1152,170.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
};
