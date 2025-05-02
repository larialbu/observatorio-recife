import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";

export const processVariacaoMensal = (data: IpcaGeralHeaders[]): { mes: string; [key: string]: number | string }[] => {

  const filteredData = data.filter(
    (item) => item["Capital"] !== "Brasil"
  );

  const categoriasSet = new Set<string>();
  filteredData.forEach((item) => {
    const categoriaNome = item["Capital"];
    categoriasSet.add(categoriaNome);
  });

  const categorias = Array.from(categoriasSet);

  const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const processedData = meses.map((mes) => {
    const result: { mes: string; [key: string]: number | string } = { mes };
    categorias.forEach((categoria) => {
      result[categoria] = 0;
    });
    return result;
  });

  filteredData.forEach((item) => {
    const variacaoMensal = item["IPCA - Variação mensal"] || 0;

    const mes = item["MÊS"].toString();
    const categoriaNome = item["Capital"];

    if (categorias.includes(categoriaNome)) {
      const mesIndex = parseInt(mes, 10) - 1;
      if (processedData[mesIndex]) {
        processedData[mesIndex][categoriaNome] =
          (processedData[mesIndex][categoriaNome] as number) + variacaoMensal;
      }
    }
  });

  return processedData.map((item) => ({
    ...item,
    mes: new Date(0, parseInt(item.mes as string, 10) - 1).toLocaleString("pt-BR", {
      month: "short",
    }), // Formata para um formato tipo "jan", "fev", etc.
  }));
};
