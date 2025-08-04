import Card from "@/components/@global/cards/Card";

const ItbiMenorAvaliacao = ({
  data,
  date,
  title = `Menor Avaliação do ITBI`,
  local = '',
  year,
  color,
}: any) => {
  const dataTributos = data?.['tributos'] || []

  const chartData = dataTributos?.[0]?.['valor_avaliacao'] || 0

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

export default ItbiMenorAvaliacao;
