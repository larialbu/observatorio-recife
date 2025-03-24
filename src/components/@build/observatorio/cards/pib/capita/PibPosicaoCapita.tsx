import Card from "@/components/@global/cards/Card";

const PibPosicaoCapita = ({
  data,
  title = `Posição nacional`,
  year,
  color,
  capital,
}: any) => {

  const total = data.current.flat().reduce((acc: number, item: any) => { 
    return acc + item["Produto Interno Bruto per capita,  a preços correntes (R$ 1,00)"] 
}, 0)

  const itens = data.rawDataCurrent.filter((item: any) => item["Produto Interno Bruto per capita,  a preços correntes (R$ 1,00)"] >= total)

  const chartData = itens.length

  return (
    <Card
      local={capital}
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
      position={true}
    />
  );
};

export default PibPosicaoCapita;
