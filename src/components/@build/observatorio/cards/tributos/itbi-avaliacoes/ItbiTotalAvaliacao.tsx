import Card from "@/components/@global/cards/Card";

const ItbiTotalAvaliacao = ({
  data,
  date,
  title = `Total de Avaliações do ITBI`,
  local = '',
  year,
  color,
}: any) => {
  const dataTributos = data?.['tributos'] || []

  const chartData = dataTributos?.length || 0

  return (
    <Card
      local={local}
      title={title}
      data={chartData}
      year={year}
      color={color}
    />
  );
};

export default ItbiTotalAvaliacao;
