// import { ProcessedData } from "@/@types/observatorio/@fetch/balanca-comercial/processedData";

export const balancaComercialDataFilter = (data: any[], filters: any) => {
    if (!filters) return data;
  
    return data.filter((item: any) => {
      // Filtro de ano
      if (filters.year && item["Ano"]?.toString() !== filters.year) {
        return false;
      }
  
      // Filtro de mês
      if (filters.month && item["Mês"]?.toString() !== filters.month) {
        return false;
      }
  
      // Aplica os filtros adicionais
      if (filters.additionalFilters) {
        return filters.additionalFilters.every((filter: any) => {
          if (!filter.selected || filter.selected.length === 0) return true;
          const itemValue = item[filter.label]?.toString()?.toUpperCase() || "";
          const selectedValues = filter.selected.map((val: string) => val.toUpperCase());
  
          return selectedValues.includes(itemValue);
        });
      }
  
      return true;
    });
  };
  