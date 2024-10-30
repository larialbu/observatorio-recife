// interface ComercioExterior {
//   Ano: string;
//   "Codigo SH4": string;
//   Continente: string;
//   Data: string;
//   "Descrição SH4": string;
//   Município: string;
//   Mês: string;
//   País: string;
//   "UF do Município": string;
//   "Valor US$": string;
//   tipo: string; // "Exportação" ou "Importação"
// }

// interface ChartData {
//   month: string; // país
//   uv: number; // exportação
//   pv: number; // importação
// }

// export function getCountrys(
//   jsonData: ComercioExterior[],
//   anoFiltro: string
// ): ChartData[] {
//   // Filtra os dados para incluir apenas os registros de Recife e do ano especificado
//   const dadosFiltrados = jsonData.filter(
//     (item) =>
//       item.Município.toLowerCase().includes("recife") && item.Ano === anoFiltro
//   );

//   // Inicializa um mapa para acumular valores de exportação e importação por país
//   const valoresPorPais: Record<
//     string,
//     { exportacao: number; importacao: number }
//   > = {};

//   // Itera sobre os dados filtrados para acumular valores de exportação e importação para cada país
//   dadosFiltrados.forEach((item) => {
//     const { País, tipo, "Valor US$": valorString } = item;
//     const valor = parseFloat(valorString.replace(/,/g, "")) || 0; // Converte o valor para número

//     if (!valoresPorPais[País]) {
//       valoresPorPais[País] = { exportacao: 0, importacao: 0 };
//     }

//     // Acumula os valores conforme o tipo de transação (exportação ou importação)
//     if (tipo === "Exportação") {
//       valoresPorPais[País].exportacao += valor;
//     } else if (tipo === "Importação") {
//       valoresPorPais[País].importacao += valor;
//     }
//   });

//   // Converte o mapa para um array de ChartData
//   const chartData: ChartData[] = Object.keys(valoresPorPais).map((pais) => {
//     const { exportacao, importacao } = valoresPorPais[pais];
//     return {
//       month: pais, // país
//       uv: exportacao, // exportação total do país
//       pv: importacao, // importação total do país
//     };
//   });

//   return chartData;
// }

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
  countrys: string[];
  data: {
    month: string; // país
    uv: number; // exportação
    pv: number; // importação
  }[];
}

export function getCountrys(
  jsonData: ComercioExterior[],
  anoFiltro: string,
  municipio?: string
): ChartData {
  // Filtra os dados para incluir apenas os registros de Recife e do ano especificado
  const dadosFiltrados = jsonData.filter(
    (item) =>
      item.Município.toLowerCase().includes(
        municipio ? municipio.toLowerCase() : "recife"
      ) && item.Ano === anoFiltro
  );

  // Inicializa um mapa para acumular valores de exportação e importação por país
  const valoresPorPais: Record<
    string,
    { exportacao: number; importacao: number }
  > = {};

  // Itera sobre os dados filtrados para acumular valores de exportação e importação para cada país
  dadosFiltrados.forEach((item) => {
    const { País, tipo, "Valor US$": valorString } = item;
    const valor = parseFloat(valorString.replace(/,/g, "")) || 0; // Converte o valor para número

    if (!valoresPorPais[País]) {
      valoresPorPais[País] = { exportacao: 0, importacao: 0 };
    }

    // Acumula os valores conforme o tipo de transação (exportação ou importação)
    if (tipo === "Exportação") {
      valoresPorPais[País].exportacao += valor;
    } else if (tipo === "Importação") {
      valoresPorPais[País].importacao += valor;
    }
  });

  // Ordena os países pelos valores totais e seleciona os 5 principais
  const top5Paises = Object.entries(valoresPorPais)
    .sort(
      ([, a], [, b]) =>
        b.exportacao + b.importacao - (a.exportacao + a.importacao)
    )
    .slice(0, 5)
    .map(([pais]) => ({
      country: pais,
      ...valoresPorPais[pais],
    }));

  // Gera os dados para o array ChartData no formato especificado
  const chartData: ChartData = {
    countrys: top5Paises.map((item) => item.country),
    data: top5Paises.map((item) => ({
      month: item.country,
      uv: item.exportacao,
      pv: item.importacao,
    })),
  };

  return chartData;
}
