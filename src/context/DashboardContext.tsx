"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface DashboardContextProps {
  filters: Record<string, any>; // Para armazenar os filtros
  setFilters: (filters: Record<string, any>) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Record<string, any>>({
    year: "2023", // Ano padrão inicial
    additionalFilters: [], // Filtros adicionais
  });

  return (
    <DashboardContext.Provider value={{ filters, setFilters }}>
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
