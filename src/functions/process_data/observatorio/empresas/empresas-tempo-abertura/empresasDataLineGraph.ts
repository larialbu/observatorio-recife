export const processEmpresasDataLineGraph = (data: any, toCompare: string[], column: string) => {
  const dataGroup = toCompare.map((compare: string) => data[compare].sort((a: any, b: any) => a['mes'] - b['mes']))

    const dataByMonth: any[] = []

    for (let i = 0; i < dataGroup.length; i++ ) {
      for (let x = 0; x < dataGroup[i].length; x++) {
        const dataMonthExist = dataByMonth.findIndex((data: any) => data['label'] === dataGroup[i][x]['mes'])
        if (dataMonthExist !== -1) {
          dataByMonth[dataMonthExist] = { ...dataByMonth[dataMonthExist], [dataGroup[i][x]['Municipio']]: dataGroup[i][x][column] }
          continue
        }

        dataByMonth.push({ label: dataGroup[i][x]['mes'], [dataGroup[i][x]['Municipio']]: dataGroup[i][x][column]  })
      } 
    }

    return dataByMonth
}
