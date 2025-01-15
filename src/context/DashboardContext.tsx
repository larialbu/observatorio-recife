"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { defaultFilters } from "@/utils/filters/defaultFilters";
import { anacFilters } from "@/utils/filters/aeroporto/anacFilters";
import { applyGenericFilters } from "@/utils/filters/applyGenericFilters";
import { aeroportoDataService } from "@/services/@data/aeroportoDataService";

interface DashboardContextProps {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  resetFilters: () => void;
  processAndSetFilters: (data: any, filterSet: any) => void;
  isLoading: boolean;
  data: any;
  filteredData: any; // Adicionado
  setFilteredData: (data: any) => void; // Adicionado
}

const getFiltersForRoute = (pathname: string, tab: string | null): Record<string, any> => {
  if (pathname === "/observatorio/aeroportos") {
    return anacFilters; // Altere conforme necessário para filtros específicos
  }
  return defaultFilters;
};

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Record<string, any>>(defaultFilters);
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]); // Adicionado
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    const currentFilters = getFiltersForRoute(pathname, tab);

    setFilters((prevFilters) => ({
      ...currentFilters,
      ...prevFilters,
      year: prevFilters.year || currentFilters.year,
    }));
  }, [pathname, searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const tab = searchParams.get("tab") || "geral";
      setIsLoading(true);
  
      try {
        const { rawData, filteredData } = await aeroportoDataService.fetchDataForTab(
          tab,
          filters.year || "2024",
          filters
        );
  
        if (!rawData || rawData.length === 0) {
          console.warn("Dados brutos estão vazios:", rawData);
          return;
        }
  
        console.log("Filtros:", filters);
        console.log("Dados brutos:", rawData);
        console.log("Dados filtrados:", filteredData);
  
        setData(rawData);
        setFilteredData(filteredData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [filters, searchParams]);
  
  
  const resetFilters = () => {
    const tab = searchParams.get("tab");
    setFilters((prevFilters) => ({
      ...getFiltersForRoute(pathname, tab),
      year: prevFilters.year, // Preserva o ano ao redefinir os filtros
    }));
  };

  const processAndSetFilters = (data: any, filterSet: any) => {
    console.log(filterSet)
    const filtered: any = applyGenericFilters(data, filterSet);
    setFilters((prevFilters) => ({
      ...prevFilters,
      additionalFilters: filtered?.additionalFilters || [], // Use fallback vazio
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
      filteredData, // Expondo dados filtrados
      setFilteredData, // Expondo função para atualizar dados filtrados
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
