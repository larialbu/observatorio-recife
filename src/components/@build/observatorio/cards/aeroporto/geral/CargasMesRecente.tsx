import Card from "@/components/@global/cards/Card";
import { processCargasMes } from "@/functions/process_data/observatorio/aeroporto/cards/cargasMesRecente";

const CargasMesRecente = ({
  data,
  local,
  date,
  title = `Cargas/Kg`,
  year,
  color,
}: any) => {
  const chartData = processCargasMes(data, year, "Recife");

  return (
    <Card
      local={local}
      title={`${title}`}
      data={chartData.carga}
      year={year}
      color={color}
    />
  );
};

export default CargasMesRecente;
