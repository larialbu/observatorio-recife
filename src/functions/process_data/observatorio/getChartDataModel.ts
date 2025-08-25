const empresasRawdataSimple = (data: any) => ({
          empresas: data.empresas?.filteredData || [],
          rawData: data.rawData || [],
        })

const empresasRawdataComplex = (data: any) => ({
          empresas: data.empresas?.filteredData || [],
          rawData: {
            mes: data.rawData?.mes?.filteredData || [],
            municipio: data.rawData?.municipio?.filteredData || [],
          },
        })
        
export const getChartDataModel = (data: any, id: string) => {
   const handlers: Record<string, () => void> = {
    // EMPRESAS _--------------------------------------------------
    
      'empresas-empresas-abertas-fechadas': () => {
        return {
          empresas: {
            ativas: data.empresas?.ativas?.filteredData || [],
            inativas: data.empresas?.inativas?.filteredData || [],
          },
          rawData: {
            ativas: data.rawData?.ativas || [],
            inativas: data.rawData?.inativas || [],
          },
        } 
      },

      'empresas-empresas-tempo-abertura': () => {
        return empresasRawdataSimple(data)
      },
      'empresas-empresas-ativas-recife': () => {
        return empresasRawdataSimple(data)
      },
      'empresas-empresas-ativas': () => {
        return empresasRawdataSimple(data)
      },
      'empresas-empresas-inativas': () => {
        return empresasRawdataSimple(data)
      },

      'empresas-empresas-ativas-inativas': () => {
        return {
          ativas: data.empresas?.ativas?.filteredData || [],
          inativas: data.empresas?.inativas?.filteredData || [],
        } 
      },

      'empresas-empresas-classes': () => {
        return empresasRawdataComplex(data)
      },
      'empresas-empresas-naturezas': () => {
        return empresasRawdataComplex(data)
      },


    // TRIBUTOS _--------------------------------------------------

      'tributos-itbi': () => {
        return {
          tributos: data?.tributos?.filteredData || [],
          rawData: data?.rawData || [],
        } 
      },
      
      
      'tributos-iptu': () => {
        return {
          tributos: data?.tributos?.filteredData || [],
          past: data?.past?.filteredData || [],
        } 
      },


    // CAPAG _--------------------------------------------------

      'capag-geral': () => {
        return {
          capag: data?.capag?.filteredData || [],
          current: data?.current?.filteredData || [],
        } 
      },
      
    };

    const handler = handlers[id];

    return handler
}

