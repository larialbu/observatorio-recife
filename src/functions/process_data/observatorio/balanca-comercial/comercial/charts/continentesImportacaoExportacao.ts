import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

export const processImportacaoExportacaoPorContinente = (
  data: BalancaHeaders[]
) => {
  const processedData: Record<string,
  {
    continente: string;
    importacao: number;
    exportacao: number;
  }
  > = {};

  data.forEach((item) => {
    const continente = item["Continente"] || "Desconhecido";
    const valor = item["Valor US$"] || 0;
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

  const sortedData = Object.values(processedData)
    .filter((item) => item.continente)
    .sort(
      (a, b) =>
        b.importacao + b.exportacao - (a.importacao + a.exportacao)
    );

  return sortedData;
};
