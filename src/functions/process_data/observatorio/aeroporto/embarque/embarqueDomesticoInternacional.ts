import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export function processEmbarqueDomesticoInternacional(
  data: AnacGeralData,
  tipoDado: "passageiros" | "cargas" | "decolagens",
  aeroportosNomes: string[] = [],
  operacao: "Embarque" | "Desembarque" = "Embarque",
  mes?: number
): { natureza: string; total: number }[] {
  // Reduz os dados e soma de acordo com a natureza e tipoDado
  const processarDados = (data: AnacGeralHeaders[]) => {
    return data.reduce(
      (acc: Record<string, { natureza: string; total: number }>, item) => {
        const natureza = item["NATUREZA"] || "Indefinida";

        const campo =
          tipoDado === "passageiros"
            ? "PASSAGEIRO"
            : tipoDado === "cargas"
            ? "CARGA"
            : "DECOLAGENS";

        const valor = parseFloat((item[campo] || "0").toString());

        if (!acc[natureza]) {
          acc[natureza] = { natureza, total: 0 };
        }

        acc[natureza].total += valor;
        return acc;
      },
      {}
    );
  };

  // Filtros
  const filtrarDados = (item: AnacGeralHeaders) => {
    return (
      (aeroportosNomes.length === 0 ||
        aeroportosNomes.includes(item["AEROPORTO NOME"])) &&
      item.TIPO === operacao &&
      item.NATUREZA &&
      (mes === undefined || item.MÊS === mes)
    );
  };

  // Filtra por natureza
  const dadosDomestico = data.filter(
    (item: AnacGeralHeaders) =>
      item.NATUREZA === "Doméstica" && filtrarDados(item)
  );

  const dadosInternacional = data.filter(
    (item: AnacGeralHeaders) =>
      item.NATUREZA === "Internacional" && filtrarDados(item)
  );

  // Processa separadamente
  const processadoDomestico = processarDados(dadosDomestico);
  const processadoInternacional = processarDados(dadosInternacional);

  // Monta resultado
  const resultado = [
    ...Object.values(processadoDomestico).map((item) => ({
      natureza: "Doméstica",
      total: item.total,
    })),
    ...Object.values(processadoInternacional).map((item) => ({
      natureza: "Internacional",
      total: item.total,
    })),
  ];

  // Ordena decrescente
  return resultado.sort((a, b) => b.total - a.total);
}
