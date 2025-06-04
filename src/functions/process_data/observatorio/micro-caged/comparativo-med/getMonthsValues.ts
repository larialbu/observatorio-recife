import { geralAccFunction } from "../../rais/demografia/geralFuncition"
import { getAccSalario } from "../getAccSalario"

export const getMunicipiosMonthData = (data: any, municipios: string[]) => {
  if (!data.length) return

  const dataMuni: { [key: string]: any } = {}

    municipios.map((muni: string) => {
      const dataFiltredMuni = data?.filter((micro: any) => micro['município'] === muni) || []   
      if (!dataMuni[muni]) dataMuni[muni] = {}  

      const keysObj = Object.keys(data[0]).filter(key => key === "mês")
      
      const dataSalario = getAccSalario(dataFiltredMuni, keysObj)
      const dataAcc = geralAccFunction(dataFiltredMuni || [], ["mês"])

      const { 'mês': muniAcc} = dataAcc
      const { 'mês': muniSalario } = dataSalario 

      for (const key in muniAcc) {
        if (!dataMuni[muni][key]) dataMuni[muni][key] = 0

        dataMuni[muni][key] = muniSalario[key] / muniAcc[key]
      }
    })

    return dataMuni
}