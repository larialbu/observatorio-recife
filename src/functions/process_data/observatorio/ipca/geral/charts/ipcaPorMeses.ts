import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";

export const processVariacaoMensal = (
  data: IpcaGeralHeaders[]
): { mes: string; [key: string]: number | string }[] => {
  // Filtra para remover o agregado "Brasil"
  const filteredData = data.filter((item) => item["Capital"] !== "Brasil");

  // Identifica todas as capitais únicas
  const categorias = Array.from(new Set(filteredData.map((item) => item["Capital"])));

  // Identifica todos os meses únicos presentes nos dados
  const meses = Array.from(new Set(filteredData.map((item) => item["MÊS"].toString()))).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  // Inicializa a estrutura base de saída com cada mês e todas as categorias zeradas
  const processedData = meses.map((mes) => {
    const result: { mes: string; [key: string]: number | string } = { mes };
    categorias.forEach((categoria) => {
      result[categoria] = 0;
    });
    return result;
  });

  // Popula a estrutura com as variações mensais de cada capital
  filteredData.forEach((item) => {
    const variacaoMensal = item["IPCA - Variação mensal"] || 0;
    const mes = item["MÊS"].toString();
    const categoria = item["Capital"];

    const mesIndex = meses.indexOf(mes);
    if (mesIndex !== -1) {
      processedData[mesIndex][categoria] =
        (processedData[mesIndex][categoria] as number) + variacaoMensal;
    }
  });

  // Formata o campo "mes" para exibir abreviações em português (jan, fev, mar, etc.)
  return processedData.map((item) => ({
    ...item,
    mes: new Date(0, parseInt(item.mes as string, 10) - 1).toLocaleString("pt-BR", {
      month: "short",
    }),
  }));
};
