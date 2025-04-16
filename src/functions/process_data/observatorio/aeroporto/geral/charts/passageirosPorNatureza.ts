import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processPassageirosPorNatureza = (
    data: AnacGeralHeaders[]
  ) => {
    
  const processedData: Record<string, { natureza: string; total: number }> = data.reduce(
    (acc, item) => {
      const natureza = item["NATUREZA"] || "Indefinida";
      const passageiros = item["PASSAGEIRO"] || 0;
  
      if (!acc[natureza]) {
        acc[natureza] = { natureza, total: 0 };
      }
  
      acc[natureza].total += passageiros;
  
      return acc;
    },
    {} as Record<string, { natureza: string; total: number }>
  );

  return Object.values(processedData).sort(
    (a, b) => b.total - a.total
  );
};
