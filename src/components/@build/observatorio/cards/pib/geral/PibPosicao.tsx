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

  const chartData = itens.length

  return data.current.length > 1 ? (
   <p>dado inválido (vou arrmuar isso)</p>
  ) : (
    <Card
      local={capital}
      title={`${title}`}
      data={chartData} // vou colocar pra aparecer aki um dado invalido
      year={year}
      color={color}
      position={true}
    />
  );
};

export default PibPosicao;
