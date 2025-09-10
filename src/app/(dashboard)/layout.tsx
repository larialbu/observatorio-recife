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
import { PageRenderer } from "@/components/@global/features/PageRenderer";
import { DashboardProvider } from "@/context/DashboardContext";
import { BundleProvider } from "@/context/BundleContext";
import "@excalidraw/excalidraw/index.css";
import { getBackgroundForRoute } from "@/utils/dashboard/getBackgroundForRoute";
import { MaintenancePage } from "@/components/observatorio/MaintenancePage";
import { PagesProvider, usePages } from "@/context/PagesContext";

 
function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
 
  const { isPageActive, backLink } = usePages()

  if (isPageActive === null) {
    return <LoadingScreen />;
  }

  const backgroundClass = getBackgroundForRoute(pathname);

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div
        className={`flex-1 ${backgroundClass} bg-cover overflow-y-auto flex flex-col ${
          !isPageActive ? "" : "pb-[1em]"
        }`}
      >
        {isPageActive ? (
          <>
            <Navbar />
            <HiddenChartsPanel />
            <ToggleDarkMode />
            <DrawingStoreProvider>
              <ExcalidrawProvider>
                <PageRenderer>{children}</PageRenderer>
                <FloatingExcalidrawButton />
              </ExcalidrawProvider>
            </DrawingStoreProvider>
          </>
        ) : (
          <>
            <ToggleDarkMode />
            <MaintenancePage backLink={backLink} />
          </>
        )}
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <PagesProvider pathname={pathname}>
        <BundleProvider pathname={pathname}>
          <DashboardProvider>
            <DashboardContent>{children}</DashboardContent>
          </DashboardProvider>
        </BundleProvider>
      </PagesProvider>
    </Suspense>
  );
}
