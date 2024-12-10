import { ComercioExterior } from "../../../components/observatorio/balancaComercial/types/Comerce";

interface ChartData {
  countrys: string[];
  data: {
    month: string;
    uv: number; // exportação
    pv: number; // importação
  }[];
}

export function getMainCountry(
  jsonData: ComercioExterior[],
  anoFiltro: string,
  municipio?: string
): ChartData {
  // Filtra os dados para incluir apenas registros de Recife e do ano específico
  const dadosFiltrados = jsonData.filter(
    (item) =>
      item.Município.toLowerCase().includes(
        municipio ? municipio.toLowerCase() : "recife"
      ) && item.Ano === anoFiltro
  );

  // Inicializa um mapa para agrupar dados por país e calcular valores totais
  const valoresPorPais: Record<
    string,
    { exportacao: number; importacao: number }
  > = {};

  // Itera sobre dados filtrados para acumular valores de exportação/importação por país
  dadosFiltrados.forEach((item) => {
    const { País, tipo, "Valor US$": valorString } = item;
    const valor = parseFloat(valorString.replace(/,/g, "")); // Converte o valor para número

    if (!valoresPorPais[País]) {
      valoresPorPais[País] = { exportacao: 0, importacao: 0 };
    }

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
    .map(([pais]) => pais);

  // Cria o objeto de dados mensais para os 5 principais países
  const dataMensal: {
    month: string;
    uv: number;
    pv: number;
  }[] = [];

  top5Paises.forEach((pais) => {
    const dadosPorMes = dadosFiltrados.filter((item) => item.País === pais);
    const agrupadoPorMes: {
      [key: string]: { exportacao: number; importacao: number };
    } = {};

    dadosPorMes.forEach((item) => {
      const { Mês, Ano, tipo, "Valor US$": valorString } = item;
      const valor = parseFloat(valorString.replace(/,/g, ""));
      const chaveMesAno = `${Mês}/${Ano}`;

      if (!agrupadoPorMes[chaveMesAno]) {
        agrupadoPorMes[chaveMesAno] = { exportacao: 0, importacao: 0 };
      }

      if (tipo === "Exportação") {
        agrupadoPorMes[chaveMesAno].exportacao += valor;
      } else if (tipo === "Importação") {
        agrupadoPorMes[chaveMesAno].importacao += valor;
      }
    });

    // Adiciona os valores mensais para cada país ao array de dados mensais, somando meses duplicados
    Object.entries(agrupadoPorMes).forEach(([mesAno, valores]) => {
      const existente = dataMensal.find((item) => item.month === mesAno);
      if (existente) {
        existente.uv += valores.exportacao;
        existente.pv += valores.importacao;
      } else {
        dataMensal.push({
          month: mesAno,
          uv: valores.exportacao,
          pv: valores.importacao,
        });
      }
    });
  });

  return {
    countrys: top5Paises,
    data: dataMensal,
  };
}
