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

export function calcularExportacaoImportacao(
  jsonData: ComercioExterior[],
  anoFiltro: string
): ChartData[] {
  // Filtra os dados para incluir apenas os registros de Recife e do ano específico
  const dadosFiltrados = jsonData.filter(
    (item) =>
      item.Município.toLowerCase().includes("recife") && item.Ano === anoFiltro
  );

  // Inicializa um mapa para agrupar os dados por mês e ano
  const agrupadoPorMesAno: {
    [key: string]: { exportacao: number; importacao: number };
  } = {};

  // Itera sobre o array de dados filtrados de Recife para o ano específico
  dadosFiltrados.forEach((item) => {
    const { Mês, Ano, tipo, "Valor US$": valorString } = item;

    // Garante que o valor seja convertido para número
    const valor = parseFloat(valorString.replace(/,/g, ""));

    // Gera uma chave única para cada mês/ano
    const chaveMesAno = `${Mês}/${Ano}`;

    // Inicializa o objeto se a chave ainda não existir
    if (!agrupadoPorMesAno[chaveMesAno]) {
      agrupadoPorMesAno[chaveMesAno] = { exportacao: 0, importacao: 0 };
    }

    // Soma os valores de exportação e importação
    if (tipo === "Exportação") {
      agrupadoPorMesAno[chaveMesAno].exportacao += valor;
    } else if (tipo === "Importação") {
      agrupadoPorMesAno[chaveMesAno].importacao += valor;
    }
  });

  // Converte o mapa em um array no formato ChartData
  const chartData: ChartData[] = Object.keys(agrupadoPorMesAno).map(
    (mesAno) => {
      const { exportacao, importacao } = agrupadoPorMesAno[mesAno];
      return {
        month: mesAno,
        uv: exportacao,
        pv: importacao,
      };
    }
  );

  return chartData;
}
