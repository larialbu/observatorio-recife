import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { processPassageirosMes } from "@/functions/process_data/observatorio/aeroporto/cards/passageirosMesRecente";

const PassageirosCardComparativo = ({
  data,
  title = `Passageiros`,
  local,
  toCompare,
  comparative = `${toCompare} x Recife`,
  year,
  color,
}: any) => {
  console.log('toCompare', toCompare)
  const chartData = processPassageirosMes(data, year, "RECIFE");

  const chartData2 = processPassageirosMes(data, year, toCompare);
  return (
    <ComparativeCard
      title={`${title}`}
      data={chartData.passageiros}
      year={year}
      color={color}
      data2={chartData2.passageiros}
      comparative={comparative}
    />
  );
};

export default PassageirosCardComparativo;
