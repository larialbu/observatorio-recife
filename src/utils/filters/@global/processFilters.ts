export const processFilters = (data: any[], baseFilters: any) => {
    // Itera sobre os filtros e processa apenas aqueles que possuem "options" como vazio
    const processedFilters = {
      ...baseFilters,
      additionalFilters: baseFilters.additionalFilters.map((filter: any) => {
        if (filter.options.length > 0) return filter; // Ignora filtros que já possuem opções, para evitar as acumulações
  
        // Popula dinamicamente as opções baseadas nos dados
        const uniqueOptions = Array.from(
          new Set(data.map((item) => item[filter.label]?.toString()?.trim()))
        ).filter(Boolean); // Remove valores nulos ou indefinidos, mas o ideal seria a filtragem já ser feita diretamente no JSON
  
        return {
          ...filter,
          options: uniqueOptions, // Define as opções dinamicamente
        };
      }),
    };
  
    return processedFilters;
  };
  