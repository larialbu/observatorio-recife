import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";
import { CardBuild } from "@/@types/observatorio/shared";
import Card from "@/components/@global/cards/Card";
import { processImportacao } from "@/functions/process_data/observatorio/balanca-comercial/comercial/cards/importacao";

const ImportacaoCard = ({
  data,
  title = "Importação (US$)",
  year,
  color,
}: CardBuild<BalancaHeaders[]>) => {
  const { importacao } = processImportacao(data, year);

  return (
    <Card
      local=""
      title={title}
      data={importacao}
      year={year}
      color={color}
    />
  );
};

export default ImportacaoCard;
