    export const getSmFiltred = (data: any[]) => {
      const salarioMin = data['sm'] || 1518

      // nesse 1518, temos q pegar a primeira linha data[0] e pegar oa param sm (salário minimo) data[0]['sm'], ele vai retornar o valor do salário minimo
      return data.filter((obj: any) => obj['indtrabintermitente'] == 0 && obj['salário'] > salarioMin * 0.3 && obj['salário'] < salarioMin * 150)
      // return data.filter((obj: any) => obj['indtrabintermitente'] == 0 && obj['salário'] > 1518 * 0.3 && obj['salário'] < 1518 * 150)
    }