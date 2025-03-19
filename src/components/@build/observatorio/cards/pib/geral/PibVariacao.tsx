import Card from "@/components/@global/cards/Card";

const PibVariacao = ({
  data,
  title = `Variação ao ano anterior`,
  year,
  color,
  capital,
}: any) => {

  const current = data.current.flat().reduce((acc: number, item: any) => { 
    return acc + item['Produto Interno Bruto,  a preços correntes (R$ 1.000)'] 
}, 0)

  const past = data.past.flat().reduce((acc: number, item: any) => { 
    return acc + item['Produto Interno Bruto,  a preços correntes (R$ 1.000)'] 
}, 0)

  const chartData = ((current - past) / past) * 100

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

export default PibVariacao;
