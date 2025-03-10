export const calculateTotals = (chartData: any[]) => {
  let totalImportacao = 0;
  let totalExportacao = 0;

  chartData.forEach((item) => {
    totalImportacao += item.importacao || 0;
    totalExportacao += item.exportacao || 0;
  });

  return { totalImportacao, totalExportacao };
};

export const calculatePercentages = (
  value: number,
  total: number
): number => {
  if (total === 0) return 0;
  return parseFloat(((value / total) * 100).toFixed(2));
};

export const calculatePercentagesByContinent = (
  chartData: any[],
  totalNegociado: number
) => {
  return chartData.map((item) => ({
    continente: item.continente,
    percentualImportacao: calculatePercentages(item.importacao, totalNegociado),
    percentualExportacao: calculatePercentages(item.exportacao, totalNegociado),
  }));
};

export const calculatePercentagesByCountry = (
  chartData: any[],
  totalNegociado: number
) => {
  return chartData.map((item) => ({
    pais: item.pais,
    percentualImportacao: calculatePercentages(item.importacao, totalNegociado),
    percentualExportacao: calculatePercentages(item.exportacao, totalNegociado),
  }));
};

export const calculatePercentagesByProducts = (
  chartData: any[],
  totalNegociado: number
) => {
  return chartData.map((item) => ({
    produto: item.descricao,
    percentualImportacao: calculatePercentages(item.importacao, totalNegociado),
    percentualExportacao: calculatePercentages(item.exportacao, totalNegociado),
  }));
};

// Adicione o EXPORT aqui ↓
export const calculateTotalPercentages = (
  chartData: any[],
  totalNegociado: number,
  keyField: string
): { [key: string]: any }[] => {
  return chartData.map((item) => {
    const percentualImportacao = calculatePercentages(item.importacao, totalNegociado);
    const percentualExportacao = calculatePercentages(item.exportacao, totalNegociado);
    const totalPercentual = parseFloat(
      (percentualImportacao + percentualExportacao).toFixed(2)
    );

    return {
      [keyField]: item[keyField],
      totalPercentual,
    };
  });
};