import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processPassageirosPorAeroporto = (
    data: AnacGeralData
  ) => {

  const processedData: Record<string, { aeroporto: string; total: number }> = data
  .reduce((acc: { [aeroporto: string]: {aeroporto: string, total: number} }, item: AnacGeralHeaders) => {
    const aeroporto = item["AEROPORTO NOME"] || "Indefinido";

    const passageiros = item["PASSAGEIRO"] || 0;

    if (!acc[aeroporto]) {
      acc[aeroporto] = { aeroporto, total: 0 };
    }

    acc[aeroporto].total += passageiros;

    return acc;
  },
  {} as Record<string, { aeroporto: string; total: number }>
  );

  return Object.values(processedData).sort(
    (a, b) => b.total - a.total
  );
};

