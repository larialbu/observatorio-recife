export const processCargasRankingAena = (
  data: { Aeroporto: string; Quantidade: number | string }[]
) => {
  // Tipando 'acc' como Record<string, number>
  const acc = data.reduce((acc: Record<string, number>, curr) => {
    if (!acc[curr.Aeroporto]) acc[curr.Aeroporto] = 0;

    acc[curr.Aeroporto] += Number(curr.Quantidade);

    return acc;
  }, {});

  return Object.entries(acc)
    .sort((a, b) => b[1] - a[1])
    .map(([aeroporto, _], i) => ({ aeroporto: aeroporto, position: i + 1 }));
};
