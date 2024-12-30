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
  const chartData = processDecolagensMes(data, year, "Recife");

  return (
    <Card
      local={local}
      title={`${title}`}
      data={chartData.decolagens}
      year={year}
      color={color}
    />
  );
};

export default DecolagensMesRecente;
