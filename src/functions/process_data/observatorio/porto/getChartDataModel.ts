  //   Mes  -  Ação
export const getChartDataModel = (data: any, params: string[], accParam: string) => {
    return (data || [])?.reduce((acc: any, obj: any) => {
        params.forEach((param) => {
          if (!acc[param]) acc[param] = {} 

          if (param === 'Ação' && !acc[param][obj['Mes']]) acc[param][obj['Mes']] = {}

          if (param === 'Ação' && !acc[param][obj['Mes']][obj[param]]) acc[param][obj['Mes']][obj[param]] = 0
          
          if (param !== 'Ação' && !acc[param][obj[param]]) acc[param][obj[param]] = 0

          if (param === 'Ação') {
            acc[param][obj['Mes']][obj[param]] += obj[accParam]
          } else {
            acc[param][obj[param]] += obj[accParam]
          }
        })

        return acc
      }, {})
  }