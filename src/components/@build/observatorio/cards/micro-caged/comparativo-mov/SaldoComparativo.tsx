import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { monthToNumber } from "@/utils/formatters/@global/monthToNumber";

const SaldoComparativo = ({
  data,
  title = `Saldo`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
  const dataCompareDemitidos = data[compare]['demitidos']
  const dataToCompareDemitidos = data[toCompare]['demitidos']
  const dataCompareAdmitidos = data[compare]['admitidos']
  const dataToCompareAdmitidos = data[toCompare]['admitidos']

  const dataAll = []

  for (const key in dataToCompareDemitidos) {
    dataAll.push({ label: key, value: dataCompareDemitidos[key], order: monthToNumber(key) })
  }

  const dataMonthKey = dataAll.sort((a, b) => b.order - a.order)[0].label

  const chartData = dataCompareAdmitidos[dataMonthKey] - dataCompareDemitidos[dataMonthKey] 

  const chartData2 = dataToCompareAdmitidos[dataMonthKey] - dataToCompareDemitidos[dataMonthKey]

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

export default SaldoComparativo;
