import { PortoOperacaoData } from "@/@types/observatorio/@data/portoData";
import { CardBuild } from "@/@types/observatorio/shared";
import Card from "@/components/@global/cards/Card";

const MovimentacaoOutros = ({
  data,
  title = `Outras movimentações de cargas`,
  local = '',
  year,
  color,
}: CardBuild<PortoOperacaoData[]>) => {
  const chartData = data.find((data) => data.acao === 'Outros')?.totalPeso || 0

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

export default MovimentacaoOutros;
