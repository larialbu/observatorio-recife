import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { processCargasMes } from "@/functions/process_data/observatorio/aeroporto/geral/cards/cargasMesRecente";

const CargasCardComparativo = ({
  data,
  title = `Cargas/Kg`,
  local,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {

  const chartData = processCargasMes(data, year, compare);

  const chartData2 = processCargasMes(data, year, toCompare);
  return (
    <ComparativeCard
      title={`${title}`}
      data={chartData.carga}
      year={year}
      color={color}
      data2={chartData2.carga}
      compare={[toCompare, compare]}
      comparative={comparative}
    />
  );
};

export default CargasCardComparativo;
