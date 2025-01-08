import ComparativeCard from "@/components/@global/cards/ComparativeCard";
import { processCargasMes } from "@/functions/process_data/observatorio/aeroporto/geral/cards/cargasMesRecente";

const CargasCardComparativo = ({
  data,
  title = `Cargas/Kg`,
  local,
  toCompare,
  comparative = `${toCompare} x Recife`,
  year,
  color,
}: any) => {

  const chartData = processCargasMes(data, year, "Recife");

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
