import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { processPassageirosMes } from "@/functions/process_data/observatorio/aeroporto/geral/cards/passageirosMesRecente";

const PassageirosCardComparativo = ({
  data,
  title = `Passageiros`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
  const chartData = processPassageirosMes(data, year, compare);

  const chartData2 = processPassageirosMes(data, year, toCompare);
  return (
    <ComparativeCard
      title={`${title}`}
      data={chartData.passageiros}
      year={year}
      color={color}
      data2={chartData2.passageiros}
      comparative={comparative}
      compare={[toCompare, compare]}
    />
  );
};

export default PassageirosCardComparativo;
