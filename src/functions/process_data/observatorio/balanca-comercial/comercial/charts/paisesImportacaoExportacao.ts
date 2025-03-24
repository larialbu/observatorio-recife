export const processImportacaoExportacaoPorPais = (data: any[]): any[] => {
  const processedData: any = {};

  data.forEach((item) => {
    const pais = item["País"];
    const valor = parseFloat(
      (item["Valor US$"] || "0")
    );
    const tipo = item["tipo"];

    if (!processedData[pais]) {
      processedData[pais] = { pais, importacao: 0, exportacao: 0 };
    }

    if (processedData[pais].pais) {
      if (tipo === "Importação") {
        processedData[pais].importacao += valor;
      } else if (tipo === "Exportação") {
        processedData[pais].exportacao += valor;
      }
    }
  });

  // Ordena os dados por 'importacao' de maior para menor
  const sortedData = Object.values(processedData)
        .filter((item: any) => item.pais !== "")  // Filtra os itens com país vazio
        .sort((a: any, b: any) => (b.importacao + b.exportacao) - (a.importacao + a.exportacao));  // Ordenação decrescente pelo total (importacao + exportacao)


  return sortedData;
};
