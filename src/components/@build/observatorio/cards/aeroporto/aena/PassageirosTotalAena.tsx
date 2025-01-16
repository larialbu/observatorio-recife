import Card from "@/components/@global/cards/Card";
import { processPassageirosTotalAena } from "@/functions/process_data/observatorio/aeroporto/aena/cards/passageirosTotalAena";

const PassageirosTotalAena = ({
  data,
  title = `Passageiros`,
  year,
  color,
}: any) => {
  // const chartData = processPassageirosMes(data, year, local.length > 0 ? undefined : 'Recife');
  const chartData = processPassageirosTotalAena(data, year);

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

export default PassageirosTotalAena;
