export const processComercializacaoPorProduto = (data: any[], maxDescriptionLength: number = 65): any[] => {
  const processedData: any = {};

  data.forEach((item) => {
    const descricao = item["Descrição SH4"];
    const valor = parseFloat(
      (item["Valor US$"] || "0").replace(/\./g, "").replace(",", ".")
    );
    const tipo = item["tipo"];

    // Função para limitar a descrição e adicionar "..."
    const truncatedDescricao = descricao.length > maxDescriptionLength 
      ? descricao.substring(0, maxDescriptionLength) + "..." 
      : descricao;

    if (!processedData[truncatedDescricao]) {
      processedData[truncatedDescricao] = { descricao: truncatedDescricao, importacao: 0, exportacao: 0 };
    }

    if (processedData[truncatedDescricao].descricao) {
      if (tipo === "Importação") {
        processedData[truncatedDescricao].importacao += valor;
      } else if (tipo === "Exportação") {
        processedData[truncatedDescricao].exportacao += valor;
      }
    }
  });

  // Ordena os dados por 'importacao' de maior para menor
  const sortedData = Object.values(processedData)
        .filter((item: any) => item.descricao !== "")  // Filtra os itens com descrição vazia
        .sort((a: any, b: any) => (b.importacao + b.exportacao) - (a.importacao + a.exportacao));  // Ordenação decrescente pelo total (importacao + exportacao)

  return sortedData;
};
