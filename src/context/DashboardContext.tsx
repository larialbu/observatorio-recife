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
import { pibGeralFilters, PibFilter } from "@/utils/filters/pib/pibGeralFilters"; // Importa os filtros e o tipo

// Interface para o contexto
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

  /**
   * Busca os dados com base no serviço correto.
   */
  const fetchData = async (filtersToUse: Record<string, any>) => {
    setIsLoading(true);
    try {
      const tab = searchParams.get("tab") || "geral";
      console.log("Tab atual:", tab);

      const service = getServiceForRoute(pathname, tab);
      if (!service) {
        console.warn("Nenhum serviço compatível com esta rota/tab.");
        setData(null);
        return;
      }

      const selectedYear =
        filtersToUse?.years?.[filtersToUse?.years.length - 1] || "2021";
      console.log("Ano selecionado:", selectedYear);

      const validYears = Array.from({ length: 2021 - 2010 + 1 }, (_, i) =>
        (2010 + i).toString()
      );
      if (!validYears.includes(selectedYear)) {
        throw new Error(
          `Ano inválido: ${selectedYear}. Os dados de PIB estão disponíveis apenas entre 2010 e 2021.`
        );
      }

      service.setYear(selectedYear);

      const fetchedData = await service.fetchDataForTab(tab, filtersToUse);
      setData(fetchedData);

      updateAdditionalFilters(fetchedData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Atualiza os filtros adicionais com base nos dados retornados.
   */
  const updateAdditionalFilters = (fetchedData: any) => {
    const newAdditionalFilters =
      fetchedData?.[Object.keys(fetchedData)[0]]?.additionalFiltersOptions || [];
    if (newAdditionalFilters.length) {
      setFilters((prev) => ({
        ...prev,
        additionalFilters: mergeAdditionalFilters(
          prev.additionalFilters ?? [],
          newAdditionalFilters
        ),
      }));
    }
  };

  /**
   * Mescla os filtros adicionais antigos com os novos.
   */
  const mergeAdditionalFilters = (oldFilters: any[], newFilters: any[]) => {
    return newFilters.map((newF) => {
      const oldF = oldFilters?.find((o) => o.label === newF.label);
      return {
        ...newF,
        selected: oldF?.selected || [],
      };
    });
  };

  /**
   * Aplica novos filtros.
   */
  const applyFilters = async (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    await fetchData(newFilters);
  };

  /**
   * Limpa os filtros e busca os dados novamente.
   */
  const resetFilters = () => {
    const tab = searchParams.get("tab");
    let baseFilters = getFiltersForRoute(pathname, tab);

    // Substitui os filtros padrão para PIB
    if (pathname === "/observatorio/pib") {
      baseFilters = {
        ...pibGeralFilters, // Usa os filtros específicos do PIB
        additionalFilters: pibGeralFilters.additionalFilters?.map((f) => ({
          ...f,
          selected: [],
        })) ?? [], // Garante que additionalFilters seja um array vazio se for undefined
      };
    }

    applyFilters(baseFilters);
  };

  /**
   * Efeito para carregar dados ao mudar de rota ou aba.
   */
  useEffect(() => {
    const tab = searchParams.get("tab");
    let baseFilters = getFiltersForRoute(pathname, tab);

    // Substitui os filtros padrão para PIB
    if (pathname === "/observatorio/pib") {
      baseFilters = {
        ...pibGeralFilters, // Usa os filtros específicos do PIB
        additionalFilters: pibGeralFilters.additionalFilters?.map((f) => ({
          ...f,
          selected: [],
        })) ?? [], // Garante que additionalFilters seja um array vazio se for undefined
      };
    }

    console.log("Filtros iniciais:", baseFilters);
    setFilters(baseFilters);
    fetchData(baseFilters);
  }, [pathname, searchParams]);

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