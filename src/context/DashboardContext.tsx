"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { defaultFilters } from "@/utils/filters/defaultFilters";
import { anacFilters } from "@/utils/filters/aeroporto/anacFilters";
import { aenaFilters } from "@/utils/filters/aeroporto/aenaFilters";
import { balancaComercialFilters } from "@/utils/filters/balancaComercialFilters";
import { processFilters } from "@/utils/filters/@global/processFilters";
import { aeroportoDataService } from "@/services/@data/aeroportoDataService";

interface DashboardContextProps {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  resetFilters: () => void;
  processAndSetFilters: (data: any, filterSet: any) => void;
  isLoading: boolean;
  data: any;
}

const getFiltersForRoute = (pathname: string, tab: string | null): Record<string, any> => {
  if (pathname === "/observatorio/aeroportos") {
    return tab === "aena" ? aenaFilters : anacFilters;
  }
  return pathname === "/observatorio/bal-comercial" ? balancaComercialFilters : defaultFilters;
};

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);


export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Record<string, any>>(defaultFilters);
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab") || "aena";
    const currentFilters = getFiltersForRoute(pathname, tab);

    setFilters((prevFilters) => ({
      ...currentFilters,
      ...prevFilters,
      year: prevFilters.year || currentFilters.year,
    }));
  }, [pathname, searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const tab = searchParams.get("tab") || "aena";

      if (data.some((item: any) => item.year === filters.year)) {
        console.log("Usando dados em cache para o ano:", filters.year);
        return;
      }

      setIsLoading(true);
      try {
        const fetchedData = await aeroportoDataService.fetchDataForTab(tab, filters.year || "2024");

        let processedData: any[] = [];
        if (fetchedData && fetchedData.length > 0 && typeof fetchedData[0] === "object") {
          const fetchedItem = fetchedData[0];

          if (Object.keys(fetchedItem).length > 1) {
            for (const key in fetchedItem) {
              const processedFilters = processFilters(fetchedItem[key], filters);
              processedData.push({
                key,
                data: fetchedItem[key],
                filters: processedFilters.additionalFilters,
              });
            }
          } else {
            const key = Object.keys(fetchedItem)[0];
            const processedFilters = processFilters(fetchedItem[key], filters);
            processedData = [
              {
                key,
                data: fetchedItem[key],
                filters: processedFilters.additionalFilters,
              },
            ];
            console.log(processedFilters)
          }
          
          setFilters((prevFilters) => ({
            ...prevFilters,
            additionalFilters: processedData[0]?.filters || [],
          }));
          setData(processedData);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (pathname.includes("/observatorio/aeroportos")) {
      fetchData();
    }
  }, [filters.year, pathname, searchParams]);

  const resetFilters = () => {
    const tab = searchParams.get("tab") || "aena";
    setFilters((prevFilters) => ({
      ...getFiltersForRoute(pathname, tab),
      year: prevFilters.year, // Preserva o ano ao redefinir os filtros
    }));
  };

  const processAndSetFilters = (data: any, filterSet: any) => {
    const dynamicFilters = processFilters(data, filterSet);
    setFilters((prevFilters) => ({
      ...prevFilters,
      additionalFilters: dynamicFilters.additionalFilters, // Adiciona novos filtros dinamicamente
    }));
  };

  return (
    <DashboardContext.Provider
      value={{
        filters,
        setFilters,
        resetFilters,
        processAndSetFilters,
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
