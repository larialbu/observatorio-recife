import { ProcessedDataPib } from "@/@types/observatorio/pib/ProcessedDataPib";
import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { processPassageirosMes } from "@/functions/process_data/observatorio/aeroporto/geral/cards/passageirosMesRecente";

const PibAtualComparativo = ({
  data,
  title = `PIB`,
  toCompare,
  comparative = `${toCompare} x Recife - PE`,
  year,
  color,
}: any) => {
    const base = 'Recife - PE'

    const objectsToRead = data.current.filter((municipio: ProcessedDataPib) => municipio["Município - UF"] === toCompare || base)

    const compareValue = objectsToRead.find((municipio: ProcessedDataPib) => municipio["Município - UF"] === toCompare)['Produto Interno Bruto,  a preços correntes (R$ 1.000)']
    const baseValue = objectsToRead.find((municipio: ProcessedDataPib) => municipio["Município - UF"] === base)['Produto Interno Bruto,  a preços correntes (R$ 1.000)']

    const chartData = baseValue 

    const chartData2 = compareValue

  return (
    <ComparativeCard
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
      data2={chartData2}
      comparative={comparative}
    />
  );
};

export default PibAtualComparativo;
