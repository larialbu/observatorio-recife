import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processCargasMes = (
  data: AnacGeralData,
  year: string,
  aeroportoName?: string,
  months?: [number] | [number, number]
) => {
  if (months) {
    months.forEach((month) => {
      if (month < 1 || month > 12) {
        throw new Error("Mês inválido. O mês deve estar entre 1 e 12.");
      }
    });
  }

  let cargaMes = 0;

  if (months && months.length === 1) {
    const month = months[0];
    cargaMes = data.reduce((total: number, item: AnacGeralHeaders) => {
      if (
        (!aeroportoName || item["AEROPORTO NOME"] === aeroportoName) &&
        item["MÊS"] === month
      ) {
        const carga = item["CARGA"] || 0;
        return total + carga;
      }
      return total;
    }, 0);

    return {
      mes: new Date(0, month - 1).toLocaleString("pt-BR", { month: "long" }),
      carga: cargaMes,
    };
  } else if (months && months.length === 2) {
    const [startMonth, endMonth] = months;
    cargaMes = data.reduce((total: number, item: AnacGeralHeaders) => {
      const mesAtual = item["MÊS"];
      if (
        (!aeroportoName || item["AEROPORTO NOME"] === aeroportoName) &&
        mesAtual >= startMonth &&
        mesAtual <= endMonth
      ) {
        const carga = item["CARGA"] || 0;
        return total + carga;
      }
      return total;
    }, 0);

    return {
      intervalo: `${new Date(0, startMonth - 1).toLocaleString("pt-BR", {
        month: "long",
      })} - ${new Date(0, endMonth - 1).toLocaleString("pt-BR", {
        month: "long",
      })}`,
      carga: cargaMes,
    };
  } else {
    cargaMes = data.reduce((total: number, item: AnacGeralHeaders) => {
      if (!aeroportoName || item["AEROPORTO NOME"] === aeroportoName) {
        const carga = item["CARGA"] || 0;
        return total + carga;
      }
      return total;
    }, 0);

    return {
      ano: year,
      carga: cargaMes,
    };
  }
};
