"use client";

import React, { useState } from "react";
import { Zenitho } from "uvcanvas";

// Importando os dados do outro componente
import GenericModal from "@/components/ajuda/GenericModal"; // Ajuste conforme necessário
import { tutorialData, TutorialItem } from "@/components/ajuda/TutorialProvider"; 

export const HelpHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTutorial, setSelectedTutorial] = useState<TutorialItem | null>(null);

  // Filtrar tutoriais com base na busca (título ou descrição)
  const filteredTutorials = Object.values(tutorialData).filter(
    (tutorial) =>
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Função chamada ao clicar no item da lista
  const handleTutorialClick = (tutorialId: string) => {
    const tutorial = tutorialData[tutorialId];
    if (tutorial) {
      setSelectedTutorial(tutorial);
      setModalOpen(true);
    }
  };

  return (
    <section className="relative w-full min-h-[72vh] flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="hue-rotate-[30deg] dark:hue-rotate-[200deg]">
          <Zenitho />
        </div>
      </div>

      {/* Conteúdo centralizado */}
      <div className="relative z-10 max-w-4xl text-center px-4">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-semibold mb-2 drop-shadow-md">Como podemos te ajudar?</h1>
          <p className="lg:px-24">Explore nossa base de conhecimento para encontrar respostas simples e rápidas para as perguntas mais frequentes.</p>
        </div>

        {/* Campo de busca */}
        <div className="relative">
          <input
            className="bg-white w-full rounded-md py-3.5 pl-10 pr-4 text-gray-800 focus:outline-none focus:border-white focus:ring-1 focus:ring-[#C5DFFF] hover:border-[#C5DFFF]"
            placeholder="Qual a sua dúvida?"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          <svg
            className="absolute left-3 top-[53%] -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l3.356 3.356a1 1 0 01-1.414 1.414l-3.356-3.356zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            ></path>
          </svg>

          {/* Resultados da busca */}
          {isFocused && searchQuery && (
            <ul className="absolute mt-2 w-full bg-white text-gray-800 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto z-20">
              {filteredTutorials.length > 0 ? (
                filteredTutorials.map((tutorial) => (
                  <li
                    key={tutorial.id}
                    onClick={() => handleTutorialClick(tutorial.id)}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition flex items-center gap-1"
                  >
                    <p className="font-semibold">{tutorial.title} - </p>
                    <p className="text-sm text-gray-600">{tutorial.description}</p>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">Nenhum resultado encontrado</li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Ondulação inferior */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute -bottom-1">
        <path fill="#ffffff" className="dark:fill-[#0C1B2B]" fillOpacity="1" d="M0,160L120,186.7C240,213,480,267,720,261.3C960,256,1200,192,1320,160L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
      </svg>

      {/* Modal */}
      {selectedTutorial && (
        <GenericModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedTutorial.title}
          description={selectedTutorial.description}
          tutorial={selectedTutorial.content}
        />
      )}
    </section>
  );
};