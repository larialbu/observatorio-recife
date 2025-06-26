export const getYearSelected = (filters: Record<string, any>) => {
    console.log('Filters', filters)

    return filters?.year
                ? filters?.year
                : filters?.years?.[filters?.years.length - 1]
}