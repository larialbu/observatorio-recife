import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processPassageirosAno = (data: AnacGeralData) => {
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const processedData = months.map((mes) => ({
    mes,
    passageiros: 0,
  }));

  data.forEach((item: AnacGeralHeaders) => {
    const passageiros = item["PASSAGEIRO"] || 0;
    const mes = item["MÊS"];

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
