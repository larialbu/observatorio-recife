"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { defaultFilters } from "@/utils/filters/defaultFilters";
import { anacFilters } from "@/utils/filters/aeroporto/anacFilters";
import { aenaFilters } from "@/utils/filters/aeroporto/aenaFilters";
import { aeroportoDataService } from "@/services/@data/aeroportoDataService";

/** Decide os filtros default de acordo com a rota/tab */
function getFiltersForRoute(pathname: string, tab: string | null): Record<string, any> {
  if (pathname.includes("/observatorio/aeroportos")) {
    return tab === "aena" ? aenaFilters : anacFilters;
  }
  return defaultFilters;
}

interface DashboardContextProps {
  filters: Record<string, any>;
  data: any;
  isLoading: boolean;
  applyFilters: (newFilters: Record<string, any>) => Promise<void>;
  resetFilters: () => void;
}

/** Cria o contexto */
const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** Estado global de filtros, data e isLoading */
  const [filters, setFilters] = useState<Record<string, any>>(defaultFilters);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  /** 
   * Faz o fetch usando o AeroportoDataService,
   * e se "passengers" ou "geral" retornar additionalFiltersOptions,
   * mesclamos sem perder `selected`.
   */
  const fetchData = async (filtersToUse: Record<string, any>) => {
    setIsLoading(true);
    try {
      // Ajusta o "ano" no serviço se precisar
      aeroportoDataService.setYear(filtersToUse.year || "2024");

      // Determina a aba (padrão: "aena")
      const tab = searchParams.get("tab") || "aena";

      // Faz a busca
      const fetched = await aeroportoDataService.fetchDataForTab(tab, filtersToUse);
      setData(fetched);

      // Se vierem additionalFiltersOptions, mesclar:
      const newAdditional =
        fetched?.passageiros?.additionalFiltersOptions ||
        fetched?.geral?.additionalFiltersOptions ||
        [];

      if (newAdditional.length) {
        setFilters((prev) => {
          // mesclar sem perder `selected`
          const merged = newAdditional.map((newF: any) => {
            const oldF = prev.additionalFilters?.find((o: any) => o.label === newF.label);
            if (!oldF) {
              // Se não existia, inicializa selected vazio ou do backend
              return { ...newF, selected: newF.selected || [] };
            }
            // Se já existia, preserva o que estava selecionado
            return {
              ...newF,
              selected: oldF.selected || [],
            };
          });
          return { ...prev, additionalFilters: merged };
        });
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Função que o Navbar (ou outros) chamam ao clicar em “Aplicar Filtros”.
   * Faz `setFilters(newFilters)` e chama fetch para refiltrar/recarregar.
   */
  const applyFilters = async (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    await fetchData(newFilters);
  };

  /**
   * Efeito: quando pathname ou searchParams mudarem (ex.: tab=?, rota),
   * pegamos o "filtro base" e fazemos fetch inicial.
   */
  useEffect(() => {
    const tab = searchParams.get("tab") || "aena";
    const baseFilters = getFiltersForRoute(pathname, tab);

    setFilters(baseFilters);
    fetchData(baseFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  /**
   * Reseta os filtros para o default da rota e refaz fetch
   */
  const resetFilters = () => {
    const tab = searchParams.get("tab") || "aena";
    const baseFilters = getFiltersForRoute(pathname, tab);
    applyFilters(baseFilters);
  };

  return (
    <DashboardContext.Provider
      value={{
        filters,
        data,
        isLoading,
        applyFilters,
        resetFilters,
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
