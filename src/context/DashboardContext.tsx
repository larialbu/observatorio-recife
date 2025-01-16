"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { defaultFilters } from "@/utils/filters/defaultFilters";
import { anacFilters } from "@/utils/filters/aeroporto/anacFilters";
import { aenaFilters } from "@/utils/filters/aeroporto/aenaFilters";
import { aeroportoDataService } from "@/services/@data/aeroportoDataService";

interface DashboardContextProps {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  resetFilters: () => void;
  isLoading: boolean;
  data: any;
}

const getFiltersForRoute = (pathname: string, tab: string | null): Record<string, any> => {
  if (pathname.includes("/observatorio/aeroportos")) {
    return tab === "aena" ? aenaFilters : anacFilters;
  }
  return defaultFilters;
};

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Record<string, any>>(defaultFilters);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab") || "aena";
    const currentFilters = getFiltersForRoute(pathname, tab);
  
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log('eaw')
        const fetchedData = await aeroportoDataService.fetchDataForTab(tab, currentFilters);
        setData(fetchedData);
  
        const additionalFilters =
          fetchedData.passageiros?.additionalFiltersOptions ||
          fetchedData.geral?.additionalFiltersOptions ||
          [];
        setFilters({
          ...currentFilters,
          additionalFilters,
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [pathname, searchParams]);


  const resetFilters = () => {
    const tab = searchParams.get("tab");
    setFilters(getFiltersForRoute(pathname, tab));
  };

  return (
    <DashboardContext.Provider
      value={{
        filters,
        setFilters,
        resetFilters,
        isLoading,
        data,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard deve ser usado dentro de um DashboardProvider");
  }
  return context;
};
