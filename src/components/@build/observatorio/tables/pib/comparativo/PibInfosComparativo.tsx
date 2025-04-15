import { ProcessedDataPib } from "@/@types/observatorio/@fetch/pib/ProcessedDataPib";
import TableGeneric from "@/components/@global/tables/TableGeneric";
import { processPIBvariacao } from "@/functions/process_data/observatorio/pib/geral/pibAnoVariacao";
import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";

const PibInfosComparativo = ({
  data = [],
  municipio,
  year,
  color = "#000000",
  title = 'PIB Acompanhamento Anual' + ` - ${municipio}`
}: any) => {

  const aggregatedData = processPIBvariacao(data.geral.filter((muni: ProcessedDataPib) => muni["Município - UF"] === municipio))

  const firstAggregated: any = aggregatedData[0];

    if (!firstAggregated) {
      return <div>Nenhum dado econtrado</div>;
    }

  const header = ["Ano", "Atual", "Passado", "Variação"];  

  const getRows = (values: any) => {
      const rows: string[][] = [];
    
      values.map((obj: any) => {
        rows.push([
          obj["ano"],
          `${tooltipFormatter(obj["atual"])}`,
          `${tooltipFormatter(obj["passado"])}`,
          `${tooltipFormatter(percentFormatter(obj["variacao"]))}%`,
        ]);
      });

      return rows;
    };

  return (
    <div className="relative w-full rounded-lg">
      <TableGeneric
        searchIndexes={[0]}
        enablePagination={false}
        withClick
        color={color}
        headers={header}
        title={title}
        rows={getRows(aggregatedData)}
      />
    </div>
  );
};

export default PibInfosComparativo;
