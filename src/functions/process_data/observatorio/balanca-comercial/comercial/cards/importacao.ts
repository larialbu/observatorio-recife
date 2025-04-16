import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

export const processImportacao = (
    data: BalancaHeaders[],
    year: string
  ): { importacao: number } => {
    let totalImportacao = 0;
  
    // Filtra os dados e soma os valores de Importação
    data.forEach((item) => {
      if (item["Ano"].toString() === year && item["tipo"] === "Importação") {
        const valor = item["Valor US$"] || 0;
        totalImportacao += valor;
      }
    });
  
    return { importacao: totalImportacao };
  };
  