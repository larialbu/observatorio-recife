// Aqui você deve tratar os tipos diferentes de data.
// As vezes a data pode vir definida como 'jan./24' ou 'janeiro/2024' e etc..
// Atente-se para a função e seus casos de uso


// Para saídas em ano e mês separados:
export const formatSlicedYearMonth = (year: string, month: string, locale: string = "pt-BR"): string => {
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString(locale, { year: "numeric", month: "long" });
};

// formatSlicedYearMonth("2023", "1"); // "janeiro de 2023"
// formatSlicedYearMonth(teste["ANO"], teste["MÊS"]); // "janeiro de 2023"
  