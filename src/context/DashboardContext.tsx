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
  additionalFilters: { options: string[], label: string; selected: string[] }[];
}

interface Data {
  [key: string]: any;
}

interface HiddenChart {
  id: string;
  category: string;
  title: string;
  subText?: string;
  component: React.ReactNode;
  wrapperElement: HTMLElement | null;
  originalDisplay: string;
  thumbnailUrl: string;
}
interface DashboardContextProps {
  filters: Filters;
  data: Data | null;
  setData: any;
  isLoading: boolean;
  applyFilters: (newFilters: Filters) => Promise<void>;
  resetFilters: () => void;
  hiddenCharts: HiddenChart[];
  addHiddenChart: (chart: HiddenChart) => void;
  removeHiddenChart: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);


export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({} as any);
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hiddenCharts, setHiddenCharts] = useState<HiddenChart[]>([]);

  const prevFiltersRef = useRef<Filters | null>(null); // armazenar os filtros anteriores

  // Função para buscar os dados com base nos filtros
  const fetchData = async (filtersToUse: Filters) => {
    console.log("🔄 Chamando fetchData..."); // QUE LINDO
    setIsLoading(true);

    try {
      const tab = searchParams.get("tab") || 'geral';
      const service = getServiceForRoute(pathname, tab);

      if (!service) {
        console.warn("Nenhum serviço encontrado para essa rota/tab.");
        setData(null);
        return;
      }

      service.setYear(filtersToUse?.year || filtersToUse.years[filtersToUse.years.length - 1]);
      const fetched: Data = await service.fetchDataForTab(tab, filtersToUse);

      if (process.env.NODE_ENV === 'development') {
        console.log("✅ Dados carregados:", fetched);
      } // REMOVER ISSO AQUI DEPOIS

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
    const tab = searchParams.get("tab") || "geral"; // Pega o valor do parâmetro 'tab' ou define como 'geral'
    let baseFilters: any = getFiltersForRoute(pathname, tab);
  
    // Verifica se algum filtro adicional tem 'allowMultiple' como false e o 'label' não está na lista
    const hasAllowMultipleFalse = filters.additionalFilters?.some((f: any) =>
      f.allowMultiple === false && !["Mes", "Mês", "MES", "MÊS"].includes(f.label)
    );
  
    console.log("Has Allow Multiple False:", hasAllowMultipleFalse);
  
    // Se existirem filtros adicionais
    if (baseFilters.additionalFilters) {
      // Se não tiver filtros com allowMultiple = false
      if (hasAllowMultipleFalse) {
        baseFilters = {
          ...baseFilters,
          additionalFilters: baseFilters.additionalFilters, // Preserva os filtros
        };
      } else {
        // Se tiver filtros com allowMultiple = false, limpa as seleções
        baseFilters = {
          ...baseFilters,
          additionalFilters: baseFilters.additionalFilters.map((f: any) => ({
            ...f,
            selected: [], // Limpa as seleções
          })),
        };
      }
    }
  
    // Aplica os filtros modificados
    applyFilters(baseFilters);
  };
  

  // PARA GERENCIAR OS GRÁFICOS ESCONDIDOS

  const addHiddenChart = (chart: HiddenChart) => {
    setHiddenCharts(prev => [...prev, chart]);
  };

  const removeHiddenChart = (id: string) => {
    setHiddenCharts(prev => prev.filter(c => c.id !== id));
  };


  useEffect(() => {
    const tab = searchParams.get("tab");
    const baseFilters: any = getFiltersForRoute(pathname, tab);
    
    // Se os filtros não mudaram, não faz nada
    if (JSON.stringify(prevFiltersRef.current) === JSON.stringify(baseFilters)) {
      return;
    }
    setData(null);
    console.log("🔵 Filtros mudaram, chamando fetchData...");
    prevFiltersRef.current = baseFilters;
    setFilters(baseFilters);
    fetchData(baseFilters);
  }, [pathname, searchParams]);


  return (
    <DashboardContext.Provider value={{ 
      filters, 
      data, 
      isLoading, 
      applyFilters, 
      resetFilters, 
      setData,
      hiddenCharts,
      addHiddenChart,
      removeHiddenChart
    }}>
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
