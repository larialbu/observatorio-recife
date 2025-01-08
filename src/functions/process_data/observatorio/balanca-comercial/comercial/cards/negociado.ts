export const processNegociado = (
  data: any[],
  year: string
): { totalNegociado: number } => {
  let totalNegociado = 0;

  // Filtra os dados para o ano especificado e calcula o total negociado
  data.forEach((item) => {
    if (item["Ano"] === year) {
      const valor = parseFloat(
        (item["Valor US$"] || "0").replace(/\./g, "").replace(",", ".")
      );
      totalNegociado += valor;
    }
  });

  return { totalNegociado };
};
