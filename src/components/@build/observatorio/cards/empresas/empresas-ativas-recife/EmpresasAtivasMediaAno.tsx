import Card from "@/components/@global/cards/Card";

const EmpresasAtivasMediaAno = ({
  data,
  date,
  title = `Média de Empresas Ativas no Ano`,
  local = '',
  year,
  color,
}: any) => {

  const chartData = (data.reduce((acc: number, data: any) => acc += data['Empresas Ativas'], 0) / data.length).toFixed(0) || 0

  return (
    <Card
      local={local}
      title={title}
      data={chartData}
      year={year}
      color={color}
    />
  );
};

export default EmpresasAtivasMediaAno;
