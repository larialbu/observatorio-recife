export const getChartDataModelTributos = (data: any, id: string) => {
   const handlers: Record<string, () => void> = {
    //   'tributos-itbi': () => {
    //     return {
    //       empresas: {
    //         ativas: data.empresas?.ativas?.filteredData || [],
    //         inativas: data.empresas?.inativas?.filteredData || [],
    //       },
    //       rawData: {
    //         ativas: data.rawData?.ativas || [],
    //         inativas: data.rawData?.inativas || [],
    //       },
    //     } 
    //   },

      'tributos-itbi': () => {
        return {
          tributos: data.tributos?.filteredData || [],
          rawData: data.rawData || [],
        } 
      },
      
      'tributos-iptu': () => {
        return {
          tributos: data.tributos?.filteredData || [],
          rawData: data.rawData || [],
        } 
      },

    //   'empresas-empresas-ativas-recife': () => {
    //     return{
    //       empresas: data.empresas?.filteredData || [],
    //       rawData: data.rawData || [],
    //     } 
    //   },
    //   'empresas-empresas-ativas': () => {
    //     return {
    //       empresas: data.empresas?.filteredData || [],
    //       rawData: data.rawData || [],
    //     } 
    //   },
    //   'empresas-empresas-inativas': () => {
    //     return{
    //       empresas: data.empresas?.filteredData || [],
    //       rawData: data.rawData || [],
    //     } 
    //   },

    //   'empresas-empresas-ativas-inativas': () => {
    //     return {
    //       ativas: data.empresas?.ativas?.filteredData || [],
    //       inativas: data.empresas?.inativas?.filteredData || [],
    //     } 
    //   },

    //   'empresas-empresas-classes': () => {
    //     return {
    //       empresas: data.empresas?.filteredData || [],
    //       rawData: {
    //         mes: data.rawData?.mes?.filteredData || [],
    //         municipio: data.rawData?.municipio?.filteredData || [],
    //       },
    //     } 
    //   },
    //   'empresas-empresas-naturezas': () => {
    //     return {
    //       empresas: data.empresas?.filteredData || [],
    //       rawData: {
    //         mes: data.rawData?.mes?.filteredData || [],
    //         municipio: data.rawData?.municipio?.filteredData || [],
    //       },
    //     } 
    //   },
    };

    const handler = handlers[id];

    return handler
}

