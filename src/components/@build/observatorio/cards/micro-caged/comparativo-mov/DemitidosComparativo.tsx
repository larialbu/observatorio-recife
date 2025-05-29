import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { monthToNumber } from "@/utils/formatters/@global/monthToNumber";

const DemitidosComparativo = ({
  data,
  title = `Demitidos`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
  const dataCompare = data[compare]['demitidos']
  const dataToCompare = data[toCompare]['demitidos']

  const dataAll = []

  for (const key in dataToCompare) {
    dataAll.push({ label: key, value: dataCompare[key], order: monthToNumber(key) })
  }

  const dataMonthKey = dataAll.sort((a, b) => b.order - a.order)[0].label

  const chartData = dataCompare[dataMonthKey] 

  const chartData2 = dataToCompare[dataMonthKey]

  return (
    <ComparativeCard
      title={`${title} (${dataMonthKey})`}
      data={chartData}
      year={year}
      color={color}
      data2={chartData2}
      comparative={comparative}
      compare={[toCompare, compare]}
    />
  );
};

export default DemitidosComparativo;
