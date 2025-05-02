import { PortoPassageirosHeaders } from "@/@types/observatorio/@fetch/porto";

interface ProcessedPassageirosMes {
  mes: string;
  current: number;
  past: number;
  variation: number;
}

export const processPassageirosAnoPorto = (
  current: PortoPassageirosHeaders[],
  past: PortoPassageirosHeaders[]
): ProcessedPassageirosMes[] => {
  const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const processedData = meses.map((mes) => ({
    mes,
    current: 0,
    past: 0,
    variation: 0,
  }));

  current?.forEach((item) => {
    const passageiros = item["Passageiros"] || 0;
    const mes = typeof item["Mes"] === "number" ? item["Mes"] : parseInt(item["Mes"], 10);
    const mesIndex = mes - 1;
    if (processedData[mesIndex]) {
      processedData[mesIndex].current += passageiros;
    }
  });

  past?.forEach((item) => {
    const passageiros = item["Passageiros"] || 0;
    const mes = typeof item["Mes"] === "number" ? item["Mes"] : parseInt(item["Mes"], 10);
    const mesIndex = mes - 1;
    if (processedData[mesIndex]) {
      processedData[mesIndex].past += passageiros;
    }
  });

  return processedData.map((item) => {
    const variation = item.past > 0 ? ((item.current - item.past) / item.past) * 100 : 0;

    return {
      ...item,
      variation: +variation.toFixed(2),
      mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
        month: "short",
      }),
    };
  });
};
