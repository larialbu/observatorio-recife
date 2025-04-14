import { AenaCargasData } from "@/@types/observatorio/@data/aeroportoData";
import { AenaCargasHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processCargasPorAeroportoAena = (
    data: AenaCargasData
  ) => {
    // Reduz os dados para calcular o total de carga por aeroporto
    const processedData = data.reduce((acc: { [aeroporto: string]: { aeroporto: string, totalCarga: number} }, item: AenaCargasHeaders) => {
      const aeroporto = item["Aeroporto"] || "Indefinido";
      const quantidade = item["Quantidade"] || 0;
  
      if (!acc[aeroporto]) {
        acc[aeroporto] = { aeroporto, totalCarga: 0 }; // Se o aeroporto não existir, inicializa com total de carga 0
      }
  
      acc[aeroporto].totalCarga += quantidade; // Soma a carga no aeroporto correspondente
  
      return acc;
    }, {});
  
    // Converte o objeto em uma lista e ordena pela quantidade de carga (descendente)
    return Object.values(processedData).sort(
      (a: any, b: any) => b.totalCarga - a.totalCarga // Ordena pela quantidade de carga
    );
  };
  