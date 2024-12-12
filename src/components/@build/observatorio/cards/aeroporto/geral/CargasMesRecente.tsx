import Card from "@/components/@global/cards/Card";
import { processCargasMes } from "@/functions/process_data/observatorio/aeroporto/cards/cargasMesRecente";
import { dateArrFormatter } from "@/utils/formatters/@global/dateArrFormatter";

const CargasMesRecente = ({
  data,
  local,
  date,
  title = `Cargas/Kg`,
  year,
  color,

}: any) => {
  const chartData = processCargasMes(data, year, "RECIFE", date);

  const formatDate = `(${dateArrFormatter(date)})`

  return (
    <Card
      local={local}
      title={`${title} ${formatDate}`}
      data={chartData.carga}
      year={year}
      color={color}
    />
  );
};

export default CargasMesRecente;
