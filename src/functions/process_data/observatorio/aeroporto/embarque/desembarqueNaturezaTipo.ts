import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export function processDesembarqueNaturezaTipo(
  data: AnacGeralHeaders[],
  aeroportosNomes: string[],
  natureza: "Doméstica" | "Internacional",
  tipoDado: "passageiros" | "cargas" | "decolagens",
  mes?: number // Parâmetro opcional para filtrar pelo número do mês
): { uf: string; total: number }[] {
  // Criação de um mapa para agregar os totais
  const disembarkationMap: Record<string, number> = {};

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
      item.TIPO === "Desembarque" &&
      item.NATUREZA === natureza &&
      aeroportosNomes.includes(item["AEROPORTO NOME"]) &&
      (mes === undefined || itemMes === mes) // Filtrar pelo mês se fornecido
    ) {
      const key =
        natureza === "Doméstica" ? item["UF Origem"] : item["País Origem"];

      // Incrementar o total para a chave apropriada
      if (disembarkationMap[key]) {
        disembarkationMap[key] += item[dataField];
      } else {
        disembarkationMap[key] = item[dataField];
      }
    }
  });

  // Converter o mapa em um array no formato solicitado e ordenar de forma decrescente pelo total
  return Object.entries(disembarkationMap)
    .map(([uf, total]) => ({
      uf,
      total,
    }))
    .sort((a, b) => b.total - a.total);
}
