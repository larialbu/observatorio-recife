"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getFiltersForRoute } from "@/utils/filters/@features/getFiltersForRoute";
import { getServiceForRoute } from "@/utils/filters/@features/getServiceForRoute";

// Tipagem para os filtros e dados
interface Filters {
  [key: string]: any;
  additionalFilters?: { label: string; selected: string[] }[];
}

interface Data {
  [key: string]: any;
}

// Interface para tipar o contexto do Dashboard
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

  // Busca os dados corretos com base na rota e filtros
  const fetchData = async (filtersToUse: Filters) => {
    setIsLoading(true);
    try {
      const tab = searchParams.get("tab") || "geral"; // Define tab padrão
      console.log("tab no context", tab);

      console.log("path e tab no context", pathname, tab);
      const service = getServiceForRoute(pathname, tab); // Obtém o service correto
      console.log("service no context", service);
      
      if (!service) {
        console.warn("Nenhum serviço encontrado para essa rota/tab.");
        setData(null);
        return;
      }

      // Define o ano no service, se suportado
      service.setYear(filtersToUse?.year || "2024");

      // Chama o serviço para buscar os dados
      const fetched: Data = await service.fetchDataForTab(tab, filtersToUse);
      setData(fetched);

      // Mescla os additionalFiltersOptions se existirem
      const newAdditional = fetched?.[Object.keys(fetched)[0]]?.additionalFiltersOptions || [];

      if (newAdditional.length) {
        setFilters((prev) => {
          const merged = newAdditional.map((newF: any) => {
            const oldF = prev.additionalFilters?.find((o) => o.label === newF.label);
            return oldF ? { ...newF, selected: oldF.selected || [] } : { ...newF, selected: newF.selected || [] };
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

  // Aplica novos filtros e recarrega os dados
  const applyFilters = async (newFilters: Filters) => {
    setFilters(newFilters);
    await fetchData(newFilters);
  };

  // Monitora mudanças na rota/tab e aplica filtros padrão
  useEffect(() => {
    const tab = searchParams.get("tab");
    const baseFilters = getFiltersForRoute(pathname, tab);
    setFilters(baseFilters);
    fetchData(baseFilters);
  }, [pathname, searchParams]);

  // Reseta os filtros (zera os selected e recarrega dados)
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
