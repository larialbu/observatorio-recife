import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { loadExcalidrawBuffer } from "../handleSaves";

export interface ExcalidrawFile {
  mimeType: string;
  id: string;
  dataURL: string;
  created: number;
}

export interface ExcalidrawImageElement {
  type: "image";
  id: string;
  status: "saved";
  fileId: string;
  version: number;
  versionNonce: number;
  x: number;
  y: number;
  width: number;
  height: number;
  scale: [number, number];
  angle: number;
  isDeleted: boolean;
  fillStyle: string;
  strokeWidth: number;
  strokeStyle: string;
  roughness: number;
  opacity: number;
  groupIds: string[];
  strokeColor: string;
  backgroundColor: string;
  seed: number;
  roundness: number | null;
  frameId: null;
  boundElements: null;
  updated: number;
  locked: boolean;
  link: null;
}

export interface ExcalidrawInitialDataState {
  elements: ExcalidrawImageElement[];
  files: { [fileId: string]: ExcalidrawFile };
  appState: {
    viewBackgroundColor: string;
    collaborators: Map<any, any>;
    [key: string]: any;
  };
}

interface ExcalidrawContextProps {
  initialData: ExcalidrawInitialDataState;
  setInitialData: React.Dispatch<
    React.SetStateAction<ExcalidrawInitialDataState>
  >;
  addChartToExcalidraw: (chartWrapper: HTMLElement) => Promise<void>;
}

const defaultInitialData: ExcalidrawInitialDataState = {
  elements: [],
  files: {},
  appState: { viewBackgroundColor: "#fff", collaborators: new Map() },
};

const ExcalidrawContext = createContext<ExcalidrawContextProps | undefined>(
  undefined
);

export const ExcalidrawProvider = ({ children }: { children: ReactNode }) => {
  const [initialData, setInitialData] =
    useState<ExcalidrawInitialDataState>(defaultInitialData);

  const addChartToExcalidraw = async (chartWrapper: HTMLElement) => {
    const { createCompositeChartImage, loadImageFromDataURL } =
      await import("../utils");
    const dataURL = await createCompositeChartImage(chartWrapper);
    if (!dataURL) return;
    const finalImg = await loadImageFromDataURL(dataURL);
    const totalWidth = finalImg.width;
    const totalHeight = finalImg.height;
    const fileId = "chart-" + Date.now();
    const imageElement = {
      type: "image",
      id: "image-element-" + Date.now(),
      status: "saved",
      fileId,
      version: 2,
      versionNonce: Date.now(),
      x: 100,
      y: 100,
      width: totalWidth,
      height: totalHeight,
      scale: [1, 1],
      angle: 0,
      isDeleted: false,
      fillStyle: "hachure",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      groupIds: [],
      strokeColor: "#000000",
      backgroundColor: "transparent",
      seed: Date.now(),
      roundness: null,
      frameId: null,
      boundElements: null,
      updated: Date.now(),
      locked: false,
      link: null,
    };

    setInitialData((prev: any) => ({
      elements: [...prev.elements, imageElement],
      files: {
        ...prev.files,
        [fileId]: { mimeType: "image/png", id: fileId, dataURL, created: Date.now() },
      },
      appState: { ...prev.appState },
    }));
  };

  useEffect(() => {
    const loadFromDB = async () => {
      const saved = await loadExcalidrawBuffer();
      if (saved) {
        setInitialData((prev) => ({
          elements: [...(prev.elements || []), ...saved.elements],
          files: { ...(prev.files || {}), ...saved.files },
          appState: {
            ...saved.appState,
            collaborators: saved.appState && saved.appState.collaborators instanceof Map
              ? saved.appState.collaborators
              : new Map(),
          },
        }));
        console.log("[Quadro] Dados carregados");
      } else {
        console.log("[Quadro] Nenhum dado salvo.");
      }
    };
    loadFromDB();
  }, []);

  return (
    <ExcalidrawContext.Provider
      value={{ initialData, setInitialData, addChartToExcalidraw }}
    >
      {children}
    </ExcalidrawContext.Provider>
  );
};

export const useExcalidraw = () => {
  const context = useContext(ExcalidrawContext);
  if (!context) {
    throw new Error(
      "useExcalidraw deve ser usado dentro de um ExcalidrawProvider"
    );
  }
  return context;
};
