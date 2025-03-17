import Card from "@/components/@global/cards/Card";

const PibAtual = ({
  data,
  title = `Variação Mensal`,
  year,
  color,
  capital,
}: any) => {

  const chartData = data.current.flat().reduce((acc: number, item: any) => { 
    return acc + item['Produto Interno Bruto,  a preços correntes (R$ 1.000)'] 
}, 0)

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

export default PibAtual;
