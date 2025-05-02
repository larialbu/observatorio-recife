import { PortoMesData } from "@/@types/observatorio/@fetch/porto";

interface ProcessedCargaMes {
  mes: string;
  current: string;
  past: string;
  variation: number;
}

export const processCargasPorMes = (
  current: PortoMesData[],
  past: PortoMesData[]
): ProcessedCargaMes[] => {
  const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const processedData = meses.map((mes) => ({
    mes,
    current: 0,
    past: 0,
    variation: 0,
  }));

  current?.forEach((item) => {
    const carga = item.VLPesoCargaBruta || 0;
    const mes = Number(item.Mes);
    const mesIndex = mes - 1;

    if (processedData[mesIndex]) {
      processedData[mesIndex].current += carga;
    }
  });

  past?.forEach((item) => {
    const carga = item.VLPesoCargaBruta || 0;
    const mes = Number(item.Mes);
    const mesIndex = mes - 1;

    if (processedData[mesIndex]) {
      processedData[mesIndex].past += carga;
    }
  });

  return processedData.map((item) => {
    const variation =
      item.past > 0 ? ((item.current - item.past) / item.past) * 100 : 0;

    return {
      mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
        month: "short",
      }),
      current: item.current.toFixed(2),
      past: item.past.toFixed(2),
      variation: +variation.toFixed(2),
    };
  });
};
