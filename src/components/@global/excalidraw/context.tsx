import React, { createContext, useContext, useState, ReactNode } from "react";

interface ExcalidrawFile {
    mimeType: string;
    id: string;
    dataURL: string;
    created: number;
  }
  interface ExcalidrawImageElement {
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
interface ExcalidrawInitialDataState {
  elements: ExcalidrawImageElement[];
  files: { [fileId: string]: ExcalidrawFile };
  appState?: any;
}

interface ExcalidrawContextProps {
  initialData: ExcalidrawInitialDataState | null;
  setInitialData: React.Dispatch<React.SetStateAction<ExcalidrawInitialDataState | null>>;
  addChartToExcalidraw: (chartWrapper: HTMLElement) => Promise<void>;
}

const ExcalidrawContext = createContext<ExcalidrawContextProps | undefined>(undefined);

export const ExcalidrawProvider = ({ children }: { children: ReactNode }) => {
  const [initialData, setInitialData] = useState<ExcalidrawInitialDataState | null>(null);

  const addChartToExcalidraw = async (chartWrapper: HTMLElement) => {

    const { createCompositeChartImage, loadImageFromDataURL } = await import("./utils");
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

    setInitialData((prev: any) => {
      const newFile = {
        mimeType: "image/png",
        id: fileId,
        dataURL,
        created: Date.now(),
      };
      let newElements = prev ? [...prev.elements, imageElement] : [imageElement];
      let newFiles = prev ? { ...prev.files, [fileId]: newFile } : { [fileId]: newFile };
      return {
        elements: newElements,
        files: newFiles,
        appState: { viewBackgroundColor: "#fff" },
      };
    });
  };

  return (
    <ExcalidrawContext.Provider value={{ initialData, setInitialData, addChartToExcalidraw }}>
      {children}
    </ExcalidrawContext.Provider>
  );
};

export const useExcalidraw = () => {
  const context = useContext(ExcalidrawContext);
  if (!context) {
    throw new Error("useExcalidraw deve ser usado dentro de um ExcalidrawProvider");
  }
  return context;
};
