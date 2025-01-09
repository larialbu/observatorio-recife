export const getMonths = (filters: Record<string, any>, index: number) => {
    return filters.additionalFilters[index]?.options?.length
  }