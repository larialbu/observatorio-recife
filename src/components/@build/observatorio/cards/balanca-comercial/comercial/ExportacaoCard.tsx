import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";
import { CardBuild } from "@/@types/observatorio/shared";
import Card from "@/components/@global/cards/Card";
import { processExportacao } from "@/functions/process_data/observatorio/balanca-comercial/comercial/cards/exportacao";

const ExportacaoCard = ({
  data,
  title = "Exportação (US$)",
  year,
  color,
}: CardBuild<BalancaHeaders[]>) => {
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
