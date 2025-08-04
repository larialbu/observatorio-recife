export const processItbiAvaliacoesTable = (data: any) => {
    return data.map((dataMap: any) => ({ data: `${dataMap['mes'].length > 1 ? dataMap['mes'] : `0${dataMap['mes']}` }/${dataMap['ano']}`, mes: dataMap['mes'], logradouro: dataMap['logradouro'], bairro: dataMap['bairro'], imovel: dataMap['tipo_imovel'], avaliacao: dataMap['valor_avaliacao'] }))
}
