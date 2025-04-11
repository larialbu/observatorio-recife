import TableGeneric from "@/components/@global/tables/TableGeneric";
import { processCargasPorMes } from "@/functions/process_data/observatorio/porto/geral/tables/monthOperationPorto";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";

const PortoOperacoesTable = ({
  data = [],
  capital,
  year,
  color = "#000000",
  title = 'Acompanhamento Mensal (Ton)'
}: any) => {
  const dataMonths = data?.charts?.months || { current: [], past: [] }

  const yearCur = dataMonths.current[0]  
  const yearPast = dataMonths.past[0] || 'Dado não encontrado'
    
  const aggregatedData = processCargasPorMes(dataMonths.current[1], dataMonths.past[1]);

  const firstAggregated: any = aggregatedData[0];

    if (!firstAggregated) {
      return <div>Nenhum dado econtrado</div>;
    }

  const header = ["Mês", yearCur, yearPast, "Variação"];  

  const getRows = (values: any) => {
      const rows: string[][] = [];

      values.map((obj: any) => {
        rows.push([
          obj["mes"],
          `${obj["current"]}`,
          `${obj["past"]}`,
          `${percentFormatter(obj["variation"])}%`,
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

export default PortoOperacoesTable;
