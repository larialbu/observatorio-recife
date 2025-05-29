import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { monthToNumber } from "@/utils/formatters/@global/monthToNumber";

const SalarioMedioComparativo = ({
  data,
  title = `salário médio`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
  const dataCompare = data['current'][compare]
  const dataToCompare = data['current'][toCompare]

  const dataAll = []

  for (const key in dataToCompare) {
    dataAll.push({ label: key, order: monthToNumber(key) })
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

export default SalarioMedioComparativo;
