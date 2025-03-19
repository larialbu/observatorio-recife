import Card from "@/components/@global/cards/Card";

const PibVariacaoCapita = ({
  data,
  title = `Variação ao ano anterior`,
  year,
  color,
  capital,
}: any) => {

  const current = data.current.flat().reduce((acc: number, item: any) => { 
    return acc + item["Produto Interno Bruto per capita,  a preços correntes (R$ 1,00)"] 
}, 0)

  const past = data.past.flat().reduce((acc: number, item: any) => { 
    return acc + item["Produto Interno Bruto per capita,  a preços correntes (R$ 1,00)"] 
}, 0)

  const chartData = ((current - past) / past) * 100

  return (
    <Card 
      local={capital}
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
      percent={true}
    />
  );
};

export default PibVariacaoCapita;
