import { microCagedCboDicts } from "@/utils/dicts/micro-caged/microCagedCboDicts"

export const rowsComparativoCbo = (data: any) => {
    const aggregatedData = data.reduce((acc: any, obj: any) => {
        const codCbo = obj['cbo2002ocupação']
        const dataSalario = obj['salário']

        if (!acc[codCbo]) {
            acc[codCbo] = {
                cod: codCbo,
                description: microCagedCboDicts[codCbo],
                quantity: 0,
                totalValue: 0
            }
        }

        acc[codCbo].quantity += 1
        acc[codCbo].totalValue += dataSalario

        return acc
    }, {})

    const aggregatedArray = Object.values(aggregatedData);

    return aggregatedArray.map((obj: any) =>  ({
            codigo: obj.cod.toString(),
            descricao: obj.description,
            salario: obj.totalValue / obj.quantity
        })).filter((obj) => !!obj.descricao)
}