export const rowsProfissao = (data: any) => {

    const aggregatedData = data.reduce((acc: any, item: any ) => {
    const nameCBO = item["CBO Ocupação 2002"]
    const remNominal = item["Vl Remun Dezembro Nom"]
    const remSalMin = item["Vl Remun Dezembro (SM)"]

    if (!acc[nameCBO]) {
           acc[nameCBO] = {
            nome: nameCBO,
            quantidade: 0,
            remuneracao: 0,
            remuneracaoMaior: 0,
            salarioMin: 0
           }  
        }

        acc[nameCBO].quantidade += 1
        acc[nameCBO].remuneracao += remNominal
        acc[nameCBO].salarioMin += remSalMin
        acc[nameCBO].remuneracaoMaior = acc[nameCBO].remuneracaoMaior <= remNominal ? remNominal : acc[nameCBO].remuneracaoMaior

        return acc  
    }, {})


    const aggregatedArray = Object.values(aggregatedData);

    console.log('agrre AAR', aggregatedArray)

    return aggregatedArray.map((item: any) => ({
        nome: item.nome,
        quantidade: item.quantidade,
        remunecaoMed: item.remuneracao / item.quantidade,
        salarioMinMed: item.salarioMin / item.quantidade,
        remuneracaoMaior: item.remuneracaoMaior
    }))
}