const parsePIB = (pib: any): number => {
    // Converte o PIB para número, caso seja nulo ou inválido, retorna 0
    const parsed = parseFloat(pib || "0");
    return isNaN(parsed) ? 0 : parsed;
  };
  
  export const processPIBvariacao = (data: any[]) => {
    // Inicializa um objeto para armazenar o PIB por ano
    const processedData: { [key: number]: number } = {};
  
    // Percorre os dados e soma o PIB para cada ano
    data.forEach((item) => {
      const pib = parsePIB(item["Produto Interno Bruto,  a preços correntes (R$ 1.000)"]);
      const ano = item["Ano"];
  
      if (processedData[ano]) {
        processedData[ano] += pib; // Soma o PIB ao valor já acumulado para o ano
      } else {
        processedData[ano] = pib; // Se não tiver valor para o ano, inicializa com o PIB
      }
    });
  
    // Cria um array com o PIB e a variação entre os anos
    const anos = Object.keys(processedData).map((ano) => parseInt(ano, 10));
    const pibComVariação = [];
  
    // Calcula a variação em relação ao ano anterior
    for (let i = 0; i < anos.length; i++) {
      const anoAtual = anos[i];
      const pibAtual = processedData[anoAtual];
  
      let pibAnterior = 0;
      let variacao = 0;
  
      if (i > 0) {  // Se houver um ano anterior
        const anoAnterior = anos[i - 1];
        pibAnterior = processedData[anoAnterior];
        variacao = ((pibAtual - pibAnterior) / pibAnterior) * 100;
      }
  
      // Adiciona o objeto com os valores de ano, atual, passado e variação
      pibComVariação.push({
        ano: anoAtual,
        atual: pibAtual,
        passado: pibAnterior,
        variacao: variacao,
      });
    }
  
    return pibComVariação;
  };
  