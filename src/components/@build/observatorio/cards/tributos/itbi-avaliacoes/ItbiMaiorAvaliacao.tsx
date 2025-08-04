import Card from "@/components/@global/cards/Card";

const ItbiMaiorAvaliacao = ({
  data,
  date,
  title = `Maior Avaliação do ITBI`,
  local = '',
  year,
  color,
}: any) => {
  const dataTributos = data?.['tributos'] || []

  const chartData = dataTributos?.[dataTributos.length - 1]?.['valor_avaliacao'] || 0

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

export default ItbiMaiorAvaliacao;
