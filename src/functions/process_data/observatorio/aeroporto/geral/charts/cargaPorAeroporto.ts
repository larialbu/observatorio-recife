import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processCargaPorAeroporto = (
    data: AnacGeralHeaders[]
  ) => {

  const processedData: Record<string, { aeroporto: string; totalCarga: number }> = data
  .reduce((acc: { [aeroporto: string]: {aeroporto: string, totalCarga: number} }, item: AnacGeralHeaders) => {
    const aeroporto = item["AEROPORTO NOME"] || "Indefinido";
    const carga = item["CARGA"] || 0;

    if (!acc[aeroporto]) {
      acc[aeroporto] = { aeroporto, totalCarga: 0 };
    }

    acc[aeroporto].totalCarga += carga;
    return acc;
  },
  {} as Record<string, { aeroporto: string; totalCarga: number }>
  );


  // converte o objeto em uma lista e ordena pela carga total (descendente)
  return Object.values(processedData).sort(
    (a, b) => b.totalCarga - a.totalCarga
  );
};
