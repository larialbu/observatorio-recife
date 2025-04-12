// Formate aqui diferentes tipos de cálculos em porcentagem e outras demonstrações

// Adicione novas conforme necessário.



export const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
};

// formatPercentage(0.56); --> "56,00%"

export const percentFormatter = (val: number) => {
    let percent;

    if (Math.round(val * 100) / 100 != 0) {
      percent = Math.round(val * 100) / 100;
    } else if (
      Math.round(val * 100) / 100 == 0 &&
      Math.round(val * 1000) / 1000 != 0
    ) {
      percent = Math.round(val * 1000) / 1000;
    } else if (
      Math.round(val * 1000) / 1000 == 0 &&
      Math.round(val * 10000) / 10000 != 0
    ) {
      percent = Math.round(val * 10000) / 10000;
    } else if (
      Math.round(val * 10000) / 10000 == 0 &&
      Math.round(val * 100000) / 100000 != 0
    ) {
      percent = Math.round(val * 100000) / 100000;
    } else if (
      Math.round(val * 100000) / 100000 == 0 &&
      Math.round(val * 100000) / 100000 != 0
    ) {
      percent = Math.round(val * 1000000) / 1000000;
    }

    return percent;
  }
 