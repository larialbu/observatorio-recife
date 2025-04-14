import { AenaPassageirosData } from "@/@types/observatorio/@data/aeroportoData";
import { AenaPassageirosHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processPassageirosPorClassificacao = (
  data: AenaPassageirosData
  ) => {
    // Reduz os dados por classificação de viagem
    return data.reduce((acc: { [classificacao: string]: {classificacao: string, total: number}}, item: AenaPassageirosHeaders) => {
      const classificacao = item["Classificacao da Viagem"] || "Indefinida";
      
      const passageiros = item["Passageiros"] || 0
  
      if (!acc[classificacao]) {
        acc[classificacao] = { classificacao, total: 0 };
      }
  
      acc[classificacao].total += passageiros;
  
      return acc;
    }, {});
  };
  
  export const preparePassageirosPorClassificacaoData = (data: AenaPassageirosData) => {
    const processed = processPassageirosPorClassificacao(data);
    
    // Retorna um array no formato desejado
    return Object.values(processed).map((item: any) => ({
      classificação: item.classificacao,
      total: item.total
    }));
  };
  