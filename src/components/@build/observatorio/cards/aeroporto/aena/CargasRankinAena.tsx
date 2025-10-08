import Card from "@/components/@global/cards/Card";
import { processCargasRankingAena } from "@/functions/process_data/observatorio/aeroporto/aena/cards/cargasRankingAena";

const CargasRankingAena = ({
  data = [],
  title = `Ranking Cargas (TON)`,
  year,
  color,
}: any) => {
  const nameAeroporto = data?.cargas?.[0]?.Aeroporto || '';

  const chartData = processCargasRankingAena(data.rawData.cargas || []).find(obj => obj.aeroporto === nameAeroporto)?.position;

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

export default CargasRankingAena;
