import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { processCargasMes } from "@/functions/process_data/observatorio/aeroporto/cards/cargasMesRecente";

const CargasCardComparativo = ({
  data,
  title = `Cargas/Kg`,
  local,
  toCompare,
  comparative = `${toCompare} x Recife`,
  year,
  color,
}: any) => {
  console.log('toCompare', toCompare)
  const chartData = processCargasMes(data, year, "RECIFE");

  const chartData2 = processCargasMes(data, year, toCompare);
  return (
    <ComparativeCard
      title={`${title}`}
      data={chartData.carga}
      year={year}
      color={color}
      data2={chartData2.carga}
      comparative={comparative}
    />
  );
};

export default CargasCardComparativo;
