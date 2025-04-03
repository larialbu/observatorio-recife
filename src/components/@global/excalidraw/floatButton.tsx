"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useExcalidraw } from "@/components/@global/excalidraw/context";
import { useIsMobile } from "@/hooks/useIsMobile";
import { serializeAsJSON, restore } from "@excalidraw/excalidraw";
import { saveExcalidrawBuffer, loadExcalidrawBuffer } from "./handleSaves";
import type {
  ExcalidrawImperativeAPI,
  AppState,
  BinaryFiles,
} from "@excalidraw/excalidraw/types";

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
  const excalidrawAPIRef = useRef<ExcalidrawImperativeAPI | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { initialData } = useExcalidraw();
  const isMobile = useIsMobile();

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, []);

  const handleDebouncedSave = useCallback(
    (elements: readonly any[], appState: AppState, files: BinaryFiles) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const restored = restore({ elements, appState, files }, null, null);
          const jsonString = serializeAsJSON(restored.elements, restored.appState, restored.files, "local");
          const uint8 = new TextEncoder().encode(jsonString);
          const buffer = uint8.buffer as ArrayBuffer;
          await saveExcalidrawBuffer(buffer);
        } catch (err) {
          console.error("Erro ao salvar com debounce:", err);
        }
      }, 1000);
    },
    []
  );

  const loadSceneOnOpen = useCallback(async () => {
    if (isOpen && excalidrawAPIRef.current) {
      const saved = await loadExcalidrawBuffer();
      if (saved) {
        excalidrawAPIRef.current.updateScene({
          elements: saved.elements,
          appState: saved.appState,
          files: saved.files,
        } as any);
        console.log("[Excalidraw] Cena restaurada ao abrir");
      } else {
        console.log("[Excalidraw] Nenhum dado salvo para restaurar");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    loadSceneOnOpen();
  }, [isOpen, loadSceneOnOpen]);
  

  const modal = isOpen &&
    createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div
        ref={containerRef}
        className={`bg-white rounded-lg shadow-xl relative ${
          isFullscreen ? "fixed inset-0 m-0" : ""
        }`}
        style={{
          width: isFullscreen ? "100%" : isMobile ? "100%" : "95%",
          height: isFullscreen ? "100%" : isMobile ? "90%" : "95%",
        }}
      >
          <Excalidraw
            langCode="pt-BR"
            initialData={initialData as any || undefined}
            excalidrawAPI={(api) => (excalidrawAPIRef.current = api)}
            onChange={handleDebouncedSave}
          />
          <div className={`z-10 absolute flex-row-reverse flex gap-2 ${isMobile ? `z-10 scale-90 ${isFullscreen ? "top-16 right-8" : "-top-7 right-2"}` : "top-4 right-4"}`}>
          <button
            onClick={() => setIsOpen(false)}
            className={`w-10 p-2 h-fit bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 ${isMobile ? "" : ""} `}
          >
            X
          </button>
          <button
            onClick={toggleFullscreen}
            className="w-10 p-2 h-fit bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
          >
            {isFullscreen ? 
            // Maximizar
              <svg width="100%" height="100%" viewBox="0 0 32 32" id="i-fullscreen-exit" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M4 12 L12 12 12 4 M20 4 L20 12 28 12 M4 20 L12 20 12 28 M28 20 L20 20 20 28"/>
              </svg> 
            // Minimizar
            : <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.00002 3.99998H4.00004L4 9M20 8.99999V4L15 3.99997M15 20H20L20 15M4 15L4 20L9.00002 20" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          </button>
        </div>
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
