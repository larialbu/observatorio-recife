"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getFiltersForRoute } from "@/utils/filters/@features/getFiltersForRoute";
import { getServiceForRoute } from "@/utils/filters/@features/getServiceForRoute";

interface Filters {
  [key: string]: any;
  additionalFilters?: { label: string; selected: string[] }[];
}

interface Data {
  [key: string]: any;
}

interface DashboardContextProps {
  filters: Filters;
  data: Data | null;
  isLoading: boolean;
  applyFilters: (newFilters: Filters) => Promise<void>;
  resetFilters: () => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({});
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const prevFiltersRef = useRef<Filters | null>(null); // armazenar os filtros anteriores

  // Função para buscar os dados com base nos filtros
  const fetchData = async (filtersToUse: Filters) => {
    console.log("🔄 Chamando fetchData..."); // QUE LINDO
    setIsLoading(true);

    try {
      const tab = searchParams.get("tab") || "geral";
      const service = getServiceForRoute(pathname, tab);

      if (!service) {
        console.warn("Nenhum serviço encontrado para essa rota/tab.");
        setData(null);
        return;
      }

      service.setYear(filtersToUse?.year || "2024");
      const fetched: Data = await service.fetchDataForTab(tab, filtersToUse);

      console.log("✅ Dados carregados:", fetched); // REMOVER ISSO AQUI DEPOIS

      setData(fetched);

      // Atualiza os filtros apenas se additionalFiltersOptions existirem
      const newAdditional = fetched?.[Object.keys(fetched)[0]]?.additionalFiltersOptions || [];
      if (newAdditional.length) {
        setFilters((prev) => {
          const merged = newAdditional.map((newF: any) => {
            const oldF = prev.additionalFilters?.find(
              (o: any) => o.label === newF.label
            );
            if (!oldF) {
              return { ...newF, selected: newF.selected || [] };
            }
            // substitui options, mas preserva oldF.selected
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
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = async (newFilters: Filters) => {
    if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
      setFilters(newFilters);
      await fetchData(newFilters);
    }
  };

  const resetFilters = () => {
    const tab = searchParams.get("tab");
    let baseFilters = getFiltersForRoute(pathname, tab);

    if (baseFilters.additionalFilters) {
      baseFilters = {
        ...baseFilters,
        additionalFilters: baseFilters.additionalFilters.map((f: Object) => ({ ...f, selected: [] })),
      };
    }
    applyFilters(baseFilters);
  };

  useEffect(() => {
    const tab = searchParams.get("tab");
    const baseFilters = getFiltersForRoute(pathname, tab);
  
    if (
      JSON.stringify(prevFiltersRef.current) === JSON.stringify(baseFilters) ||
      data !== null
    ) {
      console.log("🟡 Nenhuma mudança nos filtros ou dados já carregados, pulando fetchData.");
      return;
    }
  
    console.log("🔵 Filtros mudaram ou dados não carregados, chamando fetchData...");
    prevFiltersRef.current = baseFilters;
    setFilters(baseFilters);
    fetchData(baseFilters);
  }, [pathname, searchParams, data]);
  

  return (
    <DashboardContext.Provider value={{ filters, data, isLoading, applyFilters, resetFilters }}>
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
