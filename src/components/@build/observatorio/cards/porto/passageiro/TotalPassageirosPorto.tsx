import { PortoPassageirosOutputData } from "@/@types/observatorio/@data/portoData";
import { CardBuild } from "@/@types/observatorio/shared";
import Card from "@/components/@global/cards/Card";

const TotalPassageirosPorto = ({
  data,
  title = `Total Passageiros`,
  year,
  color,
}: CardBuild<PortoPassageirosOutputData>) => {

  const chartData = data.current || 0

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

export default TotalPassageirosPorto;
