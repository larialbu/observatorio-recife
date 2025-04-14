import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processCargasAnoComparativo = (
  data: AnacGeralData,
  aeroportos: string[]
): { mes: string; [key: string]: number | string }[] => {

  const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const processedData = meses.map((mes) => {
    const result: { mes: string; [key: string]: number | string } = { mes };
    aeroportos.forEach((aeroporto) => {
      result[aeroporto] = 0;
    });
    return result;
  });

  data.forEach((item: AnacGeralHeaders) => {
    const carga = parseFloat(
      (item["CARGA"] || "0").toString()
    );

    const mes = item["MÊS"];
    const aeroportoNome = item["AEROPORTO NOME"];

    if (aeroportos.includes(aeroportoNome)) {
      const mesIndex = mes - 1;
      if (processedData[mesIndex]) {
        processedData[mesIndex][aeroportoNome] =
          (processedData[mesIndex][aeroportoNome] as number) + carga;
      }
    }
  });

  return processedData.map((item) => ({
    ...item,
    mes: new Date(0, parseInt(item.mes as string, 10) - 1).toLocaleString(
      "pt-BR",
      {
        month: "short",
      }
    ), // Formata para um formato tipo "jan", "fev", etc.
  }));
};
