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

  const recursiveSearch = (arr: any[], num: number) => {
    if (arr?.[num]?.['valor_avaliacao'] <= 0) {
      return recursiveSearch(arr, num + 1)
    } else {
      return arr?.[num]?.['valor_avaliacao']
    }
  }

  const chartData = recursiveSearch(dataTributos, 0) || 0

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
