import Card from "@/components/@global/cards/Card";
import { processDecolagensMes } from "@/functions/process_data/observatorio/aeroporto/cards/decolagensMesRecente";
import { dateArrFormatter } from "@/utils/formatters/@global/dateArrFormatter";

const DecolagensMesRecente = ({
  data,
  date,
  local,
  title = `Decolagens`,
  year,
  color,
}: any
) => {
  const chartData = processDecolagensMes(data, year, "RECIFE", date);

  const formatDate = `(${dateArrFormatter(date)})`

  return (
    <Card
      local={local}
      title={`${title} ${formatDate}`}
      data={chartData.decolagens}
      year={year}
      color={color}
    />
  );
};

export default DecolagensMesRecente;
