import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

export const processExportacao = (
    data: BalancaHeaders[],
    year: string
  ): { exportacao: number } => {
    let totalExportacao = 0;
  
    // Filtra os dados e soma os valores de exportação
    data.forEach((item) => {
      if (item["Ano"].toString() === year && item["tipo"] === "Exportação") {
        const valor = item["Valor US$"] || 0;
        totalExportacao += valor;
      }
    });
  
    return { exportacao: totalExportacao };
  };
  