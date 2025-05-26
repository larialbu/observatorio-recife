import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { monthToNumber } from "@/utils/formatters/@global/monthToNumber";

const AdmitidosComparativo = ({
  data,
  title = `Admitidos`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
  const dataCompare = data[compare]['admitidos']
  const dataToCompare = data[toCompare]['admitidos']

  const dataAll = []

  for (const key in dataToCompare) {
    dataAll.push({ label: key, value: dataCompare[key], month: monthToNumber(key) })
  }

  const dataMonthKey = dataAll.sort((a, b) => b.month - a.month)[0].label

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

export default AdmitidosComparativo;
