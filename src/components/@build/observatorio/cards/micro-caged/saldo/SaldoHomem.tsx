import Card from "@/components/@global/cards/Card";

const SaldoHomem = ({
  data,
  date,
  title = `Saldo Homem`,
  local = '',
  year,
  color,
}: any) => {

  const dataMovimentacao = data?.['saldoHomem']?.['saldomovimentação']

  const chartData = dataMovimentacao?.['Admitidos'] - dataMovimentacao?.['Demitidos'] || 0

  return (
    <Card
      local={local}
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
    />
  );
};

export default SaldoHomem;
