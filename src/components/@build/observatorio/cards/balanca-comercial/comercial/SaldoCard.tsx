import Card from "@/components/@global/cards/Card";
import { processSaldo } from "@/functions/process_data/observatorio/balanca-comercial/comercial/cards/saldo";

const SaldoCard = ({
  data,
  title = "Saldo (US$)",
  year,
  color,
}: any) => {
  const { saldo } = processSaldo(data, year);

  return (
    <Card
      local=""
      title={title}
      data={saldo}
      year={year}
      color={color}
    />
  );
};

export default SaldoCard;
