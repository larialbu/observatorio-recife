import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { processDecolagensMes } from "@/functions/process_data/observatorio/aeroporto/cards/decolagensMesRecente";

const DecolagensCardComparativo = ({
  data,
  title = `Decolagens`,
  toCompare,
  comparative = `${toCompare} x Recife`,
  year,
  color,
  
}: any) => {

  const chartData = processDecolagensMes(data, year, "Recife");

  const chartData2 = processDecolagensMes(data, year, toCompare);
  return (
    <ComparativeCard
      title={`${title}`}
      data={chartData.decolagens}
      year={year}
      color={color}
      data2={chartData2.decolagens}
      comparative={comparative}
    />
  );
};

export default DecolagensCardComparativo;
