import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processPassageirosMes = (
  data: AnacGeralData,
  year: string,
  airportName?: string,
  months?: [number] | [number, number]
) => {
  if (months) {
    months.forEach((month) => {
      if (month < 1 || month > 12) {
        throw new Error("Mês inválido. O mês deve estar entre 1 e 12.");
      }
    });
  }

  let passageirosMes = 0;

  if (months && months.length === 1) {
    const month = months[0];

    passageirosMes = data.reduce((total: number, item: AnacGeralHeaders) => {
      if ( (!airportName || item["AEROPORTO NOME"] === airportName) && item["MÊS"] === month ) {
        const passageiros = item["PASSAGEIRO"] || 0;
        return total + passageiros;
      }
      return total;
    }, 0);

    return {
      mes: new Date(0, month - 1).toLocaleString("pt-BR", { month: "long" }),
      passageiros: passageirosMes,
    };
  } else if (months && months.length === 2) {
    const [startMonth, endMonth] = months;

    passageirosMes = data.reduce((total: number, item: AnacGeralHeaders) => {
      const mesAtual = item["MÊS"];
      if (
        (!airportName || item["AEROPORTO NOME"] === airportName) &&
        mesAtual >= startMonth &&
        mesAtual <= endMonth
      ) {
        const passageiros = item["PASSAGEIRO"] || 0;
        return total + passageiros;
      }
      return total;
    }, 0);

    return {
      intervalo: `${new Date(0, startMonth - 1).toLocaleString("pt-BR", {
        month: "long",
      })} - ${new Date(0, endMonth - 1).toLocaleString("pt-BR", {
        month: "long",
      })}`,
      passageiros: passageirosMes,
    };
  } else {
    passageirosMes = data.reduce((total: number, item: AnacGeralHeaders) => {
      if (!airportName || item["AEROPORTO NOME"] === airportName) {
        const passageiros = item["PASSAGEIRO"] || 0;
        return total + passageiros;
      }
      return total;
    }, 0);

    return {
      ano: year,
      passageiros: passageirosMes,
    };
  }
};
