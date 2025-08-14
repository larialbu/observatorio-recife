export const processIptuPesquisaTable = (data: any) => {
    return data.map((dataMap: any) => ({ 
        ano: dataMap?.['ano do exercício'], 
        logradouro: dataMap?.['logradouro'], 
        bairro: dataMap?.['bairro'], 
        zona: dataMap?.['zona'], 
        valueIptu: dataMap?.['valor cobrado de IPTU'], 
        valueConstrucao2m: dataMap?.['valor do m2 de construção'],
        valueTerreno2m: dataMap?.['valor do m2 do terreno'],
        valueImovel: dataMap?.['valor total do imóvel estimado'] 
    }))
}
