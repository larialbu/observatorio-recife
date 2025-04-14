import { ProcessedDataPib } from "@/@types/observatorio/@fetch/pib/ProcessedDataPib";
import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { processPassageirosMes } from "@/functions/process_data/observatorio/aeroporto/geral/cards/passageirosMesRecente";

const PibVariacaoComparativo = ({
  data,
  title = `Variação ao ano anterior`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
    const base = compare

    const objectsToReadCurrent = data.current.filter((municipio: ProcessedDataPib) => municipio["Município - UF"] === toCompare || base)
    const objectsToReadPast = data.past.filter((municipio: ProcessedDataPib) => municipio["Município - UF"] === toCompare || base)

    const baseValueCurrent = objectsToReadCurrent.find((municipio: ProcessedDataPib) => municipio["Município - UF"] === base)['Produto Interno Bruto,  a preços correntes (R$ 1.000)']
    const baseValuePast = objectsToReadPast.find((municipio: ProcessedDataPib) => municipio["Município - UF"] === base)['Produto Interno Bruto,  a preços correntes (R$ 1.000)']

    const compareValueCurrent = objectsToReadCurrent.find((municipio: ProcessedDataPib) => municipio["Município - UF"] === toCompare)['Produto Interno Bruto,  a preços correntes (R$ 1.000)']
    const compareValuePast = objectsToReadPast.find((municipio: ProcessedDataPib) => municipio["Município - UF"] === toCompare)['Produto Interno Bruto,  a preços correntes (R$ 1.000)']

    const chartData = ((baseValueCurrent - baseValuePast) / baseValuePast) * 100 

    const chartData2 = ((compareValueCurrent - compareValuePast) / compareValuePast) * 100

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

export default PibVariacaoComparativo;
