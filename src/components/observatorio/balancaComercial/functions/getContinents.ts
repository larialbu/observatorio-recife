interface ComercioExterior {
  Ano: string;
  "Codigo SH4": string;
  Continente: string;
  Data: string;
  "Descrição SH4": string;
  Município: string;
  Mês: string;
  País: string;
  "UF do Município": string;
  "Valor US$": string;
  tipo: string; // "Exportação" ou "Importação"
}

interface ChartData {
  month: string; // continente
  uv: number; // exportação
  pv: number; // importação
  total: number; // total de importação + exportação de todos os continentes
}

export function getContinent(
  jsonData: ComercioExterior[],
  anoFiltro: string,
  municipio?: string
): ChartData[] {
  // Filtrar os dados para incluir apenas os registros de Recife e do ano especificado
  const dadosFiltrados = jsonData.filter(
    (item) =>
      item.Município.toLowerCase().includes(
        municipio ? municipio.toLowerCase() : "recife"
      ) && item.Ano === anoFiltro
  );

  // Inicializar um mapa para acumular valores de exportação e importação por continente
  const valoresPorContinente: Record<
    string,
    { exportacao: number; importacao: number }
  > = {};

  // Iterar sobre os dados filtrados para acumular valores de exportação e importação para cada continente
  dadosFiltrados.forEach((item) => {
    const { Continente, tipo, "Valor US$": valorString } = item;
    const valor = parseFloat(valorString.replace(/,/g, "")) || 0; // Converte o valor para número

    if (!valoresPorContinente[Continente]) {
      valoresPorContinente[Continente] = { exportacao: 0, importacao: 0 };
    }

    // Acumula os valores conforme o tipo de transação (exportação ou importação)
    if (tipo === "Exportação") {
      valoresPorContinente[Continente].exportacao += valor;
    } else if (tipo === "Importação") {
      valoresPorContinente[Continente].importacao += valor;
    }
  });

  // Calcular o total global de importação e exportação
  const totalGlobal = Object.values(valoresPorContinente).reduce(
    (total, { exportacao, importacao }) => total + exportacao + importacao,
    0
  );

  // Converte o mapa para um array de ChartData com o total global adicionado a cada entrada
  const chartData: ChartData[] = Object.keys(valoresPorContinente).map(
    (continente) => {
      const { exportacao, importacao } = valoresPorContinente[continente];
      return {
        month: continente, // nome do continente
        uv: exportacao, // exportação total do continente
        pv: importacao, // importação total do continente
        total: totalGlobal, // total de importação + exportação de todos os continentes
      };
    }
  );

  return chartData;
}
