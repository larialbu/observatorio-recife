import TableGeneric from "@/components/@global/tables/TableGeneric";
import { processPIBvariacao } from "@/functions/process_data/observatorio/pib/geral/pibAnoVariacao";
import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";

const PibInfosCapita = ({
  data = [],
  capital,
  year,
  color = "#000000",
  title = 'PIB Acompanhamento Anual'
}: any) => {

  const aggregatedData = processPIBvariacao(data.geral.flat(), true)

  const firstAggregated: any = aggregatedData[0];

    if (!firstAggregated) {
      return <div>Nenhum dado econtrado</div>;
    }

  const header = Object.keys(firstAggregated);

  const getRows = (values: any) => {
      const rows: string[][] = [];
    
      values.map((obj: any) => {
        const formatPercent = (val: number) => {
          let percent;

          if (Math.round(val * 100) / 100 != 0) {
            percent = Math.round(val * 100) / 100;
          } else if (
            Math.round(val * 100) / 100 == 0 &&
            Math.round(val * 1000) / 1000 != 0
          ) {
            percent = Math.round(val * 1000) / 1000;
          } else if (
            Math.round(val * 1000) / 1000 == 0 &&
            Math.round(val * 10000) / 10000 != 0
          ) {
            percent = Math.round(val * 10000) / 10000;
          } else if (val === 0) {
            percent = 0;
          }

          return percent;
        };

        rows.push([
          obj["ano"],
          `${tooltipFormatter(obj["atual"])}`,
          `${tooltipFormatter(obj["passado"])}`,
          `${tooltipFormatter(formatPercent(obj["variacao"]))}%`,
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

export default PibInfosCapita;
