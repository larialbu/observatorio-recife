import Card from "@/components/@global/cards/Card";
import { variacaoMensalAnualIpca } from "@/functions/process_data/observatorio/ipca/analitico/cards/variacaoMensalAnualIpca";

const VariacaoMensalCardIpca = ({
  data,
  title = `Variação Mensal`,
  year,
  color,
  capital,
}: any) => {
  const chartData = variacaoMensalAnualIpca(data, capital);

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
