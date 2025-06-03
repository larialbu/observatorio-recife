import { Filters } from "@/@types/observatorio/shared"

export const applyHashedFilters = (filters: Filters, field: string, realField: string, hash: { [ key: string]: string | string[]}) => {
    const filtersCopy = JSON.parse(JSON.stringify(filters))

    const curAdditional = filtersCopy.additionalFilters.find((data: any) => data.label === field)
    const allSelected = curAdditional.selected.reduce((acc: string[], option: string) => acc = [...acc, ...hash[option]], [])

    const newAdditional = { label: realField, options: [], selected: allSelected, temp: true }

    const excludedFilters = [...filtersCopy.additionalFilters.filter((data: any) => data.label !== realField), newAdditional]
    
    return { ...filters, additionalFilters: excludedFilters}
}