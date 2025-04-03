import Card from "@/components/@global/cards/Card";

const RemuneracaoMaior = ({
  data,
  date,
  title = `Maior remuneração`,
  local = '',
  year,
  color,
}: any) => {
 
  const chartData = data.remuneracaoMax

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

export default RemuneracaoMaior;
