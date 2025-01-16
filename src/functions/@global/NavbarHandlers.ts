import { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";

export const useNavbarHandlers = () => {
  const [dropdowns, setDropdowns] = useState<Record<string, boolean>>({});
  const [tempFilters, setTempFilters] = useState<any>(null);
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const { filters, setFilters, processAndSetFilters, data } = useDashboard();

  const toggleDropdown = (filterLabel: string) => {
    setDropdowns((prev) => {
      const newDropdowns = { ...prev };

      Object.keys(newDropdowns).forEach((key) => {
        if (key !== filterLabel) {
          newDropdowns[key] = false;
        }
      });

      newDropdowns[filterLabel] = !newDropdowns[filterLabel];
      
      return newDropdowns;
    });
  };



  const handleTimePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTempFilters((prev: any) => ({ ...prev, year: event.target.value || "2023" }));
  };

  const handleCheckboxChange = (filterLabel: string, value: string) => {
    setTempFilters((prev: any) => ({
      ...prev,
      additionalFilters: prev.additionalFilters.map((filter: any) =>
        filter.label === filterLabel
          ? {
              ...filter,
              selected: filter.selected.includes(value)
                ? filter.selected.filter((item: string) => item !== value)
                : [...filter.selected, value],
            }
          : filter
      ),
    }));
  };

  const handleSelectAll = (filterLabel: string) => {
    setTempFilters((prev: any) => ({
      ...prev,
      additionalFilters: prev.additionalFilters.map((filter: any) =>
        filter.label === filterLabel
          ? {
              ...filter,
              selected:
                filter.selected.length === filter.options.length ? [] : [...filter.options],
            }
          : filter
      ),
    }));
  };

  const applyFilters = () => {
  if (data && tempFilters) {
    console.log("Aplicando filtros:", tempFilters);


    // Atualiza o estado de filtros com o novo filtro de ano
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      year: tempFilters.year,
      additionalFilters: tempFilters.additionalFilters || prevFilters.additionalFilters,
    }));

    // Processa os filtros dinâmicos
    processAndSetFilters(data, tempFilters);
  } else {
    console.error("Data ou tempFilters está indefinido:", { data, tempFilters });
  }
};



  const handleSearchChange = (filterLabel: string, value: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [filterLabel]: value,
    }));
  };

  const clearFilters = () => {
    const clearedFilters = {
      ...filters,
      year: filters.years[filters.years.length - 1] || "2024",
      additionalFilters: filters.additionalFilters.map((filter: any) => ({
        ...filter,
        selected: [],
      })),
    };
  
    setFilters(clearedFilters);
    setTempFilters(clearedFilters);
  };
  

  return {
    dropdowns,
    tempFilters,
    searchTerms,
    toggleDropdown,
    handleTimePeriodChange,
    handleCheckboxChange,
    handleSelectAll,
    applyFilters,
    handleSearchChange,
    setTempFilters,
    setDropdowns,
    clearFilters
  };
};
