import { PortoPassageirosOutputData } from "@/@types/observatorio/@data/portoData";
import { CardBuild } from "@/@types/observatorio/shared";
import Card from "@/components/@global/cards/Card";

const VariacaoPassageirosPorto = ({
  data,
  title = `Acumulado no Ano`,
  year,
  color,
  capital,
}: CardBuild<PortoPassageirosOutputData>) => {
  const chartData = data.variant
  return (
    <Card
      local={capital}
      title={`${title}`}
      data={chartData ?? ""}
      year={year}
      color={color}
      percent={true}
    />
  );
};

export default VariacaoPassageirosPorto;
