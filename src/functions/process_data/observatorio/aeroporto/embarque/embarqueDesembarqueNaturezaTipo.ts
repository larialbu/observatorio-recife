export function embarqueDesembarqueNatureTipo(
  data: any[],
  aeroportosNomes: string[] = [], // Definir o valor padrão como array vazio
  natureza: "Doméstica" | "Internacional",
  tipoDado: "passageiros" | "cargas" | "decolagens",
  operacao: "Embarque" | "Desembarque",
  mes?: number // Parâmetro opcional para filtrar pelo número do mês
): { uf: string; total: number }[] {
  // Criação de um mapa para agregar os totais
  const operationMap: Record<string, number> = {};

  // Definir o campo a ser somado com base no tipoDado
  const dataField =
    tipoDado === "passageiros"
      ? "PASSAGEIRO"
      : tipoDado === "cargas"
      ? "CARGA"
      : "DECOLAGENS";

  // Definir o tipo de operação com base no parâmetro "operacao"
  const tipoOperacao = operacao === "Embarque" ? "Embarque" : "Desembarque";
  const chaveDestinoOrigem = operacao === "Embarque" ? "UF Destino" : "UF Origem";
  const chavePaisDestinoOrigem = operacao === "Embarque" ? "País Destino" : "País Origem";

  // Filtrar dados com base na natureza, nos nomes dos aeroportos e opcionalmente pelo mês
  data.forEach((entry) => {
    const entryMes = parseInt(entry.MÊS, 10);

    // Verificar se o item deve ser incluído com base nos filtros
    if (
      entry.TIPO === tipoOperacao &&
      entry.NATUREZA === natureza &&
      (aeroportosNomes.length === 0 || aeroportosNomes.includes(entry["AEROPORTO NOME"])) && // Verificação se o array está vazio
      (mes === undefined || entryMes === mes) // Filtrar pelo mês se fornecido
    ) {
      const key =
        natureza === "Doméstica" ? entry[chaveDestinoOrigem] : entry[chavePaisDestinoOrigem];

      // Incrementar o total para a chave apropriada
      if (operationMap[key]) {
        operationMap[key] += parseInt(entry[dataField], 10);
      } else {
        operationMap[key] = parseInt(entry[dataField], 10);
      }
    }
  });

  // Converter o mapa em um array no formato solicitado e ordenar de forma decrescente pelo total
  return Object.entries(operationMap)
    .map(([uf, total]) => ({
      uf,
      total,
    }))
    .sort((a, b) => b.total - a.total);
}
