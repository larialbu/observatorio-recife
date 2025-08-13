export const processPortosMovimentacaoGeral = (accAcao: { [key: string]: { [key: string]: number } }) => {
  const acaoKeys = Object.keys(accAcao);

  const dataAcao: { [key: string]: number}[] = []

  for (let key of acaoKeys) {
    dataAcao.push((accAcao?.[key] || {}) as { [key: string]: number});
  }

  const totalAccAcao = dataAcao.reduce((acc, curr) => {
    Object.keys(curr).forEach(key => {
      acc['Total'] = (acc['Total'] || 0) + curr?.[key]
      acc[key] = (acc?.[key] || 0) + curr?.[key]; // Se o valor já existir, soma, senão inicia com 0.
    });
    return acc;
  }, {});

  const chartData: { acao: string, totalPeso: number }[] = []

  for (let key in totalAccAcao) {
    chartData.push({ acao: key, totalPeso: totalAccAcao?.[key] || 0 });
  }

  return chartData;
}