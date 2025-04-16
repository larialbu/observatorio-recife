import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

export const processSaldo = (
    data: BalancaHeaders[],
    year: string
  ): { saldo: number } => {
    let saldoImportExport = 0;
  
    // Filtra os dados e calcula o saldo (Importação - Exportação)
    data.forEach((item) => {
      if (item["Ano"].toString() === year) {
        const valor = item["Valor US$"] || 0;
        
        if (item["tipo"] === "Importação") {
          saldoImportExport += valor; // Soma para importação
        } else if (item["tipo"] === "Exportação") {
          saldoImportExport -= valor; // Subtrai para exportação
        }
      }
    });
  
    return { saldo: saldoImportExport };
  };
  