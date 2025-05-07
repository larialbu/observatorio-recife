import React from "react";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  tutorial: React.ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  tutorial,
}) => {
  // Impede rolagem do body enquanto o modal está aberto
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Fecha modal ao pressionar ESC
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose} // Fecha ao clicar fora
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full p-6 relative transform transition-all animate-scaleIn"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
      >
        {/* Botão Fechar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-2xl focus:outline-none"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          &times;
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white border-b pb-2">
          {title}
        </h2>

        {/* Descrição */}
        <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>

        {/* Conteúdo do Tutorial */}
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          {typeof tutorial === "string" ? <p>{tutorial}</p> : tutorial}
        </div>

        {/* Botão Fechar */}
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;