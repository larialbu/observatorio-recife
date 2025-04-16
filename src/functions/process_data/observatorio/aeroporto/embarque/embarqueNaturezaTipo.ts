import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export function processEmbarqueNaturezaTipo(
  data: AnacGeralHeaders[],
  aeroportosNomes: string[],
  natureza: "Doméstica" | "Internacional",
  tipoDado: "passageiros" | "cargas" | "decolagens",
  mes?: number // Parâmetro opcional para filtrar pelo número do mês
): { uf: string; total: number }[] {
  // Criação de um mapa para agregar os totais
  const embarkationMap: Record<string, number> = {};

  // Definir o campo a ser somado com base no tipoDado
  const dataField =
    tipoDado === "passageiros"
      ? "PASSAGEIRO"
      : tipoDado === "cargas"
      ? "CARGA"
      : "DECOLAGENS";

  // Filtrar dados com base na natureza, nos nomes dos aeroportos e opcionalmente pelo mês
  data.forEach((item: AnacGeralHeaders) => {
    const itemMes = item.MÊS;

    if (
      item.TIPO === "Embarque" &&
      item.NATUREZA === natureza &&
      aeroportosNomes.includes(item["AEROPORTO NOME"]) &&
      (mes === undefined || itemMes === mes) // Filtrar pelo mês se fornecido
    ) {
      const key =
        natureza === "Doméstica" ? item["UF Destino"] : item["País Destino"];

      // Incrementar o total para a chave apropriada
      if (embarkationMap[key]) {
        embarkationMap[key] += item[dataField];
      } else {
        embarkationMap[key] = item[dataField];
      }
    }
  });

  // Converter o mapa em um array no formato solicitado e ordenar de forma decrescente pelo total
  return Object.entries(embarkationMap)
    .map(([uf, total]) => ({
      uf,
      total,
    }))
    .sort((a, b) => b.total - a.total);
}
