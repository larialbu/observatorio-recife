export const aeroportoDataFilter = (data: any[], filters: any) => {
  if (!filters) return data;

  return data.filter((item) => {
    // Filtro de ano
    if (filters.year && item["ANO"]?.toString() !== filters.year) {
      return false; // Exclui itens que não correspondem ao ano
    }

    // Aplica os filtros adicionais
    if (filters.additionalFilters) {
      return filters.additionalFilters.every((filter: any) => {
        const filterValue = filter.value; // Valor do filtro atual
        if (!filterValue) return true; // Ignora filtros sem valor

        // Normaliza para comparação
        const itemValue = item[filter.label]?.toString()?.toUpperCase() || "";
        const normalizedFilterValue = filterValue.toString()?.toUpperCase();

        return itemValue === normalizedFilterValue;
      });
    }

    return true; // Se não há filtros adicionais, retorna o item
  });
};
