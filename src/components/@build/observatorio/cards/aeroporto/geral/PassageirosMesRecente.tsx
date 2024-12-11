import Card from "@/components/@global/cards/Card";
import { processPassageirosMesRecente } from "@/functions/process_data/observatorio/aeroporto/cards/passageirosMesRecente";

const PassageirosMesRecente = ({
  data,
  title = "Passageiros (Último Mês)",
  local,
  year,
  color,
}: any) => {
  const chartData = processPassageirosMesRecente(data, year, "RECIFE");

  return (
    <Card
      title={title}
      data={chartData.passageiros}
      year={year}
      color={color}
    />
  );
};

export default PassageirosMesRecente;
