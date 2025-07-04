import Card from "@/components/@global/cards/Card";
import { monthLongName } from "@/utils/formatters/@global/monthLongName";

const EmpresasVariacaoAtivasRecente = ({
  data,
  date,
  title = `Variação Mês anterior de Empresas Ativas (mês)`,
  local = '',
  year,
  color,
}: any) => {
  const dataEmpresas = data['empresas']

  const monthsData = Object.keys(dataEmpresas['mes'])

  const curMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  ) ?.[0]
  
  const pastMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  )?.[1]

  const curMonthName = monthLongName(+curMonthData)

  const chartData = (((dataEmpresas['mes'][curMonthData] - dataEmpresas['mes'][pastMonthData]) / dataEmpresas['mes'][pastMonthData]) * 100).toFixed(2)

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

export default EmpresasVariacaoAtivasRecente;
