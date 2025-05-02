import Card from "@/components/@global/cards/Card";

const EstoqueEmpregos = ({
  data,
  date,
  title = `Estoque Empregos`,
  local = '',
  year,
  color,
}: any) => {
 
  const recentMonth = data['municipios']?.reduce((acc: number, obj: any) => acc <= obj['Mês'] ? obj['Mês'] : acc , 0) || 1

  const chartData = data['municipios']?.filter((obj: any) => obj['Mês'] == recentMonth).reduce((acc: number, obj: any) => acc += obj['Estoque'] , 0) || 0

  return (
    <Card
      local={local}
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
    />
  );
};

export default EstoqueEmpregos;
