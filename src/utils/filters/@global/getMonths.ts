export const getMonths = (filters: Record<string, any>, details: boolean = false) => {
  if (!details) {
    return filters.additionalFilters?.find((item: any) => item.label.toLowerCase() === "mês" || item.label.toLowerCase() === "mes")?.options?.length;
  } else {
    return filters.additionalFilters?.find((item: any) => item.label.toLowerCase() === "mês" || item.label.toLowerCase() === "mes")
  }
};
