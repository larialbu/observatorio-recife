import Card from "@/components/@global/cards/Card";

const Saldo = ({
  data,
  date,
  title = `Saldo`,
  local = '',
  year,
  color,
}: any) => {

  const dataMovimentacao = data['saldomovimentação']

  const chartData = dataMovimentacao['Admitidos'] - dataMovimentacao['Demitidos']

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

export default Saldo;
