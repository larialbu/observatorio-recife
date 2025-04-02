import Card from "@/components/@global/cards/Card";
import { prepareCargasPorAcaoData } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorAcao";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";

const RemuneracaoMedia = ({
  data,
  date,
  title = `Movimentacão de cargas`,
  local = '',
  year,
  color,
}: any) => {

//   const chartData = data.find((data: any) => data.acao === 'Total')?.totalPeso || 0

  return (
    <Card
      local={local}
      title={`${title}`}
      data={0}
      year={year}
      color={color}
    />
  );
};

export default RemuneracaoMedia;
