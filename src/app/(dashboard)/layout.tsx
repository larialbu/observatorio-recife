"use client";
import { Suspense } from "react";
import { usePathname } from "next/navigation";

import { DrawingStoreProvider } from "@/components/@global/excalidraw/context/drawingStoreContext";
import { ExcalidrawProvider } from "@/components/@global/excalidraw/context/useContext";
import FloatingExcalidrawButton from "@/components/@global/excalidraw/floatButton";
import HiddenChartsPanel from "@/components/@global/features/HiddenChartsPanel";
import ToggleDarkMode from "@/components/@global/features/ToggleDarkMode";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import Navbar from "@/components/random_temp/Navbar";
import { Sidebar } from "@/components/random_temp/Sidebar";
import { DashboardProvider } from "@/context/DashboardContext";
import "@excalidraw/excalidraw/index.css";
import { getBackgroundForRoute } from "@/utils/dashboard/getBackgroundForRoute";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const backgroundClass = getBackgroundForRoute(pathname);

  return (
    <Suspense fallback={< LoadingScreen />}>
      <DashboardProvider>
        <div className="h-screen flex overflow-hidden">
          <Sidebar />
          <div
            className={`flex-1 ${backgroundClass} bg-cover overflow-scroll flex flex-col pb-[1em]`}
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