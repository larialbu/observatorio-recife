export function comparativeDomesticoInternacional(
  data: any[],
  tipoDado: "passageiros" | "cargas" | "decolagens",
  aeroportosNomes: string[] = [], // Filtro para nomes de aeroportos
  operacao: "Embarque" | "Desembarque" = "Embarque", // Filtro para operação
  mes?: number // Filtro opcional para o mês
): { natureza: string; total: number }[] {
  // Função para reduzir os dados e somar de acordo com a natureza e tipoDado
  const processarDados = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
      const natureza = item["NATUREZA"] || "Indefinida";

      // Definir o campo a ser somado com base no tipoDado
      const campo = tipoDado === "passageiros"
        ? "PASSAGEIRO"
        : tipoDado === "cargas"
        ? "CARGA"
        : "DECOLAGENS";

      const valor = parseFloat(
        (item[campo] || "0").toString()
      );

      if (!acc[natureza]) {
        acc[natureza] = { natureza, total: 0 };
      }

      acc[natureza].total += valor;

      return acc;
    }, {});
  };

  // Função para verificar se o item atende aos filtros
  const filtrarDados = (item: any) => {
    const entryMes = parseInt(item.MÊS, 10);

    // Filtros: operação, natureza, nome do aeroporto, e opcionalmente mês
    return (
      // Se aeroportosNomes estiver vazio, o filtro de aeroporto é ignorado
      (aeroportosNomes.length === 0 || aeroportosNomes.includes(item["AEROPORTO NOME"])) &&
      item.TIPO === operacao &&
      item.NATUREZA &&
      (mes === undefined || entryMes === mes)
    );
  };

  // Filtra os dados para Doméstica e Internacional
  const dadosDomestico = data.filter(
    item => item.NATUREZA === "Doméstica" && filtrarDados(item)
  );
  const dadosInternacional = data.filter(
    item => item.NATUREZA === "Internacional" && filtrarDados(item)
  );

  // Processa os dados de cada tipo
  const processadoDomestico = processarDados(dadosDomestico);
  const processadoInternacional = processarDados(dadosInternacional);

  // Combina os resultados e retorna como comparação
  const resultado = [
    ...(Object.values(processadoDomestico).map((item: any) => ({ natureza: "Doméstica", total: item.total }))),
    ...(Object.values(processadoInternacional).map((item: any) => ({ natureza: "Internacional", total: item.total })))
  ];

  // Ordena o resultado de forma decrescente
  return resultado.sort((a, b) => b.total - a.total);
}
