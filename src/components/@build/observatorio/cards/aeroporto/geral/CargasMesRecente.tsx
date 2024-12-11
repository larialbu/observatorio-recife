import Card from "@/components/@global/cards/Card";
import { processCargasMesRecente } from "@/functions/process_data/observatorio/aeroporto/cards/cargasMesRecente";

const CargasMesRecente = ({
  data,
  local,
  title = "Cargas/Kg (Último Mês)",
  year,
  color,
}: any) => {
  const chartData = processCargasMesRecente(data, year, "RECIFE");

  return (
    <Card
      local={local}
      title={title}
      data={chartData.carga}
      year={year}
      color={color}
    />
  );
};

export default CargasMesRecente;
