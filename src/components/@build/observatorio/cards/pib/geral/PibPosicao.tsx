import Card from "@/components/@global/cards/Card";

const PibPosicao = ({
  data,
  title = `PIB posição nacional`,
  year,
  color,
  capital,
}: any) => {

  const total = data.current.flat().reduce((acc: number, item: any) => { 
    return acc + item['Produto Interno Bruto,  a preços correntes (R$ 1.000)'] 
}, 0)

  const chartData = data.rawDataCurrent.filter((item: any) => item['Produto Interno Bruto,  a preços correntes (R$ 1.000)'] >= total).length

  return (
    <Card
      local={capital}
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
    />
  );
};

export default PibPosicao;
