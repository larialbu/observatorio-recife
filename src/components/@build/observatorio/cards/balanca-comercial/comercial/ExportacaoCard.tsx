import Card from "@/components/@global/cards/Card";
import { processExportacao } from "@/functions/process_data/observatorio/balanca-comercial/comercial/cards/exportacao";

const ExportacaoCard = ({
  data,
  title = "Exportação (US$)",
  year,
  color,
}: any) => {
  const { exportacao } = processExportacao(data, year);

  return (
    <Card
      local=""
      title={title}
      data={exportacao}
      year={year}
      color={color}
    />
  );
};

export default ExportacaoCard;
