export const getFiltredData = (rawData: any, portos: any) => {

    if (!rawData || !rawData['atracacao'] || !rawData['carga']) {
      return []
    }
  
    // Filtra atracações pelos portos selecionados
    const filtredAtracacao = rawData['atracacao'].filter((item: any) =>
      portos.includes(item['Porto Atracação']),
    )
  
    const atracacaoIds = new Set(filtredAtracacao.map((atracacao: any) => atracacao.IDAtracacao));
  
    const filtredCarga = rawData['carga'].filter((item: any) => atracacaoIds.has(item.IDAtracacao));
  
    // Organiza os dados por porto
    const dadosPorPorto = portos.map((porto: any) => {
      const atracacoes = filtredAtracacao.filter(
        (atracacao: any) => atracacao['Porto Atracação'] === porto,
      )
  
      // Filtra cargas associadas às atracações desse porto
  
      // a mudanca tem q ser aki nos não poemos fazer essa correlçaão pois os alguns tem ids diferentes atracacao.IDAtracacao === carga.IDAtracacao,, por isso precisamos que a correlação tem q ser com o o codigo CDTUP caso o ocdigo do porto está na origem ou destino da carga, a carga possui a este porto, 
  
  
      const cargas = filtredCarga.filter((carga: any) =>
        atracacoes.some(
          (atracacao: any) => atracacao.IDAtracacao === carga.IDAtracacao,
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