import Card from "@/components/@global/cards/Card";
import { processDecolagensMes } from "@/functions/process_data/observatorio/aeroporto/cards/decolagensMesRecente";

const DecolagensMesRecente = ({
  data,
  date,
  local,
  title = `Decolagens`,
  year,
  color,
}: any) => {
  // const chartData = processDecolagensMes(data, year, local.length > 0 ? undefined : 'Recife');
  const chartData = processDecolagensMes(data, year);

  return (
    <Card
      // local={local.length > 0 ? '' : 'Recife'}
      local={''}
      title={`${title}`}
      data={chartData.decolagens}
      year={year}
      color={color}
    />
  );
};

export default DecolagensMesRecente;
