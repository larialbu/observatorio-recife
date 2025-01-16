import Card from "@/components/@global/cards/Card";
import { processNegociado } from "@/functions/process_data/observatorio/balanca-comercial/comercial/cards/negociado";

const NegociadoCard = ({
  data,
  title = "Negociado (US$)",
  year,
  color,
}: any) => {
  const { totalNegociado } = processNegociado(data, year);

  return (
    <Card
      local=""
      title={title}
      data={totalNegociado}
      year={year}
      color={color}
    />
  );
};

export default NegociadoCard;
