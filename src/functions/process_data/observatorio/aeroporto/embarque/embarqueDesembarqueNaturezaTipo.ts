export function embarqueDesembarqueNaturezaTipo(
    data: any[],
    aeroportosNomes: string[],
    natureza: "Doméstica" | "Internacional",
    tipoDado: "passageiros" | "cargas" | "decolagens",
    mes?: number // Parâmetro opcional para filtrar pelo número do mês
  ): { uf: string; totalEmbarques: number; totalDesembarques: number }[] {
    // Criação de mapas para agregar os totais de embarques e desembarques
    const embarkationMap: Record<string, number> = {};
    const disembarkationMap: Record<string, number> = {};
  
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
        (entry.TIPO === "Embarque" || entry.TIPO === "Desembarque") &&
        entry.NATUREZA === natureza &&
        aeroportosNomes.includes(entry["AEROPORTO NOME"]) &&
        (mes === undefined || entryMes === mes) // Filtrar pelo mês se fornecido
      ) {
        const isEmbarque = entry.TIPO === "Embarque";
        const key =
          natureza === "Doméstica"
            ? (isEmbarque ? entry["UF Destino"] : entry["UF Origem"])
            : (isEmbarque ? entry["País Destino"] : entry["País Origem"]);
  
        const value = parseInt(entry[dataField], 10);
  
        if (isEmbarque) {
          if (embarkationMap[key]) {
            embarkationMap[key] += value;
          } else {
            embarkationMap[key] = value;
          }
        } else {
          if (disembarkationMap[key]) {
            disembarkationMap[key] += value;
          } else {
            disembarkationMap[key] = value;
          }
        }
      }
    });
  
    // Criar a junção dos dois mapas em um array
    const allKeys = new Set([...Object.keys(embarkationMap), ...Object.keys(disembarkationMap)]);
    const result: { uf: string; totalEmbarques: number; totalDesembarques: number }[] = [];
  
    allKeys.forEach((key) => {
      result.push({
        uf: key,
        totalEmbarques: embarkationMap[key] || 0,
        totalDesembarques: disembarkationMap[key] || 0,
      });
    });
  
    // Ordenar o resultado de forma decrescente primeiro pelo total de embarques e depois pelo total de desembarques
    return result.sort((a, b) => {
      const embarqueDiff = b.totalEmbarques - a.totalEmbarques;
      if (embarqueDiff !== 0) {
        return embarqueDiff; // Se houver diferença no total de embarques, ordena por embarque
      }
  
      // Se os embarques forem iguais, compara os desembarques
      return b.totalDesembarques - a.totalDesembarques;
    });
  }
  