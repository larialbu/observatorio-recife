import Card from "@/components/@global/cards/Card";

const TotalPassageirosPorto = ({
  data,
  date,
  title = `Total Passageiros`,
  local,
  year,
  color,
}: any) => {
  const chartData = data.current || 0

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
