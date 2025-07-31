"use client";

import React, { useState } from "react";
import { Zenitho } from "uvcanvas";

import GenericModal from "@/components/ajuda/GenericModal";
import { tutorialData, TutorialItem } from "@/components/ajuda/TutorialProvider";

export const HelpHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTutorial, setSelectedTutorial] = useState<TutorialItem | null>(
    null
  );

  const filteredTutorials = Object.values(tutorialData).filter(
    (tutorial) =>
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTutorialClick = (tutorialId: string) => {
    const tutorial = tutorialData[tutorialId];
    if (tutorial) {
      setSelectedTutorial(tutorial);
      setModalOpen(true);
      setSearchQuery("");
    }
  };

  return (
    <section className="relative w-full min-h-[72vh] flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-full h-full hue-rotate-[30deg] dark:hue-rotate-[200deg]">
          <Zenitho />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-md">
            Como podemos te ajudar?
          </h1>
          <p className="text-lg text-white/90">
            Busque em nossa base de conhecimento para encontrar respostas rápidas.
          </p>
        </div>

        <div className="relative">
          <div className="relative">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 fill-gray-500 pointer-events-none z-50">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C12.8487 19 14.551 18.3729 15.9056 17.3199L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L17.3199 15.9056C18.3729 14.551 19 12.8487 19 11C19 6.58172 15.4183 3 11 3ZM5 11C5 7.68629 7.68629 5 11 5C14.3137 5 17 7.68629 17 11C17 14.3137 14.3137 17 11 17C7.68629 17 5 14.3137 5 11Z"/>
            </svg>
            <input
              className="bg-white/95 backdrop-blur-sm w-full rounded-full py-4 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-300 shadow-lg"
              placeholder="Ex: Baixar gráficos, alterar tema..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
          </div>

          {isFocused && searchQuery && (
            <div className="absolute mt-2 w-full bg-white text-gray-800 border border-gray-200/50 rounded-2xl shadow-2xl max-h-80 overflow-auto z-50 animate-fade-in">
              <ul>
                {filteredTutorials.length > 0 ? (
                  filteredTutorials.map((tutorial) => (
                    <li
                      key={tutorial.id}
                      onClick={() => handleTutorialClick(tutorial.id)}
                      className="p-4 hover:bg-sky-50 cursor-pointer transition-colors duration-200 flex items-center justify-start border-b border-gray-100 last:border-b-0"
                    >
                      <div className="w-full">
                        <p className="font-semibold text-gray-800">
                          {tutorial.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {tutorial.description}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </li>
                  ))
                ) : (
                  <li className="p-6 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-500">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="font-medium">
                        Nenhum resultado encontrado
                      </p>
                      <p className="text-sm text-gray-400">
                        Tente buscar por outras palavras-chave.
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute -bottom-1 z-0"
      >
        <path
          fill="#ffffff"
          className="dark:fill-[#0C1B2B]"
          fillOpacity="1"
          d="M0,160L120,186.7C240,213,480,267,720,261.3C960,256,1200,192,1320,160L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>

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