import Card from "@/components/@global/cards/Card";
import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { monthLongName } from "@/utils/formatters/@global/monthLongName";

const EmpresasVariacaoAtivasClassesRecente = ({
  data,
  title = `Variação Mês anterior de Empresas Ativas`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
  const toCompareData = data[toCompare]['municipio']
  const compareData = data[compare]['municipio']
  
  const monthsDataToCompare = Object.keys(toCompareData['mes'])

  const curMonthData = monthsDataToCompare.sort(
    (a: any, b: any) => +b - +a,
  )?.[0]

  const pastMonthData = monthsDataToCompare.sort(
    (a: any, b: any) => +b - +a,
  )?.[1]

  const curMonthName = monthLongName(+pastMonthData)

  const chartData = (((compareData['mes'][curMonthData] - compareData['mes'][pastMonthData]) / compareData['mes'][pastMonthData]) * 100).toFixed(2) || 0
  
  const chartData2 = (((toCompareData['mes'][curMonthData] - toCompareData['mes'][pastMonthData]) / toCompareData['mes'][pastMonthData]) * 100).toFixed(2) || 0

  return (
    <>
      {pastMonthData &&
        <ComparativeCard
          title={`${title} (${curMonthName})`}
          data={chartData}
          year={year}
          color={color}
          data2={chartData2}
          comparative={comparative}
          compare={[toCompare, compare]}
        /> 
      }
    </>

  );
};

export default EmpresasVariacaoAtivasClassesRecente;
