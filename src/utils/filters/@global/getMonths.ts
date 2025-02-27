export const getMonths = (filters: Record<string, any>) => {
  return filters.additionalFilters?.find((item: any) => item.label.toLowerCase() === "mês" || item.label.toLowerCase() === "mes")?.options?.length;
};
