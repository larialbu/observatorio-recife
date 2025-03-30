"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useExcalidraw } from "@/components/@global/excalidraw/context";
import { useIsMobile } from "@/hooks/useIsMobile";

const Excalidraw = dynamic(
  async () => {
    const mod = await import("@excalidraw/excalidraw");
    return mod.Excalidraw;
  },
  {
    ssr: false,
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        Carregando editor...
      </div>
    ),
  }
);

const FloatingExcalidrawButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { initialData } = useExcalidraw();
  const isMobile = useIsMobile();

  const modal = isOpen && createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="bg-white rounded-lg shadow-xl relative"
        style={{ 
          width: isMobile ? "90%" : "95%",
          height: isMobile ? "90%" : "95%"
        }}
      >
        <Excalidraw langCode="pt-BR" initialData={initialData as any || undefined}/>
        <button
          onClick={() => setIsOpen(false)}
          className={`absolute z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 ${
            isMobile ? "-top-7 -right-5 px-3" : "top-4 right-4"
          }`}
        >
          {isMobile ? "X" : "Fechar"}
        </button>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-50 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
      >
        {isOpen ? "Quadro aberto" : "Quadro"}
      </button>
      {modal}
    </>
  );
};

export default FloatingExcalidrawButton;
