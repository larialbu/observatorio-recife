import Card from "@/components/@global/cards/Card";
import { processCargasTotalAena } from "@/functions/process_data/observatorio/aeroporto/aena/cards/cargasTotalAena";

const CargasTotalAena = ({
  data = [],
  title = `Cargas (TON)`,
  year,
  color,
}: any) => {
  // const chartData = processPassageirosMes(data, year, local.length > 0 ? undefined : 'Recife');
  const chartData = processCargasTotalAena(data, year);

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

export default CargasTotalAena;
