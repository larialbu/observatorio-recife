import Card from "@/components/@global/cards/Card";

const Desligamentos = ({
  data,
  date,
  title = `Desligamentos`,
  local = '',
  year,
  color,
}: any) => {

  const chartData = data?.['saldomovimentação']?.['Demitidos'] || 0


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

export default Desligamentos;
