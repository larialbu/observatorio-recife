"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";

export type {
  ExcalidrawImperativeAPI,
  AppState,
  BinaryFiles,
} from "@excalidraw/excalidraw/types";

export async function getExcalidrawUtils() {
  const mod = await import("@excalidraw/excalidraw");
  return {
    restore: mod.restore,
    serializeAsJSON: mod.serializeAsJSON,
  };
}

const LazyExcalidraw = dynamic(
  async () => {
    const mod = await import("@excalidraw/excalidraw");
    return mod.Excalidraw;
  },
  {
    ssr: false,
    loading: () => <div>Carregando Excalidraw...</div>,
  }
);

export default LazyExcalidraw;
