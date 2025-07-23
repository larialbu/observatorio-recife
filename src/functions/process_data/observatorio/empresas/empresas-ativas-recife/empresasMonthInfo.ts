export const processEmpresasMonthInfo = (data: any) => {
    return data?.sort((a: any, b: any) => Number(a?.['mes']) - Number(b?.['mes']))?.map((dataMap: any, i: any) => {
        if (dataMap['mes'] !== 1) {
           return { mes: dataMap?.['mes'], empresas: dataMap?.['Empresas Ativas'], variacao: (((dataMap?.['Empresas Ativas'] - data?.[i - 1]?.['Empresas Ativas']) / data?.[i - 1]?.['Empresas Ativas']) * 100).toFixed(2) }
        }
        return { mes: dataMap?.['mes'], empresas: dataMap?.['Empresas Ativas'], variacao: 0}
    }) 
}

