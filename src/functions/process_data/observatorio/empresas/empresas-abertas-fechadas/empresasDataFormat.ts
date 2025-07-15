 export const dataFormat = (data: any, toCompare: string[], params: string[], column: string, accFuncion: (data: any, params: string[], column: string) => any) => {
      const dataMuni: { [key: string]: any } = {}

      const groupData: { [key: string]: any[] } = {}

      for (let i = 0; i < data.length; i++) {
        const municipio = data[i]['Município'] as string

        if (!groupData[municipio]) groupData[municipio] = [] 

        groupData[municipio].push(data[i])
      }

      toCompare.map((muni: string) => {
        const dataFiltred =  groupData[muni] || []
        if (!dataMuni[muni]) dataMuni[muni] = {}  

          dataMuni[muni] = accFuncion(dataFiltred, params, column)
      }) 

      return dataMuni
    }