import Card from "@/components/@global/cards/Card";


const totalAcc = (data: any) => {
  let quantityTotal = 0

  for (const key in data) {
    quantityTotal += data[key]
  }

  return quantityTotal
}

const SalarioMedio = ({
  data,
  date,
  title = `Salário Médio`,
  local = '',
  year,
  color,
}: any) => {
  const quantity = data?.['quantity'] || {}
  const values = data?.['values'] || {}

  const quantityTotal = totalAcc(quantity['seção'])
  const valuesTotal = totalAcc(values['seção'])

  const chartData = (valuesTotal / quantityTotal) || 0

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

export default SalarioMedio;
