import Card from "@/components/@global/cards/Card";
import { prepareCargasPorAcaoData } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorAcao";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";

const MovimentacaoTotal = ({
  data,
  date,
  title = `Movimentacão de cargas`,
  local,
  year,
  color,
}: any) => {

    console.log('UNIQUE VALEUS ', getUniqueValues<any, "Tipo Operação da Carga">(
        data.carga,
        "Tipo Operação da Carga"
      ),)
   

  const chartData = prepareCargasPorAcaoData(data.atracacao, data.carga, true).find((data: any) => data.acao === 'Total')?.totalPeso || 0

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

export default MovimentacaoTotal;
