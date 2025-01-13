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
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab") || "aena";
    const currentFilters = getFiltersForRoute(pathname, tab);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await aeroportoDataService.fetchDataForTab(tab);
        console.log('dados fetchados',fetchedData[0]);

        let processedData = [];

        // Verifica se fetchedData tem mais de uma chave
        console.log('mae')

        if (Object.keys(fetchedData[0]).length > 1) {
          console.log('tem')
          // Processa para cada chave
          for (const key in fetchedData[0]) {
            const processedFilters = processFilters(fetchedData[0][key], currentFilters);
            processedData.push({
              key: key,
              data: fetchedData[0][key],
              filters: processedFilters.additionalFilters
            });
          }
        } else {
          // Se houver apenas uma chave, processa o primeiro item
          console.log('data processado:', fetchedData[0]);
          
          // Acessando o primeiro valor de fetchedData
          const key = Object.keys(fetchedData[0])[0]; // Pega a primeira chave
          console.log(fetchedData[0][key])
          const processedFilters = processFilters(fetchedData[0][key], currentFilters);

          console.log('filtros processados:',processedFilters)
          
          processedData = [{
            key: key, // usa a chave para identificar
            data: fetchedData[0][key], // pega o valor da primeira chave
            filters: processedFilters.additionalFilters
          }];
        }

        setFilters({
          ...currentFilters,
          additionalFilters: processedData[0].filters, // Ajuste conforme necessário
        });
        setData(processedData); // Atualiza o estado com os dados processados
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
  }, [pathname, searchParams]);


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
  };

  return (
    <DashboardContext.Provider
      value={{ filters, setFilters, resetFilters, processAndSetFilters, isLoading, data }}
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