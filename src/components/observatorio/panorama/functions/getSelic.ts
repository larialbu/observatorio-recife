interface TaxaData {
  Data: string; // Exemplo: "1/20/2021"
  Taxa: string;
  Variação: string;
}

interface ChartData {
  month: string; // mês
  uv: 0;
  pv: number; // Taxa
}

export function getSelic(jsonData: TaxaData[], anoFiltro: string): ChartData[] {
  // Filtra os dados para incluir apenas registros do ano especificado
  const dadosFiltrados = jsonData.filter((item) =>
    item.Data.endsWith(anoFiltro)
  );

  // Mapeia os dados filtrados para o formato ChartData, convertendo a taxa em número
  const chartData: ChartData[] = dadosFiltrados.map((item) => {
    const [mes] = item.Data.split("/"); // Extrai o mês
    return {
      month: `Mês ${mes}`,
      uv: 0,
      pv: parseFloat(item.Taxa.replace(",", ".")) || 0, // Converte a taxa para número
    };
  });

  return chartData;
}
