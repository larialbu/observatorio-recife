import React, { useEffect, useRef } from "react";

type PopupProps = {
    card: {
        title: string;
        detailedDescription: string;
    };
    onClose: () => void;
    onNavigate: (direction: "prev" | "next") => void;
    onSuggestionClick: (index: number) => void;
    suggestions: { title: string; banner: string; detailedDescription: string }[];
};

export const Popup: React.FC<PopupProps> = ({ card, onClose, onNavigate, onSuggestionClick, suggestions }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose(); // fecha o popup se o clique for fora da popup page
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center popup-content">
            <div ref={popupRef} className="relative p-6 max-w-[500px] popup-page">
                <div className="absolute top-3 right-3 close-popup-content">
                    <button onClick={onClose} className="text-gray-500 close-popup-button">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div className="text-content h-[40%]">
                    <div className="max-w-[85%] title-content">
                        <h2 className="text-2xl font-semibold __title">{card.title}</h2>
                    </div>
                    <div className="description-content">
                        <p className="mt-4">{card.detailedDescription}</p>
                    </div>
                </div>
                
                <div className="flex absolute w-[120%] left-[-3.2em] top-1/2 justify-between items-center popup-buttons-content">
                    <button 
                    onClick={() => onNavigate("prev")}
                    className="popup-arrow left"
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.9991 19L9.83911 14C9.56672 13.7429 9.34974 13.433 9.20142 13.0891C9.0531 12.7452 8.97656 12.3745 8.97656 12C8.97656 11.6255 9.0531 11.2548 9.20142 10.9109C9.34974 10.567 9.56672 10.2571 9.83911 10L14.9991 5" />
                        </svg>
                    </button>
                    <button 
                    onClick={() => onNavigate("next")}
                    className="popup-arrow right"
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19" />
                        </svg>
                    </button>
                </div>

                <div className="flex absolute top-1/2 left-1/3 justify-center data-button-content">
                    <div className="data-button-container">
                        <button className="__button">Consultar dados</button>
                    </div>
                </div>

                <div className="absolute w-full bottom-8 left-0 pl-3 pr-3 suggestions-content">
                    <div className="__title">
                        <h3 className="mt-6 font-semibold">Confira também:</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 justify-items-center mt-2 suggestions-container">
                        {suggestions.map((suggestion, index) => (
                            <div className="relative button-container">
                                <button
                                key={index}
                                onClick={() => onSuggestionClick(index)}
                                className="flex w-[110px] h-[110px] justify-center items-center text-xs __button"
                                >   
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
