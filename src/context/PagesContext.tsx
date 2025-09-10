import { getPagination } from "@/@api/cache/bundleDecompress";
import { AppConfig } from "@/@types/observatorio/pageConfig";
import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

type PagesContextType = {
    isPageActive: boolean | null;
    backLink: string;
    handlePageStatus: () => Promise<void>;
}

export const PagesContext = createContext<PagesContextType | undefined >(undefined)

export const PagesProvider = ({ children, pathname }: { children: ReactNode, pathname: string }) => {
    const searchParams = useSearchParams();
    const [isPageActive, setIsPageActive] = useState<boolean | null>(null);
    const [backLink, setBackLink] = useState<string>("");

    const fullPath = `${pathname}?${searchParams}`;
    const previousPathRef = useRef<string | null>(null);
    
    useEffect(() => {
        previousPathRef.current = fullPath;
    }, [fullPath]);


    async function getPageStatus(
      pathname: string,
      searchParams: URLSearchParams
    ): Promise<boolean> {
      const cleanPathname = pathname.split("?")[0];
      const pages = ((await getPagination()) as AppConfig)?.observatorio || {};
    
      console.log('PAGES CONFIG:', pages)
    
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
 
    const handlePageStatus = async () => {
        const status = await getPageStatus(pathname, searchParams);
        const safeBackLink =
        previousPathRef.current || (await getSafeReturnPath(pathname));
        setIsPageActive(status);
        setBackLink(safeBackLink);
    }
    
      useEffect(() => {
        (async () => {
            await handlePageStatus();
        })();
      }, [pathname, searchParams]);
    

    return (
    <PagesContext.Provider value={{ isPageActive, backLink, handlePageStatus }}>
        {children}
    </PagesContext.Provider>)
}

export const usePages = () => {
    const context = useContext(PagesContext);
    if (!context) {
        throw new Error("usePages deve ser usado dentro de um PagesProvider");
    }
    return context
}