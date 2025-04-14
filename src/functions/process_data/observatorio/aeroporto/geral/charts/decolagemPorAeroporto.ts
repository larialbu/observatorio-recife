import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processDecolagensPorAeroporto = (data: AnacGeralData) => {

  const processedData: Record<string, { aeroporto: string; totalDecolagens: number }> = data
  .reduce((acc: { [aeroporto: string]: {aeroporto: string, totalDecolagens: number} }, item: AnacGeralHeaders) => {
    const aeroporto = item["AEROPORTO NOME"] || "Indefinido";
    
    const decolagens = item["DECOLAGENS"] || 0;

    if (!acc[aeroporto]) {
      acc[aeroporto] = { aeroporto, totalDecolagens: 0 };
    }

    acc[aeroporto].totalDecolagens += decolagens;

    return acc;
  },
  {} as Record<string, { aeroporto: string; totalDecolagens: number }>
  );

  return Object.values(processedData).sort(
    (a, b) => b.totalDecolagens - a.totalDecolagens
  );
};
