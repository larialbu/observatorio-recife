"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
import { getPagination } from "@/@api/cache/bundleDecompress";
import { AppConfig } from "@/@types/observatorio/pageConfig";

async function getPageStatus(
  pathname: string,
  searchParams: URLSearchParams
): Promise<boolean> {
  const cleanPathname = pathname.split("?")[0];
  const pages = ((await getPagination()) as AppConfig).observatorio;

  const pageKey = Object.keys(pages).find(
    (key) => pages[key].path === cleanPathname
  );
  if (!pageKey) return true;

  const page = pages[pageKey];
  if (!page.status) return false;

  const tabName = searchParams.get("tab");
  if (page.tabs && tabName) {
    const tab = page.tabs.find((t) => t.label === tabName);
    return tab ? tab.status : true;
  }
  return page.status;
}

async function getSafeReturnPath(pathname: string): Promise<string> {
  const cleanPathname = pathname.split("?")[0];
  const pages = ((await getPagination()) as AppConfig).observatorio;

  const pageKey = Object.keys(pages).find(
    (key) => pages[key].path === cleanPathname
  );
  if (pageKey) {
    const page = pages[pageKey];
    if (page.tabs && page.tabs.length > 0) {
      const firstActiveTab = page.tabs.find((t) => t.status);
      const fallbackTab = page.tabs[0];
      return `${page.path}?tab=${(firstActiveTab || fallbackTab).label}`;
    }
    return page.path;
  }
  return "/";
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPageActive, setIsPageActive] = useState<boolean | null>(null);
  const [backLink, setBackLink] = useState<string>("");

  const fullPath = `${pathname}?${searchParams}`;
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    previousPathRef.current = fullPath;
  }, [fullPath]);

  useEffect(() => {
    (async () => {
      const status = await getPageStatus(pathname, searchParams);
      const safeBackLink =
        previousPathRef.current || (await getSafeReturnPath(pathname));
      setIsPageActive(status);
      setBackLink(safeBackLink);
    })();
  }, [pathname, searchParams]);

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
      <BundleProvider pathname={pathname}>
        <DashboardProvider>
          <DashboardContent>{children}</DashboardContent>
        </DashboardProvider>
      </BundleProvider>
    </Suspense>
  );
}
