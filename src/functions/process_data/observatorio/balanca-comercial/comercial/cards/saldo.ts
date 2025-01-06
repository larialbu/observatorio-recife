export const processSaldo = (
    data: any[],
    year: string
  ): { saldo: number } => {
    let saldoImportExport = 0;
  
    // Filtra os dados e calcula o saldo (Importação - Exportação)
    data.forEach((item) => {
      if (item["Ano"] === year) {
        const valor = parseFloat(
          (item["Valor US$"] || "0").replace(/\./g, "").replace(",", ".")
        );
        if (item["tipo"] === "Importação") {
          saldoImportExport += valor; // Soma para importação
        } else if (item["tipo"] === "Exportação") {
          saldoImportExport -= valor; // Subtrai para exportação
        }
      }
    });
  
    return { saldo: saldoImportExport };
  };
  