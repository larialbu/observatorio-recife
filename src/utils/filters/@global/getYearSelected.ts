export const getYearSelected = (filters: Record<string, any>) => {
    return filters.year
                ? filters.year
                : filters.years[filters.years.length - 1]
}