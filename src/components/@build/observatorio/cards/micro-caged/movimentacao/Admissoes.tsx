import Card from "@/components/@global/cards/Card";

const Admissoes = ({
  data,
  date,
  title = `Admissões`,
  local = '',
  year,
  color,
}: any) => {

  const chartData = data?.['saldomovimentação']?.['Admitidos']

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

export default Admissoes;
