import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useExcalidraw } from "./context";
import { useIsMobile } from "@/hooks/useIsMobile";
import { serializeAsJSON, restore } from "@excalidraw/excalidraw";
import { saveExcalidrawBuffer, loadExcalidrawBuffer } from "./handleSaves";
import { useDrawingStore } from "./drawingStoreContext";
import SavedDrawingsPanel from "./SavedDrawingsPanel";
import type {
  ExcalidrawImperativeAPI,
  AppState,
  BinaryFiles,
} from "@excalidraw/excalidraw/types";

const fixAppState = (appState: any): any => {
  return {
    ...appState,
    collaborators:
      appState && typeof appState.collaborators === "object" &&
      !(appState.collaborators instanceof Map)
        ? new Map(Object.entries(appState.collaborators))
        : new Map(),
  };
};

const fixInitialData = (data: any): any => ({
  elements: data.elements,
  appState: fixAppState(data.appState),
  files: data.files,
});

type ViewMode = "editor" | "saved";

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
    (elements: readonly any[], appState: AppState, files: BinaryFiles) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(async () => {
        try {
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

  useEffect(() => {
    loadSceneOnOpen();
  }, [isOpen, loadSceneOnOpen]);

  const handleSaveDrawing = async () => {
    console.log("handleSaveDrawing: Iniciando o salvamento.");
    if (!excalidrawAPIRef.current) {
      console.log("handleSaveDrawing: excalidrawAPIRef.current não está definido.");
      return;
    }
    console.log("handleSaveDrawing: Cena atual armazenada:", sceneDataRef.current);
    
    let drawingToSave = currentDrawing;
    if (!drawingToSave) {
      console.log("handleSaveDrawing: currentDrawing é nulo. Criando novo desenho.");
      drawingToSave = await createNewDrawing("Untitled");
      console.log("handleSaveDrawing: Novo desenho criado:", drawingToSave);
    } else {
      console.log("handleSaveDrawing: currentDrawing já existe:", drawingToSave);
    }
    await saveDrawing(drawingToSave, sceneDataRef.current);
    setInitialData({
      elements: sceneDataRef.current.elements,
      appState: fixAppState(sceneDataRef.current.appState),
      files: sceneDataRef.current.files,
    });
    console.log("handleSaveDrawing: Desenho salvo com sucesso.");
    alert("Desenho salvo!");
  };

  // Cria uma nova cena / desenho (Melhorar essa dinâmica para o usuário escolher um titulo)
  const handleNewDrawing = async () => {
    const newDrawing = await createNewDrawing("Untitled");
    if (excalidrawAPIRef.current) {
      excalidrawAPIRef.current.updateScene({
        elements: [],
        appState: { viewBackgroundColor: "#fff", collaborators: new Map() },
      });
    }
    hasUserModified.current = false;
    console.log("handleNewDrawing: Novo desenho criado:", newDrawing);
    alert("Novo desenho criado!");
  };

  // abrir um desenho no painel
  const handleLoadSavedDrawing = async (drawing: any) => {
    console.log("handleLoadSavedDrawing: Tentando carregar desenho:", drawing);
    if (!excalidrawAPIRef.current) {
      console.log("handleLoadSavedDrawing: excalidrawAPIRef.current não está definido.");
      return;
    }
    setCurrentDrawing(drawing);
    if (drawing.data) {
      console.log("handleLoadSavedDrawing: Dados encontrados no desenho:", drawing.data);
      excalidrawAPIRef.current.updateScene({
        elements: drawing.data.elements,
        appState: fixAppState(drawing.data.appState),
        files: drawing.data.files,
      } as any);

      setInitialData(drawing.data);
      console.log(`handleLoadSavedDrawing: Desenho "${drawing.name}" carregado!`);
      alert(`Desenho "${drawing.name}" carregado!`);
      setViewMode("editor");
      hasUserModified.current = false;
    } else {
      console.log("handleLoadSavedDrawing: O desenho não possui dados salvos.");
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
              <button
                onClick={() => setViewMode("saved")}
                className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600"
                title="Ver desenhos salvos"
              >
                Salvos
              </button>
            ) : (
              <button
                onClick={() => setViewMode("editor")}
                className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600"
                title="Voltar ao Editor"
              >
                Editor
              </button>
            )}
            <button
              onClick={toggleFullscreen}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              title="Fullscreen"
            >
              {isFullscreen ? "Sair Full" : "Full"}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              title="Fechar"
            >
              X
            </button>
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
            <button
              onClick={handleNewDrawing}
              className="w-10 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
              title="Novo Desenho"
            >
              N
            </button>
            <button
              onClick={handleSaveDrawing}
              className="w-10 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300"
              title="Salvar Desenho"
            >
              S
            </button>
          </div>
        )}
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
        {isOpen ? "Fechar Quadro" : "Abrir Quadro"}
      </button>
      {modal}
    </>
  );
};

export default FloatingExcalidrawButton;
