import React from "react";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export const ModalBoletim: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
                    &times; {/* Ícone de fechar */}
                </button>
                {children}
            </div>
        </div>
    );
};
