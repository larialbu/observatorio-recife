"use client";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/home/LoadingScreen";

import Navbar from "@/components/random_temp/Navbar";
import { Sidebar } from "@/components/random_temp/Sidebar";
import { DashboardProvider } from "@/context/DashboardContext";
import { usePathname } from "next/navigation";
import HiddenChartsPanel from "@/components/@global/features/HiddenChartsPanel";
import { ExcalidrawProvider } from "@/components/@global/excalidraw/context/useContext";
import { DrawingStoreProvider } from "@/components/@global/excalidraw/context/drawingStoreContext";
import FloatingExcalidrawButton from "@/components/@global/excalidraw/floatButton";
import "@excalidraw/excalidraw/index.css";
import ToggleDarkMode from "@/components/@global/features/ToggleDarkMode";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define backgrounds para cada rota específica
const getBackgroundForRoute = () => {
  switch (pathname) {
    case "/observatorio/balanca-comercial":
      return "bg-[url('/images/backgrounds/dashboard/light/bal_comercial.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/bal_comercial.avif')]";
    case "/observatorio/aeroportos":
      return "bg-[url('/images/backgrounds/dashboard/light/aeroportos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/aeroportos.avif')]";
    case "/observatorio/ipca":
      return "bg-[url('/images/backgrounds/dashboard/light/ipca.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/ipca.avif')]";
    case "/observatorio/ranking-municipios":
      return "bg-[url('/images/backgrounds/dashboard/light/ranking.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/ranking.avif')]";
    case "/observatorio/portos":
      return "bg-[url('/images/backgrounds/dashboard/light/portos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/portos.avif')]";
    case "/observatorio/pib":
      return "bg-[url('/images/backgrounds/dashboard/light/pib.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/pib.avif')]";
    case "/observatorio/empregos":
    case "/observatorio/rais":
      return "bg-[url('/images/backgrounds/dashboard/light/empregos.avif')] dark:bg-[url('/images/backgrounds/dashboard/dark/empregos.avif')]";
    default:
      return "bg-[#F7F8FA] dark:bg-[#0C1B2B]";
  }
};

  return (
    <Suspense fallback={< LoadingScreen />}>
      <DashboardProvider>
        <div className="h-screen flex overflow-hidden">
          <Sidebar />
          <div
            className={`flex-1 ${getBackgroundForRoute()} bg-cover overflow-scroll flex flex-col pb-[1em]`}
          >
            <Navbar />
            <ToggleDarkMode />
            <HiddenChartsPanel />
            <DrawingStoreProvider>
              <ExcalidrawProvider>
                {children}
                <FloatingExcalidrawButton />
              </ExcalidrawProvider>
            </DrawingStoreProvider>
          </div>
        </div>
      </DashboardProvider>
    </Suspense>
  );
}