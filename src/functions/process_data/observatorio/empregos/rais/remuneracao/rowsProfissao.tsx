import { raisCboDicts } from "@/utils/dicts/rais/raisCboDicts"
import { raisTipoVinculoDicts } from "@/utils/dicts/rais/raisTipoVinculoDicts"

export const rowsProfissao = (data: any) => {
    const aggregatedData = data.reduce((acc: {[nameCBO : string]: { nome: string, codCbo: number, quantidade: number, remuneracao: number, remuneracaoMaior: number, salarioMin: number, celetistas: number, estatutarios: number}} , item: any ) => {
    const nameCBO = item["CBO Ocupação 2002"]
    const remNominal = item["Vl Remun Dezembro Nom"]
    const remSalMin = item["Vl Remun Dezembro (SM)"]
    const vinculo = item['Tipo Vínculo']
    const valCBO = raisCboDicts[nameCBO]
    const validCBO = valCBO ? nameCBO : ''

    if (!acc[nameCBO]) {
           acc[validCBO] = {
            nome: validCBO,
            codCbo: valCBO,
            quantidade: 0,
            remuneracao: 0,
            remuneracaoMaior: 0,
            salarioMin: 0,
            celetistas: 0,
            estatutarios: 0
           }  
        }

        acc[validCBO].quantidade += 1
        acc[validCBO].remuneracao += remNominal
        acc[validCBO].salarioMin += remSalMin
        acc[validCBO].remuneracaoMaior = acc[validCBO].remuneracaoMaior <= remNominal ? remNominal : acc[validCBO].remuneracaoMaior
        const estatutarios = [30, 31, 35];
        const tipo = raisTipoVinculoDicts[vinculo];
        
        if (estatutarios.includes(tipo)) {
            acc[validCBO].estatutarios += 1;
        } else {
            acc[validCBO].celetistas += 1;
        }

        return acc  
    }, {})


    const aggregatedArray = Object.values(aggregatedData);

    return aggregatedArray.map((item: any) => ({
        nome: item.nome,
        codCbo: item.codCbo,
        quantidade: item.quantidade,
        remunecaoMed: item.remuneracao / item.quantidade,
        salarioMinMed: item.salarioMin / item.quantidade,
        remuneracaoMaior: item.remuneracaoMaior,
        celetistas: item.celetistas,
        estatutarios: item.estatutarios
    }))
}