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
  const [filteredData, setFilteredData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab") || "aena";
    const currentFilters = getFiltersForRoute(pathname, tab);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Passa o ano atual dos filtros para o serviço
        console.log('filtros agora:',currentFilters)
        console.log('ano atual:', data)
        const fetchedData = await aeroportoDataService.fetchDataForTab(
          tab, 
          filters.year || "2024"
        );
        let processedData: any[] = [];

        if (fetchedData && fetchedData.length > 0 && typeof fetchedData[0] === "object") {
          const fetchedItem = fetchedData[0];

          if (Object.keys(fetchedItem).length > 1) {
            // Processa cada chave quando há várias
            for (const key in fetchedItem) {
              const processedFilters = processFilters(fetchedItem[key], currentFilters);
              processedData.push({
                key,
                data: fetchedItem[key],
                filters: processedFilters.additionalFilters,
              });
            }
          } else {
            // Processa quando há apenas uma chave
            const key = Object.keys(fetchedItem)[0];
            const processedFilters = processFilters(fetchedItem[key], currentFilters);
            processedData = [
              {
                key,
                data: fetchedItem[key],
                filters: processedFilters.additionalFilters,
              },
            ];
          }

          // Atualiza o estado global de filtros e dados
          setFilters({
            ...currentFilters,
            additionalFilters: processedData[0]?.filters || [],
          });
          setData(processedData);
        } else {
          console.error("Formato inesperado de fetchedData:", fetchedData);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (pathname.includes("/observatorio/aeroportos")) {
      fetchData();
    } else {
      setFilters(currentFilters);
    }
  }, [pathname, searchParams, filters.year]);

  const resetFilters = () => {
    const tab = searchParams.get("tab");
    setFilters(getFiltersForRoute(pathname, tab));
  };

  const processAndSetFilters = (data: any, filterSet: any) => {
    const dynamicFilters = processFilters(data, filterSet);
    setFilters((prevFilters) => ({
      ...prevFilters,
      additionalFilters: dynamicFilters.additionalFilters,
    }));
    console.log('filtros dinamicos:',dynamicFilters)
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
