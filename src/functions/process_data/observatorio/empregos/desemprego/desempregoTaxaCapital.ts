type InputData = { Capital: string; Taxa: number };

type OutputData = { label: string; value: number };

export const processDesempregoTaxaCapital = <T extends InputData>(data: T[]): OutputData[] => {
  const objData = data.reduce<Record<string, number>>((acc, obj) => {
    if (!acc[obj.Capital]) {
      acc[obj.Capital] = 0;
    }

    acc[obj.Capital] += obj.Taxa;
    return acc;
  }, {});

  return Object.entries(objData)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
};
