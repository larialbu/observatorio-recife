import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

export const processImportacaoExportacaoPorPais = (data: BalancaHeaders[]) => {
  const processedData: Record<string, 
  {
    pais: string,
    importacao: number,
    exportacao: number
  }> = {};

  data.forEach((item) => {
    const pais = item["País"];
    const valor = item["Valor US$"] || 0;
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


  const sortedData = Object.values(processedData)
        .filter((item) => item.pais !== "")
        .sort((a, b) => (b.importacao + b.exportacao) - (a.importacao + a.exportacao));


  return sortedData;
};
