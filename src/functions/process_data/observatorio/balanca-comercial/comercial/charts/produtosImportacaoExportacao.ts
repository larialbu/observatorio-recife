export const processComercializacaoPorProduto = (data: any[]): any[] => {
  const processedData = new Map<string, { descricao: string; importacao: number; exportacao: number }>();

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const descricao = item["Descrição SH4"];
    const valor = parseFloat(
      (item["Valor US$"] || "0")
    );
    const tipo = item["tipo"];

    // Usa a descrição completa sem truncamento
    if (!processedData.has(descricao)) {
      processedData.set(descricao, {
        descricao: descricao,
        importacao: 0,
        exportacao: 0,
      });
    }

    const current = processedData.get(descricao)!;
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
