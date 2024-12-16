export const aeroportoDataFilter = (data: any[], filters: any) => {
  if (!filters) return data;

  return data.filter((item) => {
    // Filtro de ano
    if (filters.year && item["ANO"]?.toString() !== filters.year) {

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
