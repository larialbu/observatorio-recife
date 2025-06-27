import Card from "@/components/@global/cards/Card";

const EmpresasAtivasMesRecente = ({
  data,
  date,
  title = `Empresas Ativas (mês)`,
  local = '',
  year,
  color,
}: any) => {

  const curMonthData = data.sort((a: any, b: any) => b['mes'] - a['mes'])?.[0] 
  
  const curMonthName = curMonthData?.['Mês']

  const chartData = curMonthData?.['Empresas Ativas'] || 0

  return (
    <Card
      local={local}
      title={`${title.replace('mês', curMonthName)}`}
      data={chartData}
      year={year}
      color={color}
    />
  );
};

export default EmpresasAtivasMesRecente;
