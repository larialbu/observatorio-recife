interface ComercioExterior {
  Ano: string;
  "Codigo SH4": string;
  Continente: string;
  Data: string; // Exemplo: "1/2023"
  "Descrição SH4": string;
  Município: string;
  Mês: string;
  País: string;
  "UF do Município": string;
  "Valor US$": string;
  tipo: string; // "Exportação" ou "Importação"
}

interface ChartData {
  month: string;
  uv: number; // exportação
  pv: number; // importação
}

export function getExport(
  jsonData: ComercioExterior[],
  anoFiltro: string
): ChartData[] {
  // Filtra os dados para incluir apenas registros de Recife, do ano específico e do tipo Exportação
  const dadosFiltrados = jsonData.filter(
    (item) =>
      item.Município.toLowerCase().includes("recife") &&
      item.Ano === anoFiltro &&
      item.tipo === "Exportação"
  );

  // Inicializa um mapa para agrupar os dados por mês e ano
  const agrupadoPorMesAno: { [key: string]: number } = {};

  // Itera sobre o array de dados filtrados
  dadosFiltrados.forEach((item) => {
    const { Mês, Ano, "Valor US$": valorString } = item;
    const valor = parseFloat(valorString.replace(/,/g, "")); // Converte o valor para número

    const chaveMesAno = `${Mês}/${Ano}`; // Cria a chave única de mês/ano

    agrupadoPorMesAno[chaveMesAno] =
      (agrupadoPorMesAno[chaveMesAno] || 0) + valor;
  });

  // Converte o mapa em um array de ChartData apenas para exportação
  const chartData: ChartData[] = Object.keys(agrupadoPorMesAno).map(
    (mesAno) => ({
      month: mesAno,
      pv: agrupadoPorMesAno[mesAno], // Exportação
      uv: 0, // Importação é zero na função de exportação
    })
  );

  return chartData;
}
