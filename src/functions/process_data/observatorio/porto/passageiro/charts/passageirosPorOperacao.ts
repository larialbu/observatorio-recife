import { PortoPassageirosHeaders } from "@/@types/observatorio/@fetch/porto";

interface PassageirosOperacaoData {
  operacao: string;
  total: number;
}

export const processPassageirosPorOperacao = (
  data: PortoPassageirosHeaders[]
): Record<string, PassageirosOperacaoData> => {
  return data.reduce((acc, item) => {
    const operacao = item["Operação"] || "Indefinida";
    const passageiros = item["Passageiros"] || 0;

    if (!acc[operacao]) {
      acc[operacao] = { operacao, total: 0 };
    }

    acc[operacao].total += passageiros;
    return acc;
  }, {} as Record<string, PassageirosOperacaoData>);
};

export const preparePassageirosPorOperacaoData = (
  data: PortoPassageirosHeaders[]
): PassageirosOperacaoData[] => {
  const processed = processPassageirosPorOperacao(data);
  return Object.values(processed).map((item) => ({
    operacao: item.operacao,
    total: item.total
  }));
};
