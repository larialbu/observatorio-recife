import Card from "@/components/@global/cards/Card";
import { monthLongName } from "@/utils/formatters/@global/monthLongName";

const ItbiVariacaoInativasRecente = ({
  data,
  date,
  title = `Variação Mês Anterior de Transmissões (mês)`,
  local = '',
  year,
  color,
}: any) => {
  const dataItbi = data?.['tributos']
  
  const monthsData = Object.keys(dataItbi?.['mes'] || {})

  const curMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  ) ?.[0]
  
  const pastMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  )?.[1]

  const curMonthName = monthLongName(+curMonthData)

  const chartData = (((dataItbi?.['mes']?.[curMonthData] - dataItbi?.['mes']?.[pastMonthData]) / dataItbi?.['mes']?.[pastMonthData]) * 100).toFixed(2)

  return (
    <>
      {pastMonthData && <Card
        local={local}
        title={`${title.replace('mês', curMonthName)}`}
        data={chartData}
        year={year}
        color={color}
        percent
      />}
    </>

  );
};

export default ItbiVariacaoInativasRecente;
