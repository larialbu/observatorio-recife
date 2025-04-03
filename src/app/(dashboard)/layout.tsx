"use client";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/home/LoadingScreen";

import Navbar from "@/components/random_temp/Navbar";
import { Sidebar } from "@/components/random_temp/Sidebar";
import { DashboardProvider } from "@/context/DashboardContext";
import { usePathname } from "next/navigation";
import HiddenChartsPanel from "@/components/@global/features/HiddenChartsPanel";
import { ExcalidrawProvider } from "@/components/@global/excalidraw/context";
import { DrawingStoreProvider } from "@/components/@global/excalidraw/drawingStoreContext";
import FloatingExcalidrawButton from "@/components/@global/excalidraw/floatButton";
import "@excalidraw/excalidraw/index.css";

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
        return "bg-[url('/images/backgrounds/dashboard/bal_comercial.avif')]";
      case "/observatorio/aeroportos":
        return "bg-[url('/images/backgrounds/dashboard/aeroportos.avif')]";
      case "/observatorio/ipca":
        return "bg-[url('/images/backgrounds/dashboard/ipca.avif')]";
      case "/observatorio/ranking-municipios":
        return "bg-[url('/images/backgrounds/dashboard/ranking.avif')]";
      case "/observatorio/portos":
        return "bg-[url('/images/backgrounds/dashboard/portos.avif')]";
        case "/observatorio/pib":
        return "bg-[url('/images/backgrounds/dashboard/pib.avif')]";
      case "/observatorio/panorama":
        return "bg-[url('/images/backgrounds/dashboard/ipca.avif')]";
      default:
        return "bg-[#F7F8FA]";
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