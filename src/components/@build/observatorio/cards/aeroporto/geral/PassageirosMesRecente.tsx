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
  const chartData = processPassageirosMes(data, year, "Recife");

  return (
    <Card
      local={local}
      title={`${title}`}
      data={chartData.passageiros}
      year={year}
      color={color}
    />
  );
};

export default PassageirosMesRecente;
