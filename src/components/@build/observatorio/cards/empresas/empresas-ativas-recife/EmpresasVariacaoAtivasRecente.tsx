import Card from "@/components/@global/cards/Card";

const EmpresasVariacaoAtivasRecente = ({
  data,
  date,
  title = `Variação Mês anterior de Empresas Ativas (mês)`,
  local = '',
  year,
  color,
}: any) => {
  const dataEmpresas = data?.['empresas']

  const allMonthData = dataEmpresas.sort((a: any, b: any) => Number(b?.['mes']) - Number(a?.['mes']))
  
  const curMonthData = allMonthData?.[0]
  const pastMonthData = allMonthData?.[1]
  
  const curMonthName = curMonthData?.['Mês']

  const chartData = (((curMonthData?.['Empresas Ativas'] - pastMonthData?.['Empresas Ativas']) / pastMonthData?.['Empresas Ativas']) * 100).toFixed(2)

  return (
    <Card
      local={local}
      title={`${title.replace('mês', curMonthName)}`}
      data={chartData}
      year={year}
      color={color}
      percent
    />
  );
};

export default EmpresasVariacaoAtivasRecente;
