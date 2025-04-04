import Card from "@/components/@global/cards/Card";

const TotalDesligamentos = ({
  data,
  date,
  title = `Desligamentos de empregos formais no ano`,
  local = '',
  year,
  color,
}: any) => {

  const chartData = data.noAtiv.length

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

export default TotalDesligamentos;
