import { RawDataPortos } from "@/@types/observatorio/@data/portoData";

export const getFilteredData = (rawData: RawDataPortos, portos: string[]) => {

    if (!rawData || !rawData['atracacao'] || !rawData['carga']) {
      return []
    }
  
    const filtredAtracacao = rawData['atracacao'].filter((item) =>
      portos.includes(item['Porto Atracação']),
    )
  
    const atracacaoIds = new Set(filtredAtracacao.map((atracacao) => atracacao.IDAtracacao));
  
    const filtredCarga = rawData['carga'].filter((item) => atracacaoIds.has(item.IDAtracacao));
  
    // Organiza os dados por porto
    const dadosPorPorto = portos.map((porto) => {
      const atracacoes = filtredAtracacao.filter(
        (atracacao) => atracacao['Porto Atracação'] === porto,
      )
  
      // Filtra cargas associadas às atracações desse porto
  
      // a mudanca tem q ser aki nos não poemos fazer essa correlçaão pois os alguns tem ids diferentes atracacao.IDAtracacao === carga.IDAtracacao,, por isso precisamos que a correlação tem q ser com o o codigo CDTUP caso o ocdigo do porto está na origem ou destino da carga, a carga possui a este porto, 
  
  
      const cargas = filtredCarga.filter((carga) =>
        atracacoes.some(
          (atracacao) => atracacao.IDAtracacao === carga.IDAtracacao,
        ),
      )
  
      return {
        porto,
        atracacao: atracacoes,
        cargas,
      }
    })
  
    return dadosPorPorto
  }

export function rearrangeArray<T>(arr: T[][]): T[] {
    const result: T[] = [];
    const maxLength = Math.max(...arr.map(subArr => subArr.length));

    for (let i = 0; i < maxLength; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j][i] !== undefined) {
                result.push(arr[j][i]);
            }
        }
    }

    return result;
}

