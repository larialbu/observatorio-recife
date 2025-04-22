import Card from "@/components/@global/cards/Card";

const SaldoGeral = ({
  data,
  date,
  title = `Saldo`,
  local = '',
  year,
  color,
}: any) => {
 
  const chartData = data['municipios'].reduce((acc: number, obj: any) => acc += obj['Saldos'] , 0)

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

export default SaldoGeral;
