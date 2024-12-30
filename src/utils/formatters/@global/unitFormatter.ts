// Formatar unidades para atuarem em conjunto com quantidades
// Alguns dados vem separados em unidades e quantidades
// Essa formatação os une em uma String PT-BR

// Adicione outras formatações conforme necessidade.

export const formatUnit = (value: number, unit: string): string => {
    return `${value.toLocaleString("pt-BR")} ${unit}`;
};

//formatUnit(831, "kg"); --> "831 kg"
//formatUnit(2241, "litros"); --> "2.241 litros"
//formatUnit(teste["QUANTIDADE"], teste["UNIDADE"]); -->  "1.000 LITROS"
  