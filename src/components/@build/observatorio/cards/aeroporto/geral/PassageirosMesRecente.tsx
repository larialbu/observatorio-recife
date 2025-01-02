import Card from "@/components/@global/cards/Card";
import { processPassageirosMes } from "@/functions/process_data/observatorio/aeroporto/cards/passageirosMesRecente";

const PassageirosMesRecente = ({
  data,
  date,
  title = `Passageiros`,
  local,
  year,
  color,
}: any) => {
  // const chartData = processPassageirosMes(data, year, local.length > 0 ? undefined : 'Recife');
  const chartData = processPassageirosMes(data, year);

  return (
    <Card
      // local={local.length > 0 ? '' : 'Recife'}
      local={''}
      title={`${title}`}
      data={chartData.passageiros}
      year={year}
      color={color}
    />
  );
};

export default PassageirosMesRecente;
