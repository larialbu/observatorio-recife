import Card from "@/components/@global/cards/Card";

const RemuneracaoMedia = ({
  data,
  date,
  title = `Remuneração média nominal em dezembro`,
  local = '',
  year,
  color,
}: any) => {
 
  const chartData = data.remuneracaoMed

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

export default RemuneracaoMedia;
