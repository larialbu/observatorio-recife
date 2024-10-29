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
  suggestions: { title: string; banner: string; detailedDescription: string }[];
  route: string;
};

export const Popup: React.FC<PopupProps> = ({ card, onClose, onNavigate, onSuggestionClick, suggestions, route }) => {
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
    setAnimationClass("fade-out");

    setTimeout(() => {
      onNavigate(direction);
      setAnimationClass("fade-in");
    }, 300);
  };

  const handleConsultClick = () => {
    window.location.href = route;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-[10] popup-content">
      <div ref={popupRef} className={`relative p-6 max-w-[500px] popup-page ${animationClass}`}>
        <div className="absolute top-3 right-3 close-popup-content">
          <button onClick={onClose} className="text-gray-500 close-popup-button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="text-content">
          <div className="max-w-[85%] title-content">
            <h2 className="text-2xl font-semibold __title">{card.title}</h2>
          </div>
          <div className="description-content">
            <p className="mt-4 text-lg">{card.detailedDescription}</p>
          </div>
        </div>

        <div className="flex absolute w-[120%] left-[-3.2em] top-[50%] justify-between items-center popup-buttons-content">
          <button onClick={() => handleNavigateWithAnimation("prev")} className="popup-arrow left">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.9991 19L9.83911 14C9.56672 13.7429 9.34974 13.433 9.20142 13.0891C9.0531 12.7452 8.97656 12.3745 8.97656 12C8.97656 11.6255 9.0531 11.2548 9.20142 10.9109C9.34974 10.567 9.56672 10.2571 9.83911 10L14.9991 5" />
            </svg>
          </button>
          <button onClick={() => handleNavigateWithAnimation("next")} className="popup-arrow right">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19" />
            </svg>
          </button>
        </div>

        <div className="flex absolute left-0 top-[50%] w-full justify-center pointer-events-none data-button-content">
          <div className="data-button-container">
            <button onClick={handleConsultClick} className="pointer-events-auto __button">
              Consultar dados
            </button>
          </div>
        </div>

        <div className="absolute w-full bottom-5 left-0 pl-3 pr-3 suggestions-content">
          <div className="__title">
            <h3 className="mt-6 font-semibold">Confira também:</h3>
          </div>
          <div className="inline-flex justify-between pr-2 pl-2x w-[100%] mt-2 suggestions-container">
            {suggestions.map((suggestion, index) => (
              <div className="relative w-[110px] h-[110px] button-container" key={index}>
                <button onClick={() => onSuggestionClick(index)} className="flex w-full h-full justify-center items-center text-xs __button">
                  <div className="absolute w-full top-0 left-0 banner-content">
                    <div style={{ backgroundImage: `url(${suggestion.banner})` }} className="w-full h-full __banner"></div>
                  </div>
                  <p className="z-[2]">{suggestion.title}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
