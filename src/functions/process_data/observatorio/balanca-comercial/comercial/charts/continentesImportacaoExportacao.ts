export const processImportacaoExportacaoPorContinente = (data: any[]): any[] => {
  const processedData: any = {};

  data.forEach((item) => {
    const continente = item["Continente"];
    const valor = parseFloat(
      (item["Valor US$"] || "0").replace(/\./g, "").replace(",", ".")
    );
    const tipo = item["tipo"];

    if (!processedData[continente]) {
      processedData[continente] = { continente, importacao: 0, exportacao: 0 };
    }

    if(processedData[continente].continente){
      if (tipo === "Importação") {
        processedData[continente].importacao += valor;
      } else if (tipo === "Exportação") {
        processedData[continente].exportacao += valor;
      }
    }

  });
  
  //Colocar no futuro uma permissão de ordenar por exportação ou importação
  // Ordena os dados por 'importacao' de maior para menor
  const sortedData = Object.values(processedData)
        .filter((item: any) => item.pais !== "")  // Filtra os itens com país vazio
        .sort((a: any, b: any) => (b.importacao + b.exportacao) - (a.importacao + a.exportacao));  // Ordenação decrescente pelo total (importacao + exportacao)



  return sortedData.filter((item: any) => item.continente !== "")  // Filtra os itens com continente vazio);;
};
