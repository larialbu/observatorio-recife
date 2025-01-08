import React, { useState, useEffect } from "react";
import { iconsExplore } from "./ExploreIconsObservatorio";
import Link from "next/link";

export const ExploreDiv = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para o modo escuro

  // Verificar se o tema escuro está ativado
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Verifica ao carregar a página
    checkDarkMode();

    // Adiciona um ouvinte para mudanças no tema (se o modo escuro for ativado ou desativado)
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      {iconsExplore.map((section: any) => (
        <div
          className="grid w-full grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 lg:px-64 sm:px-32 justify-items-center text-center gap-y-24 mt-24 observatorio-icon-wrapper"
          key={section.items[0].label}
        >
          {section.items.map((item: any) => {
            // Adiciona a classe 'darkin' se o modo escuro estiver ativado
            const iconClassName = isDarkMode ? "darkin" : "";

            // Adiciona a classe ml-[200px] apenas para o item com id 7 ou 8
            const moveClass = item.id === 7 || item.id === 8 ? "w-[90%] 2xl:ml-[450px] xl:ml-[300px] lg:w-[50%] lg:ml-[225px]" : "";

            

            return (
                <div
                  key={item.label}
                  className={`flex flex-col items-center ${moveClass} group transition-transform duration-300 ease-in-out select-none`}
                >
                  <Link href={item.href || "#"} className="flex flex-col items-center select-none">
                    <div className="relative hover:rotate-[-5deg] border-2 border-[#0155AE] rounded-full dark:border-white transition-all duration-300 ease-in-out group-hover:scale-110 cursor-pointer select-none icon-content">
                      <div className="relative z-10 icon-wrapper">
                        {/* Clona o ícone com a nova classe e aplica o efeito hover */}
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
      ))}
    </div>
  );
};
