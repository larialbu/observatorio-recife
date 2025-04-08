import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useExcalidraw } from "./context/useContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { saveExcalidrawBuffer, loadExcalidrawBuffer } from "./handleSaves";
import { useDrawingStore } from "./context/drawingStoreContext";
import SavedDrawingsPanel from "./SavedDrawingsPanel";
import Excalidraw, {
  ExcalidrawImperativeAPI,
  AppState,
  BinaryFiles,
  getExcalidrawUtils,
} from "./excalidraw.client";

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
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const { restore, serializeAsJSON } = await getExcalidrawUtils();
          const restored = restore({ elements, appState, files }, null, null);
          const jsonString = serializeAsJSON(
            restored.elements,
            restored.appState,
            restored.files,
            "local"
          );
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
          appState: fixAppState(saved.appState),
          files: saved.files,
        } as any);
        console.log("[Excalidraw] Cena restaurada ao abrir");
      } else {
        console.log("[Excalidraw] Nenhum dado salvo para restaurar");
      }
    }
  }, [isOpen]);

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
  
    setInitialData({
      elements: sceneDataRef.current.elements,
      appState: fixAppState(sceneDataRef.current.appState),
      files: sceneDataRef.current.files,
    });
  
    alert("Desenho salvo!");
  };
  

  const handleNewDrawing = async () => {
    const newDrawing = await createNewDrawing("Untitled");
    if (excalidrawAPIRef.current) {
      excalidrawAPIRef.current.updateScene({
        elements: [],
        appState: { viewBackgroundColor: "#fff", collaborators: new Map() },
      });
    }
    hasUserModified.current = false;
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

  const modal = isOpen && createPortal(
    <div className="fixed inset-0 z-50 flex flex-col bg-black/50">
      <div
        ref={containerRef}
        className={`bg-white rounded-lg shadow-xl relative m-auto ${
          isFullscreen ? "w-full h-full" : "w-11/12 h-5/6"
        }`}
      >
        <div className="flex justify-between items-center p-2 border-b">
          <h2 className="text-lg font-bold">
            {viewMode === "editor" ? "Excalidraw Editor" : "Painel de Telas Salvas"}
          </h2>
          <div className="flex gap-2">
            {viewMode === "editor" ? (
              <button onClick={() => setViewMode("saved")} className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600">Salvos</button>
            ) : (
              <button onClick={() => setViewMode("editor")} className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600">Editor</button>
            )}
            <button onClick={toggleFullscreen} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
              {isFullscreen ? "Sair Full" : "Full"}
            </button>
            <button onClick={() => setIsOpen(false)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">X</button>
          </div>
        </div>
        <div className="h-full overflow-auto">
          {viewMode === "editor" ? (
            <Excalidraw
              langCode="pt-BR"
              initialData={initialData ? fixInitialData(initialData) : undefined}
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
          <div className="z-10 absolute bottom-4 right-4 flex gap-2">
            <button onClick={handleNewDrawing} className="w-10 p-2 bg-green-500 text-white rounded-full hover:bg-green-600">N</button>
            <button onClick={handleSaveDrawing} className="w-10 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600">S</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <button onClick={() => setIsOpen((prev) => !prev)} className="fixed bottom-4 right-4 z-50 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600">
        {isOpen ? "Fechar Quadro" : "Abrir Quadro"}
      </button>
      {modal}
    </>
  );
};

export default FloatingExcalidrawButton;
