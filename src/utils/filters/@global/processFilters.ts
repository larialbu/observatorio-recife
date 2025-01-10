export const processFilters = (data: any[], baseFilters: any) => {
  // Processa apenas filtros com opções vazias
  const processedFilters = {
    ...baseFilters,
    additionalFilters: baseFilters.additionalFilters.map((filter: any) => {
      if (filter.options.length > 0) return filter; // Ignora se já possui opções

      // Popula dinamicamente as opções usando Map para melhor performance
      const uniqueOptionsSet = new Map();
      data.forEach((item) => {
        const value = item[filter.label]?.toString()?.trim();
        if (value) uniqueOptionsSet.set(value, true); // Garante unicidade
      });

      return {
        ...filter,
        options: Array.from(uniqueOptionsSet.keys()), // Converte de Map para Array
      };
    }),
  };

  console.log('filtros que foram procesados:', processedFilters)
  return processedFilters;
};
