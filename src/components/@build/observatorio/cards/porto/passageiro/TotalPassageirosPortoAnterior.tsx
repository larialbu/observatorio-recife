import { CardBuild } from "@/@types/observatorio/shared";
import Card from "@/components/@global/cards/Card";
import { PortoPassageirosOutputData } from "@/@types/observatorio/@data/portoData";

const TotalPassageirosPortoAnterior = ({
  data,
  title = `Total Passageiros (ano anterior)`,
  year,
  color,
}: CardBuild<PortoPassageirosOutputData>) => {
  const chartData = data.past || 0

  return (
    <Card
      local={''}
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
    />
  );
};

export default TotalPassageirosPortoAnterior;
