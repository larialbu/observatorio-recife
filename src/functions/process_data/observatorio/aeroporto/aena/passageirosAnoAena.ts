import { AenaPassageirosData } from "@/@types/observatorio/@data/aeroportoData";
import { AenaPassageirosHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processPassageirosAnoAena = (
    data: AenaPassageirosData
  ) => {
  // Inicializa os dados processados com os meses
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  // Cria um array para armazenar o total de passageiros por mês
  const processedData = months.map((mes) => ({
    mes,
    passageiros: 0, 
  }));

  // Agora percorremos os dados para processar
  data?.forEach((item: AenaPassageirosHeaders) => {
    const passageiros = item["Passageiros"] || 0

    const mes = item["Mês"];

    // Pegando o índice do mês na array de meses, 10 é pra garantir que é de base decimal
    const mesIndex = mes - 1;
    if (processedData[mesIndex]) {
      processedData[mesIndex].passageiros += passageiros; // Soma os passageiros no mês correspondente
    }
  });

  // Formata os meses pra exibir bonitinho no resultado final
  return processedData.map((item) => ({
    ...item,
    mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
      month: "short",
    }), // Isso aqui formata pra um formato bonitinho tipo "jan", "fev", etc.
  }));
};
