import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

export const processRowsSh4ByMunicipio = (data: BalancaHeaders[], municipio: string, year: string, month?: number, country?: string) => {
  // Filtra os dados pelo município, ano, mês (se fornecido) e país (se fornecido)
  const filteredData = data.filter(item => 
    item["Município"] === municipio && 
    item["Ano"].toString() === year &&
    (!month || +item["Mês"] === month) &&  // Filtra pelo mês se ele for fornecido
    (!country || item["País"] === country)  // Filtra pelo país se o parâmetro 'country' for fornecido
  );
  
  // Agrega os dados por código SH4, separando os valores de Importação e Exportação
  const aggregatedData = filteredData.reduce((acc: { [codigoSH4: string]: {CODIGO_SH4: number, DESCRICAO_SH4: string, NEGOCIADO: number, IMPORTACAO: number, EXPORTACAO: number} }, item) => {
    const codigoSH4 = item["Codigo SH4"];
    const descricaoSH4 = item["Descrição SH4"];
    const tipo = item["tipo"];  // Importação ou Exportação

    // Inicializa o código SH4 no acumulador se não existir
    if (!acc[codigoSH4]) {
      acc[codigoSH4] = { 
        CODIGO_SH4: codigoSH4, 
        DESCRICAO_SH4: descricaoSH4, 
        NEGOCIADO: 0, 
        IMPORTACAO: 0, 
        EXPORTACAO: 0
      };
    }

    // Soma o valor negociado (Valor US$) para o código SH4
    const valor = Number(item["Valor US$"]) || 0;
    
    // Atualiza o total de acordo com o tipo de transação
    acc[codigoSH4].NEGOCIADO += valor;
    if (tipo === "Importação") {
      acc[codigoSH4].IMPORTACAO += valor;
    } else if (tipo === "Exportação") {
      acc[codigoSH4].EXPORTACAO += valor;
    }

    return acc;
  }, {});

  // Converte o objeto acumulado em um array
  const aggregatedArray = Object.values(aggregatedData);
  
  // Calcula o total negociado para o país (ou município, caso não seja fornecido um país)
  const totalNegociadoPais = aggregatedArray.reduce((total: number, item) => total + item.NEGOCIADO, 0);
  
  // Calcula a participação de cada código SH4 no total negociado do país (ou município)
  return aggregatedArray.map((item) => {
    const participacao = totalNegociadoPais > 0 ? (item.NEGOCIADO / totalNegociadoPais) * 100 : 0;

    return {
      PARTICIPAÇÃO: participacao,
      "CÓDIGO SH4": item.CODIGO_SH4,
      "DESCRIÇÃO SH4": item.DESCRICAO_SH4,
      NEGOCIADO: item.NEGOCIADO,
      IMPORTAÇÃO: item.IMPORTACAO,
      EXPORTAÇÃO: item.EXPORTACAO,
    };
  }).sort((a, b) => b.NEGOCIADO - a.NEGOCIADO);
};
