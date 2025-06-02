import { microCagedCboDicts } from "@/utils/dicts/micro-caged/microCagedCboDicts"
import { microCagedGrupoDicts } from "@/utils/dicts/micro-caged/microCagedGrupoDicts"

export const rowsComparativoCbo = (data: any) => {
    const aggregatedData = data.reduce((acc: any, obj: any) => {
        const codCbo = obj['cbo2002ocupação']
        const ativ = obj['seção']
        const dataSalario = obj['salário']
        const type = obj['saldomovimentação']

        if (!acc[codCbo]) {
            acc[codCbo] = {
                cod: codCbo,
                description: microCagedCboDicts[codCbo],
                group: microCagedGrupoDicts[ativ],
                quantity: 0,
                totalValue: 0,
                admission: 0,
                resignation: 0
            }
        }

        acc[codCbo].quantity += 1
        acc[codCbo].admission += type === 'Admitidos' ? 1 : 0
        acc[codCbo].resignation += type === 'Demitidos' ? 1 : 0
        acc[codCbo].totalValue += dataSalario

        return acc
    }, {})

    const aggregatedArray = Object.values(aggregatedData);

    return aggregatedArray.map((obj: any) =>  ({
            codigo: obj.cod.toString(),
            descricao: obj.description,
            grupo: obj.group,
            admitidos: obj.admission,
            demitidos: obj.resignation,
            saldo: obj.admission - obj.resignation,
            salario: obj.totalValue / obj.quantity
        })).filter((obj) => !!obj.descricao)
}