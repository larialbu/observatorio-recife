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
  // const chartData = processCargasMes(data, year, local.length > 0 ? undefined : 'Recife');
  const chartData = processCargasMes(data, year);

  return (
    <Card
      // local={local.length > 0 ? '' : 'Recife'}
      local={''}
      title={`${title}`}
      data={chartData.carga}
      year={year}
      color={color}
    />
  );
};

export default CargasMesRecente;
