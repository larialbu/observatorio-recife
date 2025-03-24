export const processImportacaoExportacaoPorContinente = (
  data: any[]
): any[] => {
  const processedData: any = {};

  data.forEach((item) => {
    const continente = item["Continente"] || "Desconhecido"; // Evita continentes vazios
    const valor = parseFloat(
      (item["Valor US$"] || "0")
    );
    const tipo = item["tipo"];

    if (!processedData[continente]) {
      processedData[continente] = {
        continente,
        importacao: 0,
        exportacao: 0,
      };
    }

    if (tipo === "Importação") {
      processedData[continente].importacao += valor;
    } else if (tipo === "Exportação") {
      processedData[continente].exportacao += valor;
    }
  });

  // Ordena os dados por total de importação + exportação
  const sortedData = Object.values(processedData)
    .filter((item: any) => item.continente) // Evita continentes indefinidos ou vazios
    .sort(
      (a: any, b: any) =>
        b.importacao + b.exportacao - (a.importacao + a.exportacao)
    );

  return sortedData;
};
