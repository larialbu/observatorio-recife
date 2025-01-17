export const getUniqueValues = <T, K extends keyof T>(data: T[], key: K): T[K][] => {
    const uniqueValues: T[K][] = []

    data.map((value) => {
        if (uniqueValues.includes(value[key])) {
            return
        }

        uniqueValues.push(value[key])
    })

    return uniqueValues
}
