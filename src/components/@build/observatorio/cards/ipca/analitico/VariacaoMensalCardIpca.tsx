import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";
import { CardBuild } from "@/@types/observatorio/shared";
import Card from "@/components/@global/cards/Card";
import { variacaoMensalAnualIpca } from "@/functions/process_data/observatorio/ipca/analitico/cards/variacaoMensalAnualIpca";

const VariacaoMensalCardIpca = ({
  data,
  title = `Variação Mensal`,
  year,
  color,
  capital,
}: CardBuild<IpcaGeralHeaders[]>) => {
  const chartData = variacaoMensalAnualIpca(data, capital ?? "Recife");

  return (
    <Card
      local={capital}
      title={`${title}`}
      data={chartData?.variaçãoMensal}
      year={year}
      color={color}
      percent={true}
    />
  );
};

export default VariacaoMensalCardIpca;
