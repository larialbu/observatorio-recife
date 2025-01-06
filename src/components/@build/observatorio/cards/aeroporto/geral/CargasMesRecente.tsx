import Card from "@/components/@global/cards/Card";
import { processCargasMes } from "@/functions/process_data/observatorio/aeroporto/geral/cards/cargasMesRecente";

const CargasMesRecente = ({
  data,
  title = `Cargas/Kg`,
  year,
  color,
}: any) => {
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
