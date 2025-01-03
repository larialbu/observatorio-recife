export const processComercializacaoPorProduto = (data: any[], maxDescriptionLength: number = 65): any[] => {
  const processedData: any = {};

  // Processa os dados em uma única iteração eficiente
  data.forEach((item) => {
    const descricao = item["Descrição SH4"];
    const valor = parseFloat(
      (item["Valor US$"] || "0").replace(/\./g, "").replace(",", ".")
    );
    const tipo = item["tipo"];

    // Trunca a descrição uma única vez e usa um identificador único
    const truncatedDescricao = descricao.length > maxDescriptionLength
      ? descricao.substring(0, maxDescriptionLength) + "..."
      : descricao;

    // Se a descrição já existir, atualize o valor, senão crie uma nova entrada
    if (!processedData[truncatedDescricao]) {
      processedData[truncatedDescricao] = { descricao: truncatedDescricao, importacao: 0, exportacao: 0 };
    }

    // Atualiza os totais de importação ou exportação de forma eficiente
    if (tipo === "Importação") {
      processedData[truncatedDescricao].importacao += valor;
    } else if (tipo === "Exportação") {
      processedData[truncatedDescricao].exportacao += valor;
    }
  });

  // Ordena os dados apenas uma vez, após a agregação
  const sortedData = Object.values(processedData)
    .filter((item: any) => item.descricao !== "")  // Filtra os itens com descrição vazia
    .sort((a: any, b: any) => (b.importacao + b.exportacao) - (a.importacao + a.exportacao));  // Ordenação decrescente pelo total (importacao + exportacao)

  return sortedData;
};
