import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processPassageirosPorNatureza = (
    data: AnacGeralData
  ) => {
    
  const processedData: Record<string, { aeroporto: string; total: number }> = data
  .reduce((acc: { [natureza: string]: {natureza: string, total: number} }, item: AnacGeralHeaders) => {
    const natureza = item["NATUREZA"] || "Indefinida";
  
    const passageiros = item["PASSAGEIRO"] || 0;

    if (!acc[natureza]) {
      acc[natureza] = { natureza, total: 0 };
    }

    acc[natureza].total += passageiros;

    return acc;
  },
  {} as Record<string, { aeroporto: string; total: number }>
  );

  return Object.values(processedData).sort(
    (a, b) => b.total - a.total
  );
};
