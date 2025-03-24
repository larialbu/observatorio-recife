export const processExportacao = (
    data: any[],
    year: string
  ): { exportacao: number } => {
    let totalExportacao = 0;
  
    // Filtra os dados e soma os valores de exportação
    data.forEach((item) => {
      if (item["Ano"].toString() === year && item["tipo"] === "Exportação") {
        const valor = parseFloat(
          (item["Valor US$"] || "0")
        );
        totalExportacao += valor;
      }
    });
  
    return { exportacao: totalExportacao };
  };
  