import Card from "@/components/@global/cards/Card";

const SaldoMedio = ({
  data,
  date,
  title = `Saldo Médio`,
  local = '',
  year,
  color,
}: any) => {
 
  const chartData = (data['municipios']?.reduce((acc: number, obj: any) => acc += obj['Saldos'] , 0) / data?.['municipios']?.length || 0) || 0

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

export default SaldoMedio;
