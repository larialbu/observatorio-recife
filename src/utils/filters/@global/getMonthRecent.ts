export const getMonthRecent = (filters: Record<string, any>, index: number) => {
    return filters.additionalFilters[index]?.selected.length > 0
    ? undefined
    : +filters.additionalFilters[index]?.options.sort((a: string, b: string) => (+a) - (+b))[
        filters.additionalFilters[index]?.options.length - 1
      ]

}

