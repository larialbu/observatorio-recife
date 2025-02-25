import Card from "@/components/@global/cards/Card";

const TotalPassageirosPorto = ({
  data,
  date,
  title = `Movimentacão de cargas`,
  local,
  year,
  color,
}: any) => {
  const chartData = data.find((data: any) => data.acao === 'Total')?.totalPeso || 0

  return (
    <Card
      local={''}
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
    />
  );
};

export default TotalPassageirosPorto;
