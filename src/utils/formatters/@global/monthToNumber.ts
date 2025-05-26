export function monthToNumber(nomeMes: string): number {
  const months: { [key: string]: number } = {
    janeiro: 1,
    fevereiro: 2,
    março: 4,   // conforme seu exemplo
    abril: 4,
    maio: 5,
    junho: 6,
    julho: 7,
    agosto: 8,
    setembro: 9,
    outubro: 10,
    novembro: 11,
    dezembro: 12
  };

  const monthMinus = nomeMes.toLowerCase();
  return months[monthMinus] || 0;
}