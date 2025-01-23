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
// ^ Nova função análoga a getFiltersForRoute, mas que retorna o "service" certo

interface DashboardContextProps {
  filters: Record<string, any>;
  data: any;
  isLoading: boolean;
  applyFilters: (newFilters: Record<string, any>) => Promise<void>;
  resetFilters: () => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Record<string, any>>({});
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Pega o service correto (aeroportoDataService / balancaDataService / etc.)
  const fetchData = async (filtersToUse: Record<string, any>) => {
    setIsLoading(true);
    try {
      // Descobrimos a tab (ou definimos "geral" por padrão)
      const tab = searchParams.get("tab") || "geral";
      console.log("tab no context", tab);

      console.log("path e tab no context", pathname, tab);
      // Aqui a mágica: pegamos o service certo
      const service = getServiceForRoute(pathname, tab);
      console.log("service no context", service);
      if (!service) {
        console.warn(
          "Nenhum serviço compatível com esta rota/tab. Definindo data = null."
        );
        setData(null);
        return;
      }

      // Ajustar ano no service (se for implementado)
      service.setYear(filtersToUse.year || "2024");

      // Chama fetch
      const fetched = await service.fetchDataForTab(tab, filtersToUse);
      setData(fetched);

      // Se vier additionalFiltersOptions (geral, passageiros...), mesclar
      console.log(fetched);
      const newAdditional =
        fetched?.passageiros?.additionalFiltersOptions ||
        fetched?.geral?.additionalFiltersOptions ||
        fetched?.grupos?.additionalFiltersOptions ||
        fetched?.tabelas?.additionalFiltersOptions ||
        [];

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

  // Ao aplicar novos filtros
  const applyFilters = async (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    await fetchData(newFilters);
  };

  // Ao mudar rota ou tab => pega filtros default e chama fetch
  useEffect(() => {
    const tab = searchParams.get("tab");
    const baseFilters = getFiltersForRoute(pathname, tab);

    setFilters(baseFilters);
    fetchData(baseFilters);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Limpa filtros => zera "selected" e reapply
  const resetFilters = () => {
    const tab = searchParams.get("tab");
    let baseFilters = getFiltersForRoute(pathname, tab);

    if (baseFilters.additionalFilters) {
      baseFilters = {
        ...baseFilters,
        additionalFilters: baseFilters.additionalFilters.map((f: any) => ({
          ...f,
          selected: [],
        })),
      };
    }
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
    throw new Error(
      "useDashboard deve ser usado dentro de um DashboardProvider"
    );
  }
  return context;
};
