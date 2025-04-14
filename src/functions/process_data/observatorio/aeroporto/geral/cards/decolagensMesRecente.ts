import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processDecolagensMes = (
    data: AnacGeralData,
    year: string,
    aeroportoNome?: string,
    months?: [number] | [number, number]
  ) => {
    if (months) {
      months.forEach((month) => {
        if (month < 1 || month > 12) {
          throw new Error("Mês inválido. O mês deve estar entre 1 e 12.");
        }
      });
    }
  
    let decolagensMes = 0;
  
    if (months && months.length === 1) {
      const month = months[0];
      decolagensMes = data.reduce((total: number, item: AnacGeralHeaders) => {
        if (
          (!aeroportoNome || item["AEROPORTO NOME"] === aeroportoNome) &&
          item["MÊS"] === month
        ) {
          const decolagens = item["DECOLAGENS"] || 0;
          return total + decolagens;
        }
        return total;
      }, 0);
  
      return {
        mes: new Date(0, month - 1).toLocaleString("pt-BR", { month: "long" }),
        decolagens: decolagensMes,
      };
    } else if (months && months.length === 2) {
      const [startMonth, endMonth] = months;
      decolagensMes = data.reduce((total: number, item: AnacGeralHeaders) => {
        const mesAtual = item["MÊS"];
        if (
          (!aeroportoNome || item["AEROPORTO NOME"] === aeroportoNome) &&
          mesAtual >= startMonth &&
          mesAtual <= endMonth
        ) {
          const decolagens = item["DECOLAGENS"] || 0;
          return total + decolagens;
        }
        return total;
      }, 0);
  
      return {
        intervalo: `${new Date(0, startMonth - 1).toLocaleString("pt-BR", {
          month: "long",
        })} - ${new Date(0, endMonth - 1).toLocaleString("pt-BR", {
          month: "long",
        })}`,
        decolagens: decolagensMes,
      };
    } else {
      decolagensMes = data.reduce((total: number, item: AnacGeralHeaders) => {
        if (!aeroportoNome || item["AEROPORTO NOME"] === aeroportoNome) {
          const decolagens = item["DECOLAGENS"] || 0;
          return total + decolagens;
        }
        return total;
      }, 0);
  
      return {
        ano: year,
        decolagens: decolagensMes,
      };
    }
  };
  