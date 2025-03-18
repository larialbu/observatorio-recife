import Card from "@/components/@global/cards/Card";

const PibPosicao = ({
  data,
  title = `Posição nacional`,
  year,
  color,
  capital,
}: any) => {

  const total = data.current.flat().reduce((acc: number, item: any) => { 
    return acc + item['Produto Interno Bruto,  a preços correntes (R$ 1.000)'] 
}, 0)

  const itens = data.rawDataCurrent.filter((item: any) => item['Produto Interno Bruto,  a preços correntes (R$ 1.000)'] >= total)

  const itensFiltered = itens.filter((item: any) => !data.current.find((data: any) => data["Município - UF"] === item["Município - UF"]))

  const chartData = data.current.length === 1 ? itensFiltered.length : itens.length

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
