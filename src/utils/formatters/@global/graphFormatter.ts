export const tooltipFormatter = (value: any, suffix: string = "", prefix: string = "") => {
  if (value === undefined || value === null || isNaN(value)) {
    return `${prefix}0${suffix}`;
  }

  const number = Number(value);
  const isInteger = Number.isInteger(number);

  const formattedValue = number.toLocaleString("pt-BR", {
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: isInteger ? 0 : 2,
  });

  return `${prefix}${formattedValue}${suffix}`;
};

  
  export const yAxisFormatter = (value: any) => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
 