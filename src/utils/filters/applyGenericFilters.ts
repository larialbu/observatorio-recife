export const applyGenericFilters = (data: any[], filters: Record<string, any>) => {
  console.log("Dados antes da filtragem:", data);
  console.log("Filtros aplicados:", filters);

  const yearFilter = filters.year || "2024";
  console.log("Ano utilizado para filtragem:", yearFilter);

  const filteredData = data.filter((item) => {
    // Filtra por ano
    if (item["ANO"] !== yearFilter && item["Ano"] !== yearFilter) {
      return false;
    }

    // Se houver additionalFilters
    if (filters.additionalFilters) {
      for (const f of filters.additionalFilters) {
        // Se não tem selected ou está vazio, ignora
        if (!f.selected || f.selected.length === 0) continue;
        // item[f.label] => ex.: item["MÊS"], item["AEROPORTO NOME"], etc.
        const val = item[f.label];
        // Se val não está em f.selected, rejeita
        if (!f.selected.includes(val)) {
          return false;
        }
      }
    }

    return true;
  });

  // Calcula options se quiser
  const additionalFiltersOptions =
    filters.additionalFilters?.map((f) => {
      const uniqueOptions = Array.from(new Set(filteredData.map((item) => item[f.label]))).filter(
        (v) => v != null
      );
      return { ...f, options: uniqueOptions };
    }) || [];

  console.log("Dados filtrados retornados:", filteredData);

  return { filteredData, additionalFiltersOptions };
};
