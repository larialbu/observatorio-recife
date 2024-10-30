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

interface TotalComercioExterior {
  totalExport: number;
  totalImport: number;
  diference: number; // exportação - importação
}

export function getCardsInfos(
  jsonData: ComercioExterior[],
  anoFiltro: string
): TotalComercioExterior {
  // Filtra os dados para incluir apenas os registros do ano especificado
  const dadosFiltrados = jsonData.filter((item) => item.Ano === anoFiltro);

  // Inicializa acumuladores para exportação e importação
  let totalExport = 0;
  let totalImport = 0;

  // Itera sobre os dados filtrados para acumular valores de exportação e importação
  dadosFiltrados.forEach((item) => {
    const valor = parseFloat(item["Valor US$"].replace(/,/g, "")) || 0;

    if (item.tipo === "Exportação") {
      totalExport += valor;
    } else if (item.tipo === "Importação") {
      totalImport += valor;
    }
  });

  // Calcula a diferença entre exportação e importação
  const diference = totalImport - totalExport;

  return {
    totalExport,
    totalImport,
    diference,
  };
}
