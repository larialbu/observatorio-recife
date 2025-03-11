export const getMonths = (filters: Record<string, any>, details = false) => {
  if (details) {
   return filters.additionalFilters?.find((item: any) => item.label.toLowerCase() === "mês" || item.label.toLowerCase() === "mes");
  } else {
    return filters.additionalFilters?.find((item: any) => item.label.toLowerCase() === "mês" || item.label.toLowerCase() === "mes")?.options?.length;
  }
};
