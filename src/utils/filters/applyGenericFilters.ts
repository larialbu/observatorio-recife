export const applyGenericFilters = (data: any[], filters: Record<string, any>) => {
  console.log("Dados antes da filtragem:", data);
  console.log("Filtros aplicados:", filters);

  const yearFilter = filters.year || "2024"; // Define o filtro de ano
  console.log("Ano utilizado para filtragem:", yearFilter);

  // Calcula opções únicas para filtros adicionais
  const additionalFiltersOptions = filters.additionalFilters?.map((filter: any) => {
    const uniqueOptions = [...new Set(data.map((item) => item[filter.label]))];
    return { ...filter, options: uniqueOptions };
  }) || [];

  const filteredData = data.filter((item) => {
    return Object.keys(filters).every((key) => {
      const filterValue = filters[key];

      // Ignore filtros vazios
      if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) {
        return true;
      }

      // Verifica o filtro por ano
      if (key === "year") {
        return item["ANO"] === yearFilter || item["Ano"] === yearFilter; // Ajuste o campo conforme os dados
      }

      // Filtros adicionais
      if (key === "additionalFilters") {
        return filters.additionalFilters.every((filter: any) => {
          if (!filter.selected || filter.selected.length === 0) return true;
          return filter.selected.includes(item[filter.label]);
        });
      }

      // Verificação genérica
      console.log(item[key])
      return item["ANO"] === yearFilter || item["Ano"] === yearFilter;
    });
  });

  console.log("Dados filtrados retornados:", filteredData);

  return { filteredData, additionalFiltersOptions };
};
