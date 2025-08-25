  //   Mes  -  Ação
export const getChartDataModelOperacao = (data: any, params: string[], accParam: string) => {
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

export const getChartDataModelComparative = (data: any, params: string[], accParam: string) => {
  return (data || [])?.reduce((acc: any, obj: any) => {
      params.forEach((param) => {
        if (!acc[obj['Porto Atracação']]) acc[obj['Porto Atracação']] = {}

        if (!acc[obj['Porto Atracação']][param]) acc[obj['Porto Atracação']][param] = {} 

        if (param === 'Ação' && !acc[obj['Porto Atracação']][param][obj['Mes']]) acc[obj['Porto Atracação']][param][obj['Mes']] = {}

        if (param === 'Ação' && !acc[obj['Porto Atracação']][param][obj['Mes']][obj[param]]) acc[obj['Porto Atracação']][param][obj['Mes']][obj[param]] = 0
        
        if (param !== 'Ação' && !acc[obj['Porto Atracação']][param][obj[param]]) acc[obj['Porto Atracação']][param][obj[param]] = 0

        if (param === 'Ação') {
          acc[obj['Porto Atracação']][param][obj['Mes']][obj[param]] += obj[accParam]
        } else {
          acc[obj['Porto Atracação']][param][obj[param]] += obj[accParam]
        }
      })

      return acc
    }, {})
}