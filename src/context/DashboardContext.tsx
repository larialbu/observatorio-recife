"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { defaultFilters } from "@/utils/filters/defaultFilters";
import { anacFilters } from "@/utils/filters/aeroporto/anacFilters";
import { aenaFilters } from "@/utils/filters/aeroporto/aenaFilters";
import { balancaComercialFilters } from "@/utils/filters/balancaComercialFilters";
import { processFilters } from "@/utils/filters/@global/processFilters";

interface DashboardContextProps {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  resetFilters: () => void; 
  processAndSetFilters: (data: any, filterSet: any) => void; // Novo método para processar filtros
}

// Mapeamento de rotas para filtros
const routeFiltersMap: Record<string, Record<string, any>> = {
  "/observatorio/aeroportos": anacFilters,
  "/observatorio/bal-comercial": balancaComercialFilters,
};

const getFiltersForRoute = (pathname: string, tab: string | null): Record<string, any> => {
  if (pathname === "/observatorio/aeroportos" && tab === "aena") {
    return aenaFilters;
  }
  return routeFiltersMap[pathname] || defaultFilters;
};

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Record<string, any>>(defaultFilters);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    const filtersForRoute = getFiltersForRoute(pathname, tab);
    setFilters(filtersForRoute);
  }, [pathname, searchParams]);

  const resetFilters = () => {
    const tab = searchParams.get("tab");
    setFilters(getFiltersForRoute(pathname, tab));
  };

  const processAndSetFilters = (data: any, filterSet: any) => {
    const dynamicFilters = processFilters(data, filterSet);
    console.log(dynamicFilters)
    setFilters((prevFilters) => ({
      ...prevFilters,
      additionalFilters: dynamicFilters.additionalFilters,
    }));
  };

  return (
    <DashboardContext.Provider
      value={{ filters, setFilters, resetFilters, processAndSetFilters }}
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
