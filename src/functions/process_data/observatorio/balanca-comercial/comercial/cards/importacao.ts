export const processImportacao = (
    data: any[],
    year: string
  ): { importacao: number } => {
    let totalImportacao = 0;
  
    // Filtra os dados e soma os valores de Importação
    data.forEach((item) => {
      if (item["Ano"] === year && item["tipo"] === "Importação") {
        const valor = parseFloat(
          (item["Valor US$"] || "0").replace(/\./g, "").replace(",", ".")
        );
        totalImportacao += valor;
      }
    });
  
    return { importacao: totalImportacao };
  };
  