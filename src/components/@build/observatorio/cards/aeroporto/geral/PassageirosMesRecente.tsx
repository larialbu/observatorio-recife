import Card from "@/components/@global/cards/Card";
import { processPassageirosMes } from "@/functions/process_data/observatorio/aeroporto/cards/passageirosMesRecente";
import { dateArrFormatter } from "@/utils/formatters/@global/dateArrFormatter";

const PassageirosMesRecente = ({
  data,
  date,
  title = `Passageiros`,
  local,
  year,
  color,
}: any) => {
  const chartData = processPassageirosMes(data, year, "RECIFE", date);

  const formatDate = `(${dateArrFormatter(date)})`

  return (
    <Card
      local={local}
      title={`${title} ${formatDate}`}
      data={chartData.passageiros}
      year={year}
      color={color}
    />
  );
};

export default PassageirosMesRecente;