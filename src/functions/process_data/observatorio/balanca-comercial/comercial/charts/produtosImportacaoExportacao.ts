export const processComercializacaoPorProduto = (
  data: any[],
  maxDescriptionLength: number = 65
): any[] => {
  const processedData = new Map<string, { descricao: string; importacao: number; exportacao: number }>();

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const descricao = item["Descrição SH4"];
    const valor = parseFloat(
      (item["Valor US$"] || "0").replace(/\./g, "").replace(",", ".")
    );
    const tipo = item["tipo"];

    // Limita o tamanho da descrição apenas quando necessário
    const truncatedDescricao = descricao.length > maxDescriptionLength
      ? descricao.substring(0, maxDescriptionLength) + "..."
      : descricao;

    // Usa o texto truncado como chave no Map (evita duplicados automaticamente)
    if (!processedData.has(truncatedDescricao)) {
      processedData.set(truncatedDescricao, {
        descricao: truncatedDescricao,
        importacao: 0,
        exportacao: 0,
      });
    }

    const current = processedData.get(truncatedDescricao)!;
    if (tipo === "Importação") {
      current.importacao += valor;
    } else if (tipo === "Exportação") {
      current.exportacao += valor;
    }
  }

  // Converte o Map em array e ordena uma única vez
  return Array.from(processedData.values()).sort(
    (a, b) => b.importacao + b.exportacao - (a.importacao + a.exportacao)
  );
};
