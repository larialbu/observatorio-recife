export interface IPCAData {
  Capital: string;
  Mês: string;
  "IPCA - Variação mensal(%)": string;
  "IPCA - Variação acumulado no ano(%)": string;
  "IPCA - Variação acumulada em 12 meses(%)": string;
}

interface ChartData {
  month: string; // Mês
  uv: 0;
  pv: number; // Valor do IPCA - Variação mensal(%)
}

export function getIPCAMonth(
  jsonData: IPCAData[],
  anoFiltro: string,
  capitalFiltro: string
): ChartData[] {
  // Filtra os dados para o ano e capital escolhidos
  const dadosFiltrados = jsonData.filter(
    (item) =>
      item.Capital.toLowerCase() === capitalFiltro.toLowerCase() &&
      item.Mês.includes(anoFiltro)
  );

  // Mapeia os dados filtrados para o formato ChartData com o valor decimal no campo pv
  const chartData: ChartData[] = dadosFiltrados.map((item) => ({
    month: item.Mês,
    uv: 0,
    pv: parseFloat(item["IPCA - Variação mensal(%)"].replace(",", ".")) || 0, // Formato decimal
  }));

  return chartData;
}
