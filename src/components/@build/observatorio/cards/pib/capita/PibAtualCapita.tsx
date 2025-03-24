import Card from "@/components/@global/cards/Card";

const PibAtualCapita = ({
  data,
  title = `PIB Per Capita`,
  year,
  color,
  capital,
}: any) => {

  const chartData = data.current.flat().reduce((acc: number, item: any) => { 
    return acc + item["Produto Interno Bruto per capita,  a preços correntes (R$ 1,00)"] 
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

export default PibAtualCapita;
