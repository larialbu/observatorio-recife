import Card from "@/components/@global/cards/Card";
import { processPassageirosRankingAena } from "@/functions/process_data/observatorio/aeroporto/aena/cards/passageirosRankingAena";

const PassageirosRankingAena = ({
  data,
  title = `Passageiros Ranking`,
  year,
  color,
}: any) => {
  const nameAeroporto = data?.passageiros?.[0]?.Aeroporto || '';

  const chartData = processPassageirosRankingAena(data.rawData.passageiros || []).find(obj => obj.aeroporto === nameAeroporto)?.position;

  return (
    <Card
      local={''}
      title={`${title}`}
      data={chartData || 'N/A'}
      year={year}
      color={color}
      position
    />
  );
};

export default PassageirosRankingAena;
