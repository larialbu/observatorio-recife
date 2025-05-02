export const processGroupsValues = (data: any[], group: string) => {
    const objData = data.reduce((acc, obj) => {

        if (!acc[obj[group]]) {
            acc[obj[group]] = 0
        }

        acc[obj[group]] += obj['Saldos']

        return acc
    } , {})

    return Object.entries(objData).map(([label, value]) => ({ label, value })).sort((a, b) => (b.value as number) - (a.value as number))
}