import Card from "@/components/@global/cards/Card";
import { capitaisHash } from "@/utils/hashs/capitaisHash";

const PibPosicaoNE = ({
  data,
  title = `Ranking PIB (NE)`,
  year,
  color,
  capital,
}: any) => {

  const region = data?.current?.[0]?.['Nome da Grande Região'] || ''
 
  const total = data.current.flat().reduce((acc: number, item: any) => { 
    return acc + item["Produto Interno Bruto,  a preços correntes (R$ 1.000)"] 
  }, 0)

  const itens = data.rawDataCurrent.filter((item: any) => (capitaisHash[item['Município - UF']] && item['Nome da Grande Região'] === 'Nordeste') && (item["Produto Interno Bruto,  a preços correntes (R$ 1.000)"] >= total))

  const chartData = itens.length

  return (
  <>
    {region === 'Nordeste' && (<Card
      local={capital}
      title={`${title}`} 
      data={chartData}
      year={year}
      color={color}
      position={true}
    />)
    }
  </>
  );
};

export default PibPosicaoNE;
