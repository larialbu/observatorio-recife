"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation"; // Adicionado para buscar parâmetros da URL
import { defaultFilters } from "@/utils/filters/defaultFilters";
import { anacFilters } from "@/utils/filters/aeroporto/anacFilters";
import { aenaFilters } from "@/utils/filters/aeroporto/aenaFilters";
import { balancaComercialFilters } from "@/utils/filters/balancaComercialFilters";

interface DashboardContextProps {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  resetFilters: () => void; // Reseta os filtros com base na rota
}

// Mapeamento de rotas para filtros
const routeFiltersMap: Record<string, Record<string, any>> = {
  "/observatorio/aeroportos": anacFilters,
  "/observatorio/bal-comercial": balancaComercialFilters,
};

const getFiltersForRoute = (pathname: string, tab: string | null): Record<string, any> => {
  console.log(tab)
  if (pathname === "/observatorio/aeroportos" && tab === "aena") {
    return aenaFilters;
  }
  return routeFiltersMap[pathname] || defaultFilters;
};

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Record<string, any>>(defaultFilters);
  const pathname = usePathname(); // Obtém a rota atual
  const searchParams = useSearchParams(); // Obtém os parâmetros da URL

  // Atualiza os filtros ao mudar a rota ou o parâmetro "tab"
  useEffect(() => {
    const tab = searchParams.get("tab");
    const filtersForRoute = getFiltersForRoute(pathname, tab);
    setFilters(filtersForRoute);
  }, [pathname, searchParams]);
  

  // Função para redefinir os filtros manualmente
  const resetFilters = () => {
    const tab = searchParams.get("tab");
    setFilters(getFiltersForRoute(pathname, tab));
  };

  return (
    <DashboardContext.Provider value={{ filters, setFilters, resetFilters }}>
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
