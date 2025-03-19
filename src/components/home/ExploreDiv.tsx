import { useEffect, useState } from "react";
import { iconsExplore } from "./ExploreIconsObservatorio";
import Link from "next/link";
import React from "react";

interface ExploreDivProps {
  searchTerm: string;
}

export const ExploreDiv: React.FC<ExploreDivProps> = ({ searchTerm }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Filtrando itens com base nas tags e no termo de busca
  const filteredItems = iconsExplore.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
  }));

  // Contando o número total de resultados
  const totalResults = filteredItems.reduce(
    (count, section) => count + section.items.length,
    0
  );

  return (
    <div className="w-full">
      {filteredItems.map((section) =>
        section.items.length > 0 ? (
          <div
            className={`grid w-full ${
              totalResults === 1
                ? "grid-cols-1 justify-center" // Centraliza o único elemento
                : totalResults === 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-x-8 lg:px-16 sm:px-8" // 4 elementos: 1 coluna no mobile, 2 no tablet, 4 no desktop
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-64 sm:px-32" // Layout padrão
            } justify-items-center text-center gap-y-24 mt-24 observatorio-icon-wrapper`}
            key={section.items[0].label}
          >
            {section.items.map((item, index) => {
              const iconClassName = isDarkMode ? "darkin" : "";
              const isLastItem = index === section.items.length - 1; // Verifica se é o último item

              return (
                <div
                  key={item.label}
                  className={`flex flex-col items-center group transition-transform duration-300 ease-in-out select-none ${
                    isLastItem && totalResults === 1
                      ? "col-span-full flex justify-center" // Centraliza em telas pequenas quando é o único item
                      : isLastItem && totalResults > 1
                      ? "lg:col-span-3 flex justify-center" // Centraliza quando é o último item mas tem mais de 1
                      : "" // Normal, sem alteração
                  }`} // Aplica flex e centraliza o último item
                >
                  <Link href={item.href || "#"} className="flex flex-col items-center select-none">
                    <div className="relative hover:rotate-[-5deg] border-2 border-[#0155AE] rounded-full dark:border-white transition-all duration-300 ease-in-out group-hover:scale-110 cursor-pointer select-none icon-content">
                      <div className="relative z-10 icon-wrapper">
                        {React.cloneElement(item.icon, {
                          className: `${item.icon.props.className} ${iconClassName} transition-transform duration-300 ease-in-out group-hover:scale-110`,
                        })}
                      </div>
                      <div className="logo-wrapper absolute z-0 bg-white rounded-full p-1 dark:bg-[#0C1B2B] iconClassName transition-transform duration-300 ease-in-out group-hover:scale-110">
                        {React.cloneElement(item.logo, {
                          className: `${item.logo.props.className} ${iconClassName} w-full h-full`,
                        })}
                      </div>
                    </div>
                    <div className="text-[#0155AE] text-lg mt-2 font-light dark:text-white transition-all duration-300 ease-in-out z-50 dark:group-hover:text-[#ffffff]/80 group-hover:text-[#0155AE]/80">
                      {item.label}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : null
      )}
    </div>
  );
};
