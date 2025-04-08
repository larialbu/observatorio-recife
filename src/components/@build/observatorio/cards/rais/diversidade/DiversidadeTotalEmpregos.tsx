import Card from "@/components/@global/cards/Card";

const DiversidadeTotalEmpregos = ({
  data,
  date,
  title = `Empregos formais no ano (necessidades especiais)`,
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

export default DiversidadeTotalEmpregos;