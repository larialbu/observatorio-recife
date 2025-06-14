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

import { HiddenChart, DashboardContextProps, DashboardData  } from "@/@types/observatorio/context";
import { Filters, AdditionalFilter } from "@/@types/observatorio/shared";

const DashboardContext = createContext<DashboardContextProps<unknown> | undefined>(undefined);



export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({} as Filters);
  const [data, setData] = useState<DashboardData | null>(null);
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

      const year = filtersToUse?.year ?? filtersToUse?.years?.[filtersToUse.years.length - 1];

      if (year) {
        service.setYear(year);
      }

      const fetched: any = await service.fetchDataForTab(tab, filtersToUse); // Aqui era DashboardData tipado

      if (process.env.NODE_ENV === 'development') {
        console.log("✅ Dados carregados:", fetched);
      } // REMOVER ISSO AQUI DEPOIS

      setData(fetched);

      // Atualiza os filtros apenas se additionalFiltersOptions existirem
      // antigo feio bosta
      // const newAdditional = fetched?.[Object.keys(fetched)[0]]?.additionalFiltersOptions || [];
      
      const newAdditional: AdditionalFilter[] = Object.values(Object.keys(fetched).filter((key) => key != 'id').map((key) => {
        if (fetched?.[key]?.additionalFiltersOptions) {
         return fetched[key].additionalFiltersOptions
        } else {
         return Object.keys(fetched[key]).map((keyInter) => fetched[key][keyInter].additionalFiltersOptions)
        }
       }).flat(Infinity).filter((val) => val != undefined).reduce((acc, curr) => {
        const { label, ...rest } = curr;
    
        if (!acc[label]) {
          acc[label] = { label };
        }
    
        for (const key in rest) {
          const value = rest[key];
    
          if (Array.isArray(value)) {
            if (!Array.isArray(acc[label][key])) {
              acc[label][key] = [];
            }
    
            acc[label][key].push(...value);
            acc[label][key] = [...new Set(acc[label][key])]; // remover duplicatas
          } else {
            // Se não for array, só atribui se ainda não tiver sido atribuído
            if (!(key in acc[label])) {
              acc[label][key] = value;
            }
          }
        }
    
        return acc;
      }, {}))

      if (newAdditional.length) {
        setFilters((prev) => {
          // ao invés de fazer uma comparação com base nos additionalfiltes, vmaos colocar um campo chamado id ou key e a partir disso fazer a comparação, se for diferente fazemos um novo fetch
          const merged = newAdditional.map((newF: AdditionalFilter) => {
            const oldF = prev.additionalFilters?.find(
              (o: AdditionalFilter) => o.label === newF.label
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
    let baseFilters = getFiltersForRoute(pathname, tab) as Filters;
  
    const hasAllowMultipleFalse = filters.additionalFilters?.some((f: AdditionalFilter) =>
      f.allowMultiple === false && !["Mes", "Mês", "MES", "MÊS"].includes(f.label)
    );
  
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
          additionalFilters: baseFilters.additionalFilters.map((f: AdditionalFilter) => ({
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
    const baseFilters = getFiltersForRoute(pathname, tab) as Filters;
    
    // Se os filtros não mudaram, não faz nada
    // ao invés de fazer uma comparação com base nos additionalfiltes, vmaos colocar um campo chamado id ou key e a partir disso fazer a comparação, se for diferente fazemos um novo fetch
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
