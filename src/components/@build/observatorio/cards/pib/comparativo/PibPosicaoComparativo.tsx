import { ProcessedDataPib } from "@/@types/observatorio/@fetch/pib/ProcessedDataPib";
import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { processPassageirosMes } from "@/functions/process_data/observatorio/aeroporto/geral/cards/passageirosMesRecente";

const PibPosicaoComparativo = ({
  data,
  title = `Posição nacional`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
    const base = compare

    const objectsToRead = data.current.filter((municipio: ProcessedDataPib) => municipio["Município - UF"] === toCompare || base)

    const compareValue = objectsToRead.find((municipio: ProcessedDataPib) => municipio["Município - UF"] === toCompare)['Produto Interno Bruto,  a preços correntes (R$ 1.000)']
    const baseValue = objectsToRead.find((municipio: ProcessedDataPib) => municipio["Município - UF"] === base)['Produto Interno Bruto,  a preços correntes (R$ 1.000)']

    const itensCompare = data.rawDataCurrent.filter((item: any) => item['Produto Interno Bruto,  a preços correntes (R$ 1.000)'] >= compareValue)
    const itensBase = data.rawDataCurrent.filter((item: any) => item['Produto Interno Bruto,  a preços correntes (R$ 1.000)'] >= baseValue)

    const chartData = itensBase.length;

    const chartData2 = itensCompare.length;

  return (
    <ComparativeCard
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
      data2={chartData2}
      comparative={comparative}
      compare={[toCompare, compare]}
    />
  );
};

export default PibPosicaoComparativo;
