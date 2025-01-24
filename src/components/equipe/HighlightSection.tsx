import React from "react";

export interface HighlightMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
  reverse?: boolean; // Para inverter a ordem do texto e da imagem
  imagePosition?: string; // Classe adicional para controlar a posição da imagem
}

export const HighlightSection: React.FC<HighlightMemberProps> = ({
  name,
  role,
  image,
  description,
  reverse = false,
  imagePosition = "object-cover", // Valor padrão
}) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto mb-12 ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Imagem */}
      <div
        className="
          group w-full lg:w-1/2
          bg-white dark:bg-gray-800
          rounded-3xl shadow-2xl
          overflow-hidden transform transition
          hover:-translate-y-3 hover:shadow-2xl
        "
      >
        <div className="relative w-full h-72 overflow-hidden">
          <img
            src={image}
            alt={name}
            className={`
              w-full h-full object-cover scale-110
              transition-transform duration-1000
              group-hover:scale-125
              ${imagePosition} // Classe adicional
            `}
          />
          <div className="absolute inset-0 from-black via-transparent to-transparent opacity-50" />
        </div>
      </div>

      {/* Texto */}
      <div className="w-full lg:w-1/2 text-left">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {name}
        </h2>
        <h3 className="text-lg text-gray-500 dark:text-gray-400 mb-4">
          {role}
        </h3>
        <p className="text-base text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};
