import Card from "@/components/@global/cards/Card";
import { prepareCargasPorAcaoData } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorAcao";

const MovimentacaoOutros = ({
  data,
  date,
  title = `Outras movimentações de cargas`,
  local,
  year,
  color,
}: any) => {
  const chartData = prepareCargasPorAcaoData(data.atracacao, data.carga, true).find((data: any) => data.acao === 'Outros')?.totalPeso || 0

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

export default MovimentacaoOutros;
