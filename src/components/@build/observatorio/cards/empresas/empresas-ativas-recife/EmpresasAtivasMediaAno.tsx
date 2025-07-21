import Card from "@/components/@global/cards/Card";

const EmpresasAtivasMediaAno = ({
  data,
  date,
  title = `Média Empresas Abertas no Ano`,
  local = '',
  year,
  color,
}: any) => {
  const dataEmpresas = data['empresas']

  const chartData = (dataEmpresas.reduce((acc: number, data: any) => acc += data['Empresas Ativas'], 0) / dataEmpresas.length).toFixed(0) || 0

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
