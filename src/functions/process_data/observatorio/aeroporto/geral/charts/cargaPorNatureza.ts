import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processCargasPorNatureza = (data: AnacGeralData) => {
  return data.reduce((acc: { [natureza: string]: {natureza: string, total: number} }, item: AnacGeralHeaders) => {

    const natureza = item["NATUREZA"] || "Indefinida";
    
    const carga = item["CARGA"] || 0;

    if (!acc[natureza]) {
      acc[natureza] = { natureza, total: 0 };
    }

    acc[natureza].total += carga

    return acc;
  }, {});
};

export const prepareCargasPorNaturezaData = (data: AnacGeralData) => {
  const processed = processCargasPorNatureza(data);
  return Object.values(processed);
};
