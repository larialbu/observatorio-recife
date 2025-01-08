export const processValoresImportacaoExportacao = (
    data: any[]
  ): { mes: string; importacao: number; exportacao: number }[] => {
    // Inicializa os meses
    const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  
    // Inicializa os dados processados com os meses
    const processedData = meses.map((mes) => ({
      mes,
      importacao: 0,
      exportacao: 0,
    }));
  
    // Processa os dados
    data.forEach((item) => {
      const valor = parseFloat(
        (item["Valor US$"] || "0").replace(/\./g, "").replace(",", ".")
      ); // Converte valor para número e remove formatação
  
      const mes = item["Mês"];
      const tipo = item["tipo"];
  
      const mesIndex = parseInt(mes, 10) - 1;
      if (processedData[mesIndex]) {
        if (tipo === "Importação") {
          processedData[mesIndex].importacao += valor;
        } else if (tipo === "Exportação") {
          processedData[mesIndex].exportacao += valor;
        }
      }
    });
  
    // Formata os meses para exibir no resultado final
    return processedData.map((item) => ({
      ...item,
      mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
        month: "short",
      }), // Formata para um formato tipo "jan", "fev", etc.
    }));
  };
  