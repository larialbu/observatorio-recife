// interface ComercioExterior {
//   Ano: string;
//   "Codigo SH4": string;
//   Continente: string;
//   Data: string; // Exemplo: "1/2023"
//   "Descrição SH4": string;
//   Município: string;
//   Mês: string;
//   País: string;
//   "UF do Município": string;
//   "Valor US$": string;
//   tipo: string; // "Exportação" ou "Importação"
// }

// interface ChartData {
//   month: string;
//   uv: number; // exportação
//   pv: number; // importação
// }

// export function getBalance(
//   jsonData: ComercioExterior[],
//   anoFiltro: string
// ): ChartData[] {
//   // Filtra os dados para incluir apenas registros de Recife e do ano específico
//   const dadosFiltrados = jsonData.filter(
//     (item) =>
//       item.Município.toLowerCase().includes("recife") && item.Ano === anoFiltro
//   );

//   // Inicializa um mapa para agrupar os dados por mês e calcular saldo
//   const saldoPorMesAno: { [key: string]: number } = {};

//   // Itera sobre os dados filtrados e calcula o saldo de cada mês
//   dadosFiltrados.forEach((item) => {
//     const { Mês, Ano, tipo, "Valor US$": valorString } = item;
//     const valor = parseFloat(valorString.replace(/,/g, "")); // Converte o valor para número

//     const chaveMesAno = `${Mês}/${Ano}`; // Cria a chave única de mês/ano

//     // Inicializa o saldo do mês se ainda não existir
//     if (!saldoPorMesAno[chaveMesAno]) {
//       saldoPorMesAno[chaveMesAno] = 0;
//     }

//     // Calcula o saldo com base no tipo de transação
//     if (tipo === "Exportação") {
//       saldoPorMesAno[chaveMesAno] += valor; // Adiciona ao saldo para exportação
//     } else if (tipo === "Importação") {
//       saldoPorMesAno[chaveMesAno] -= valor; // Subtrai do saldo para importação
//     }
//   });

//   // Converte o mapa em um array de ChartDataSaldo
//   const chartDataSaldo: ChartData[] = Object.keys(saldoPorMesAno).map(
//     (mesAno) => ({
//       month: mesAno,
//       pv: saldoPorMesAno[mesAno],
//       uv: 0,
//     })
//   );

//   return chartDataSaldo;
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
  month: string;
  uv: number; // total (importação + exportação)
  pv: number; // 0
}

export function getBalance(
  jsonData: ComercioExterior[],
  anoFiltro: string
): ChartData[] {
  // Filtra os dados para incluir apenas registros do ano específico
  const dadosFiltrados = jsonData.filter((item) => item.Ano === anoFiltro);

  // Inicializa um objeto para agrupar dados por mês e calcular valores totais
  const valoresPorMes: Record<string, number> = {};

  // Itera sobre dados filtrados para acumular valores de importação/exportação por mês
  dadosFiltrados.forEach((item) => {
    const { Mês, Ano, "Valor US$": valorString } = item;
    const valor = parseFloat(valorString.replace(/,/g, "")); // Converte o valor para número

    // Gera uma chave única para cada mês/ano
    const chaveMesAno = `${Mês}/${Ano}`;

    // Inicializa o valor se a chave ainda não existir
    if (!valoresPorMes[chaveMesAno]) {
      valoresPorMes[chaveMesAno] = 0;
    }

    // Acumula o valor total para o mês (importação + exportação)
    valoresPorMes[chaveMesAno] += valor;
  });

  // Converte o objeto de valores por mês em um array de ChartData
  const chartData: ChartData[] = Object.keys(valoresPorMes).map((mesAno) => ({
    month: mesAno,
    pv: valoresPorMes[mesAno], // Total (importação + exportação)
    uv: 0,
  }));

  return chartData;
}
