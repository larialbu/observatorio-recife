export function embarqueNaturezaTipo(
  data: any[],
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
  data.forEach((entry) => {
    const entryMes = parseInt(entry.MÊS, 10);

    if (
      entry.TIPO === "Embarque" &&
      entry.NATUREZA === natureza &&
      aeroportosNomes.includes(entry["AEROPORTO NOME"]) &&
      (mes === undefined || entryMes === mes) // Filtrar pelo mês se fornecido
    ) {
      const key =
        natureza === "Doméstica" ? entry["UF Destino"] : entry["País Destino"];

      // Incrementar o total para a chave apropriada
      if (embarkationMap[key]) {
        embarkationMap[key] += parseInt(entry[dataField], 10);
      } else {
        embarkationMap[key] = parseInt(entry[dataField], 10);
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
