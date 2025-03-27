import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { processDecolagensMes } from "@/functions/process_data/observatorio/aeroporto/geral/cards/decolagensMesRecente";

const DecolagensCardComparativo = ({
  data,
  title = `Decolagens`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
  
}: any) => {

  const chartData = processDecolagensMes(data, year, compare);

  const chartData2 = processDecolagensMes(data, year, toCompare);
  return (
    <ComparativeCard
      title={`${title}`}
      data={chartData.decolagens}
      year={year}
      color={color}
      data2={chartData2.decolagens}
      compare={[toCompare, compare]}
      comparative={comparative}
    />
  );
};

export default DecolagensCardComparativo;
