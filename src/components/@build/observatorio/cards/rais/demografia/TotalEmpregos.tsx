import Card from "@/components/@global/cards/Card";

const TotalEmpregos = ({
  data,
  date,
  title = `Empregos formais no ano`,
  local = '',
  year,
  color,
}: any) => {

  const chartData = data.totalEmpregos

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

export default TotalEmpregos;
