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
        if (!filter.selected || filter.selected.length === 0) return true; // Ignora filtros sem seleção

        // Verifica se o valor do item está nos valores selecionados
        const itemValue = item[filter.label]?.toString()?.toUpperCase() || "";
        const selectedValues = filter.selected.map((val: string) =>
          val.toUpperCase()
        );
        return selectedValues.includes(itemValue); // Retorna true se o valor está entre os selecionados
      });
    }

    return true; // Se não há filtros adicionais, retorna o item
  });
};
