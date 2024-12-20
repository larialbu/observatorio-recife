// Formatar diversos cálculos em que números são utilizados
// Preferência para pt-BR

export const formatNumber = (
  value: number,
  decimals: number = 2,
  locale: string = "pt-BR"
): string => {
  return value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const parseNumber = (value: string): number => {
  return parseFloat(value.replace(/\./g, "").replace(",", "."));
};

export const formatNormalnumber = (val: number) => {
  return Math.round(val).toLocaleString()
}