import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { Zenitho } from "uvcanvas";

import { useIsMobile } from "@/hooks/useIsMobile";

import Excalidraw, {
  ExcalidrawImperativeAPI,
  AppState,
  BinaryFiles,
  getExcalidrawUtils,
} from "./client/excalidraw.client";
import { useDrawingStore } from "./context/drawingStoreContext";
import { useExcalidraw } from "./context/useContext";
import { saveExcalidrawBuffer, loadExcalidrawBuffer, saveExcalidrawDraft, loadExcalidrawDraft } from "./handleSaves";
import IntroExcalidraw from "./intro";
import SavedDrawingsPanel from "./SavedDrawingsPanel";

const fixAppState = (appState: any): any => ({
  ...appState,
  collaborators:
    appState && typeof appState.collaborators === "object" &&
    !(appState.collaborators instanceof Map)
      ? new Map(Object.entries(appState.collaborators))
      : new Map(),
});

const fixInitialData = (data: any): any => ({
  elements: data.elements,
  appState: fixAppState(data.appState),
  files: data.files,
});

type ViewMode = "editor" | "saved";

const FloatingExcalidrawButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("editor");
  const excalidrawAPIRef = useRef<ExcalidrawImperativeAPI | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(false);
  const [shouldGlow, setShouldGlow] = useState(false);


  const { initialData, setInitialData } = useExcalidraw();
  const isMobile = useIsMobile();

  const sceneDataRef = useRef<{ elements: any[]; appState: any; files: any }>({
    elements: [],
    appState: {},
    files: {},
  });

  const hasUserModified = useRef(false);

  const { currentDrawing, createNewDrawing, saveDrawing, setCurrentDrawing } =
    useDrawingStore();

  useEffect(() => {
    if (excalidrawAPIRef.current && initialData) {
      console.log("Atualizando cena com novo initialData", initialData);
      excalidrawAPIRef.current.updateScene(fixInitialData(initialData) as any);
    }
  }, [initialData]);

  useEffect(() => {
    const seen = localStorage.getItem("seen-intro-excalidraw");
    if (!seen) {
      setShowIntro(true);
      setShouldGlow(true);
      localStorage.setItem("seen-intro-excalidraw", "true");
    }
  }, []);

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
    async (elements: readonly any[], appState: AppState, files: BinaryFiles) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
  
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const { serializeAsJSON } = await getExcalidrawUtils();
          const jsonString = serializeAsJSON(elements, appState, files, "local");
          const uint8 = new TextEncoder().encode(jsonString);
          await saveExcalidrawDraft(uint8.buffer as any);
        } catch (err) {
          console.error("Erro ao salvar rascunho:", err);
        }
      }, 1000);
    },
    []
  );

  const loadSceneOnOpen = useCallback(async () => {
    if (isOpen && excalidrawAPIRef.current) {
      const savedDraft = await loadExcalidrawDraft();
      const baseData = initialData ? fixInitialData(initialData) : { elements: [], appState: {}, files: {} };
  
      if (savedDraft) {
        const mergedData = {
          elements: [...baseData.elements, ...savedDraft.elements],
          appState: { ...baseData.appState, ...savedDraft.appState },
          files: { ...baseData.files, ...savedDraft.files },
        };
  
        excalidrawAPIRef.current.updateScene({
          elements: mergedData.elements,
          appState: fixAppState(mergedData.appState),
          files: mergedData.files,
        } as any);
        console.log("[Excalidraw] Dados combinados (initialData + rascunho)");
      } else {
        excalidrawAPIRef.current.updateScene(baseData as any);
        console.log("[Excalidraw] InitialData carregado");
      }
    }
  }, [isOpen, initialData]);

  const handleOnChange = useCallback(
    (elements: readonly any[], appState: AppState, files: BinaryFiles) => {
      hasUserModified.current = true;
      sceneDataRef.current = { elements: [...elements], appState, files };
      handleDebouncedSave(elements, appState, files);
    },
    [handleDebouncedSave]
  );

  const handleSaveDrawing = async () => {
    console.log("handleSaveDrawing: Iniciando o salvamento.");
    if (!excalidrawAPIRef.current) return;
  
    let drawingToSave = currentDrawing;
    if (!drawingToSave) {
      drawingToSave = await createNewDrawing("Sem título");
    }
  
    const canvas = document.querySelector(".excalidraw") as HTMLElement;
    let thumbnail: string | null = null;
    if (canvas) {
      try {
        const { captureElementAsPNG } = await import("./utils");
        const result = await captureElementAsPNG(canvas);
        thumbnail = result.dataURL;
      } catch (error) {
        console.warn("Erro ao gerar thumbnail:", error);
      }
    }
  
    await saveDrawing(drawingToSave, {
      ...sceneDataRef.current,
      thumbnail,
    });

    localStorage.removeItem("excalidrawDraft");
  
    alert("Desenho salvo!");
  };
  

  const handleNewDrawing = async () => {
    const newDrawing = await createNewDrawing("Sem título");
    if (excalidrawAPIRef.current) {
      excalidrawAPIRef.current.updateScene({
        elements: [],
        appState: { viewBackgroundColor: "#fff", collaborators: new Map() },
      });
    }
    hasUserModified.current = false;
    localStorage.removeItem("excalidrawDraft");
    alert("Novo desenho criado!");
  };

  const handleLoadSavedDrawing = async (drawing: any) => {
    if (!excalidrawAPIRef.current) return;

    setCurrentDrawing(drawing);
    if (drawing.data) {
      excalidrawAPIRef.current.updateScene({
        elements: drawing.data.elements,
        appState: fixAppState(drawing.data.appState),
        files: drawing.data.files,
      } as any);

      setInitialData(drawing.data);
      alert(`Desenho "${drawing.name}" carregado!`);
      setViewMode("editor");
      hasUserModified.current = false;
    } else {
      alert("Este desenho não possui dados salvos.");
    }
  };

  useEffect(() => {
    const mergeInitialDataWithDraft = async () => {
      if (!isOpen) return;
  
      const draft = await loadExcalidrawDraft();
  
      const merged = {
        elements: [...(initialData?.elements || []), ...(draft?.elements || [])],
        appState: {
          ...initialData?.appState,
          ...(draft?.appState || {}),
        },
        files: {
          ...(initialData?.files || {}),
          ...(draft?.files || {}),
        },
      };
  
      console.log("[Excalidraw] initialData mesclado com rascunho:", merged);
  
      setInitialData({
        elements: merged.elements,
        appState: {
          ...merged.appState,
          collaborators: new Map(),
        },
        files: merged.files,
      });
    };
  
    mergeInitialDataWithDraft();

    setInitialData({
      elements: [],
      appState: { viewBackgroundColor: "#fff", collaborators: new Map() },
      files: {},
    });
  }, [isOpen]);
  

  const modal = isOpen && createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        ref={containerRef}
        className={`bg-white rounded-lg shadow-2xl relative overflow-hidden ${
          isFullscreen ? "w-full h-full" : "w-[95%] h-[95%]"
        } flex flex-col`}
      >

        <div className="flex justify-between items-center p-3 border-b bg-gray-50 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800">
            {viewMode === "editor" ? "Editor de Quadros" : "Minhas Telas"}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setViewMode(viewMode === "editor" ? "saved" : "editor")
              }
              className="w-9 aspect-square px-1 flex items-center gap-1 bg-green-500 border border-green-600 text-blue-600 rounded hover:bg-green-700 transition"
            >
              {viewMode === "editor" ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                  <path d="M19 10V6C19 5.44772 18.5523 5 18 5H10.0351C9.73195 5 9.44513 4.86245 9.25533 4.62602L8.25023 3.37398C8.06042 3.13755 7.77361 3 7.47042 3H3C2.44772 3 2 3.44772 2 4L2 15C2 15.5523 2.44772 16 3 16H5" stroke="white" strokeWidth="1.5"/>
                  <path d="M5 20V9C5 8.44772 5.44772 8 6 8H10.4704C10.7736 8 11.0604 8.13755 11.2502 8.37398L12.2553 9.62602C12.4451 9.86245 12.7319 10 13.0351 10H21C21.5523 10 22 10.4477 22 11V20C22 20.5523 21.5523 21 21 21H6C5.44772 21 5 20.5523 5 20Z" stroke="white" strokeWidth="1.5"/>
                </svg> 
                : 
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="white"/>
                </svg>
              }
            </button>
            <button
              onClick={toggleFullscreen}
              className="w-9 aspect-square px-1 bg-blue-500 border border-blue-600 text-blue-600 rounded hover:bg-blue-700 transition"
            >
              {isFullscreen ? 
              // Maximizar
                <svg width="100%" height="100%" viewBox="0 0 32 32" id="i-fullscreen-exit" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M4 12 L12 12 12 4 M20 4 L20 12 28 12 M4 20 L12 20 12 28 M28 20 L20 20 20 28"/>
                </svg> 
              // Minimizar
              : <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.00002 3.99998H4.00004L4 9M20 8.99999V4L15 3.99997M15 20H20L20 15M4 15L4 20L9.00002 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>  
                }
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition"
            >
              X
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gray-50 p-4">
          {viewMode === "editor" ? (
            <Excalidraw
              langCode="pt-BR"
              initialData={
                initialData ? fixInitialData(initialData) : undefined
              }
              excalidrawAPI={(api) => (excalidrawAPIRef.current = api)}
              onChange={handleOnChange}
            />
          ) : (
            <SavedDrawingsPanel
              onLoadDrawing={handleLoadSavedDrawing}
              onClose={() => setViewMode("editor")}
            />
          )}
        </div>

        {viewMode === "editor" && (
          <div className="bg-white border-t flex justify-end items-center px-6 py-3 space-x-3 shadow-inner">
            <button
              onClick={handleNewDrawing}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Novo
            </button>
            <button
              onClick={handleSaveDrawing}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );  

  return (
    <>
      {showIntro && <IntroExcalidraw onClose={() => setShowIntro(false)} />}
      <button onClick={() => {
        setIsOpen((prev) => !prev);
        setShouldGlow(false);
      }} 
      className={`fixed overflow-hidden bottom-5 right-4 z-50 w-32 h-[3em] text-white rounded-full shadow-lg transition 
        ${shouldGlow ? "animate-glow shadow-yellow-500/60" : "bg-blue-500 hover:bg-blue-600"}`}>
        <div className="z-20 absolute flex w-full h-full justify-center items-center bottom-0">
          {isOpen ? "Fechar Quadro" : "Abrir Quadro"}
        </div>
        {shouldGlow && (
          <div className="z-10 absolute top-0 left-0 w-full h-full brightness-75 pointer-events-none">
            <Zenitho />
          </div>
        )}
      </button>
      {modal}
    </>
  );
};

export default FloatingExcalidrawButton;
