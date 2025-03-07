import React from "react";
import Link from "next/link";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  collaborator: {
    name: string;
    description: string;
    href: string;
    imageUrl?: string;
  } | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, collaborator }) => {
  if (!isOpen || !collaborator) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 backdrop-blur-sm transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      <div
        className={`
          relative w-full max-w-lg bg-white dark:bg-[#1d2b3d]
          rounded-lg shadow-2xl overflow-hidden p-6 mx-4
          transition-transform duration-300
          ${isOpen ? "translate-y-0" : "translate-y-8"}
        `}
      >
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3 w-8 h-8 bg-gray-200
            dark:bg-gray-700 rounded-full flex items-center justify-center
            text-gray-600 dark:text-gray-300 hover:brightness-110 transition
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Conteúdo do Modal */}
        <div className="flex flex-col items-center justify-center space-y-4 mt-2">
          {/* Logo */}
          {collaborator.imageUrl && (
            <img
              src={collaborator.imageUrl}
              alt={collaborator.name}
              className="w-32 h-auto object-contain mb-2 pointer-events-none dark:invert dark:grayscale dark:brightness-0 duration-0 dark:duration-0"
            />
          )}

          {/* Nome */}
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {collaborator.name}
          </h3>

          {/* Descrição */}
          <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
            {collaborator.description}
          </p>

          {/* Link */}
          <Link
            href={collaborator.href}
            className="px-4 py-3 bg-[#3381d4] rounded-lg text-white font-semibold dark:bg-[#EC6625]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </div>
  );
};
