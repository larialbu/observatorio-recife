import React, { createContext, useContext, useState, ReactNode } from "react";
import { DrawingStore } from "./drawing-store";
import type { IDrawing } from "./drawing-store";

interface DrawingStoreContextProps {
  currentDrawing: IDrawing | null;
  setCurrentDrawing: (drawing: IDrawing | null) => void;
  createNewDrawing: (name?: string) => Promise<IDrawing>;
  loadDrawing: (id: string) => Promise<void>;
  saveCurrentDrawing: (data: any) => Promise<void>;
  deleteCurrentDrawing: (id: string) => Promise<void>;
  getAllDrawings: () => IDrawing[];
  saveDrawing: (drawing: IDrawing, data: any) => Promise<IDrawing>;
}

const DrawingStoreContext = createContext<DrawingStoreContextProps | undefined>(
  undefined
);

export const DrawingStoreProvider = ({ children }: { children: ReactNode }) => {
  const [currentDrawing, setCurrentDrawing] = useState<IDrawing | null>(null);

  const createNewDrawing = async (name: string = "Untitled"): Promise<IDrawing> => {
    const drawing = await DrawingStore.newDrawing(name);
    setCurrentDrawing(drawing);
    return drawing;
  };

  const loadDrawing = async (id: string) => {
    const drawing = await DrawingStore.loadDrawing(id);
    if (drawing) {
      setCurrentDrawing(drawing);
    }
  };

  const saveCurrentDrawing = async (data: any) => {
    if (!currentDrawing) return;
    const updatedDrawing = { ...currentDrawing, data, updatedAt: Date.now() };
    await DrawingStore.saveCurrentDrawing(updatedDrawing);
    setCurrentDrawing(updatedDrawing);
  };

  const saveDrawing = async (drawing: IDrawing, data: any): Promise<IDrawing> => {
    console.log("saveDrawing: Salvando desenho:", drawing);
    const updatedDrawing = { ...drawing, data, updatedAt: Date.now() };
    console.log("saveDrawing: Desenho atualizado:", updatedDrawing);
    await DrawingStore.saveCurrentDrawing(updatedDrawing);
    setCurrentDrawing(updatedDrawing);
    console.log("saveDrawing: Desenho salvo no drawing-store.");
    return updatedDrawing;
  };

  const deleteCurrentDrawing = async (id: string) => {
    await DrawingStore.deleteDrawing(id);
    if (currentDrawing?.id === id) {
      setCurrentDrawing(null);
    }
  };

  const getAllDrawings = (): IDrawing[] => {
    return DrawingStore.getAllDrawings();
  };

  return (
    <DrawingStoreContext.Provider
      value={{
        currentDrawing,
        setCurrentDrawing,
        createNewDrawing,
        loadDrawing,
        saveCurrentDrawing,
        deleteCurrentDrawing,
        getAllDrawings,
        saveDrawing,
      }}
    >
      {children}
    </DrawingStoreContext.Provider>
  );
};

export const useDrawingStore = () => {
  const context = useContext(DrawingStoreContext);
  if (!context) {
    throw new Error("useDrawingStore must be used within a DrawingStoreProvider");
  }
  return context;
};
