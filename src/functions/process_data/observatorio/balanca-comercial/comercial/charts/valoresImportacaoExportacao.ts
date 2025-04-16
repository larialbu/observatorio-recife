import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

export const processValoresImportacaoExportacao = (
  data: BalancaHeaders[]
): { mes: string; importacao: number; exportacao: number }[] => {

  const mesMap: { [key: string]: number} = {
    Janeiro: 1,
    Fevereiro: 2,
    Março: 3,
    Abril: 4,
    Maio: 5,
    Junho: 6,
    Julho: 7,
    Agosto: 8,
    Setembro: 9,
    Outubro: 10,
    Novembro: 11,
    Dezembro: 12,
  };

  // Inicializa os dados processados com os meses
  const processedData = Array.from({ length: 12 }, (_, i) => ({
    mes: (i + 1).toString(),
    importacao: 0,
    exportacao: 0,
  }));

  // Processa os dados
  data.forEach((item) => {
    const valor = item["Valor US$"] || 0;
    const mes = item["Mês"];
    const tipo = item["tipo"];

    // Verifica se o mês é válido
    const mesIndex = mesMap[mes] ? mesMap[mes] - 1 : -1;
    if (mesIndex !== -1) {
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
