import React, { useEffect, useRef, useState } from "react";
import "./animations.css"; // Importar as animações

type PopupProps = {
  card: {
    title: string;
    detailedDescription: string;
  };
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  onSuggestionClick: (index: number) => void;
  suggestions: { title: string; banner: string; detailedDescription: string; name: string }[];
  route: string;
};

export const Popup: React.FC<PopupProps> = ({
  card,
  onClose,
  onNavigate,
  onSuggestionClick,
  suggestions,
  route,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [animationClass, setAnimationClass] = useState("fade-in");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleNavigateWithAnimation = (direction: "prev" | "next") => {
    const animation = direction === "next" ? "slide-out-left" : "slide-out-right";
    setAnimationClass(animation);

    setTimeout(() => {
      onNavigate(direction);
      setAnimationClass(direction === "next" ? "slide-in-right" : "slide-in-left");
    }, 500);
  };

  const handleConsultClick = () => {
    window.location.href = route;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[10] popup-content">
      <div
        ref={popupRef}
        className={`relative p-6 max-w-[90%] md:max-w-[600px] w-full bg-white dark:bg-[#1E293B] shadow-xl rounded-3xl overflow-hidden ${animationClass}`}
        style={{ animationDuration: "0.5s" }}
      >
        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 dark:bg-gray-700 rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Conteúdo */}
        <div className="text-center mt-12 md:mt-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-4">
            {card.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
            {card.detailedDescription}
          </p>
        </div>

        {/* Botões de Navegação */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => handleNavigateWithAnimation("prev")}
            className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full p-3 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => handleNavigateWithAnimation("next")}
            className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full p-3 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </button>
        </div>

        {/* Botão Consultar */}
        <div className="mt-8 text-center">
          <button
            onClick={handleConsultClick}
            className="bg-blue-600 dark:bg-[#EC6625] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-[#D14E20] transition text-sm md:text-base"
          >
            Consultar dados
          </button>
        </div>

        {/* Sugestões */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Confira também:
          </h3>
          <div className="flex justify-center space-x-4 overflow-x-visible px-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(index)}
                className="flex-shrink-0 w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 relative"
                style={{
                  backgroundImage: `url(${suggestion.banner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p
                  className="bg-black bg-opacity-50 text-white text-xs md:text-sm p-1 md:p-2 absolute bottom-0 left-0 w-full text-center rounded-b-lg overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                  }}
                >
                  {suggestion.name}
                </p>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
