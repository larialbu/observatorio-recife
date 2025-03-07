import Card from "@/components/@global/cards/Card";

const TotalPassageirosPortoAnterior = ({
  data,
  date,
  title = `Total Passageiros (ano anterior)`,
  local,
  year,
  color,
}: any) => {
  const chartData = data.past || 0

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

export default TotalPassageirosPortoAnterior;
