export const getMonths = (filters: Record<string, any>) => {
  return filters.additionalFilters?.find((item: any) => item.label === "MÊS" || item.label === "Mês")?.options?.length;
};
