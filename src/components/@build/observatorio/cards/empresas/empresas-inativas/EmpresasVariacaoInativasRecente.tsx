import Card from "@/components/@global/cards/Card";
import { monthLongName } from "@/utils/formatters/@global/monthLongName";

const EmpresasVariacaoInativasRecente = ({
  data,
  date,
  title = `Variação Mês anterior de Empresas Inativas (mês)`,
  local = '',
  year,
  color,
}: any) => {

  const monthsData = Object.keys(data['mes'])

  const curMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  ) ?.[0]
  
  const pastMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  )?.[1]

  const curMonthName = monthLongName(+curMonthData)

  const chartData = (((data['mes'][curMonthData] - data['mes'][pastMonthData]) / data['mes'][pastMonthData]) * 100).toFixed(2)

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

export default EmpresasVariacaoInativasRecente;
