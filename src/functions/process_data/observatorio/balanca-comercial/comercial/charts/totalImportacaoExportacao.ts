import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

export const processTotalImportacaoExportacao = (
    data: BalancaHeaders[]
  ): { tipo: string; total: number }[] => {
    const processedData = {
      importacao: 0,
      exportacao: 0,
    };
  
    data.forEach((item) => {
      const valor = item["Valor US$"] || 0;
  
      const tipo = item["tipo"];
  
      if (tipo === "Importação") {
        processedData.importacao += valor;
      } else if (tipo === "Exportação") {
        processedData.exportacao += valor;
      }
    });
  
    return [
      { tipo: "Importação", total: processedData.importacao },
      { tipo: "Exportação", total: processedData.exportacao },
    ];
  };
  