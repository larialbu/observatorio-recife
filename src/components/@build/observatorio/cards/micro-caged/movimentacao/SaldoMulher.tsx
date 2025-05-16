import Card from "@/components/@global/cards/Card";

const SaldoMulher = ({
  data,
  date,
  title = `Saldo Mulher`,
  local = '',
  year,
  color,
}: any) => {

  const dataMovimentacao = data?.['saldoMulher']?.['saldomovimentação']

  const chartData = dataMovimentacao?.['Admitidos'] - dataMovimentacao?.['Demitidos']

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

export default SaldoMulher;
