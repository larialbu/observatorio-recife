"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface DashboardContextProps {
  year: string;
  setYear: (year: string) => void;
  availableYears: string[];
  setAvailableYears: (years: string[]) => void;
  municipality: string;
  setMunicipality: (val: string) => void;
  municipalityAvaible: string[];
  setMunicipalityAvaible: (years: string[]) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [year, setYear] = useState("2024"); // ano padrão inicial
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [municipality, setMunicipality] = useState<string>("");
  const [municipalityAvaible, setMunicipalityAvaible] = useState<string[]>([]);

  return (
    <DashboardContext.Provider
      value={{
        year,
        setYear,
        availableYears,
        setAvailableYears,
        municipality,
        setMunicipality,
        municipalityAvaible,
        setMunicipalityAvaible,
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
