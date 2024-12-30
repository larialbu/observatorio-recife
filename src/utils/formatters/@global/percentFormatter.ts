// Formate aqui diferentes tipos de cálculos em porcentagem e outras demonstrações

// Adicione novas conforme necessário.



export const formatPercentage = (value: number): string => {
    return `${(value * 100).toFixed(2)}%`;
};

// formatPercentage(0.56); --> "56,00%"
  