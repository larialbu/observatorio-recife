import { PortoOperacaoData } from "@/@types/observatorio/@data/portoData";
import { CardBuild } from "@/@types/observatorio/shared";
import Card from "@/components/@global/cards/Card";

const MovimentacaoCabotagem = ({
  data,
  title = `Cabotagem de cargas`,
  local = '',
  year,
  color,
}: CardBuild<PortoOperacaoData[]>) => {
  console.log(data)
  const chartData = data.find((data) => data.acao === 'Cabotagem')?.totalPeso || 0

  return (
    <Card
      local={local}
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
    />
  );
};

export default MovimentacaoCabotagem;
