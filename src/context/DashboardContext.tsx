"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation"; // Hook para obter a rota atual
import { defaultFilters } from "@/utils/filters/defaultFilters";
import { aeroportosFilters } from "@/utils/filters/aeroporto/anacFilters";
import { balancaComercialFilters } from "@/utils/filters/balancaComercialFilters";

interface DashboardContextProps {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  resetFilters: () => void; // Reseta os filtros com base na rota
}

// Mapeamento de rotas para filtros
const routeFiltersMap: Record<string, Record<string, any>> = {
  "/observatorio/aeroportos": aeroportosFilters,
  "/observatorio/bal-comercial": balancaComercialFilters,
};

const getFiltersForRoute = (pathname: string): Record<string, any> => {
  return routeFiltersMap[pathname] || defaultFilters; // Retorna os filtros da rota ou os padrões
};

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Record<string, any>>(defaultFilters);
  const pathname = usePathname(); // Obtém a rota atual

  // Atualiza os filtros ao mudar a rota
  useEffect(() => {
    setFilters(getFiltersForRoute(pathname));
  }, [pathname]);

  // Função para redefinir os filtros manualmente
  const resetFilters = () => {
    setFilters(getFiltersForRoute(pathname));
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
