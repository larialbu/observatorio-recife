import TableGeneric from "@/components/@global/tables/TableGeneric";
import { processPIBvariacao } from "@/functions/process_data/observatorio/pib/geral/pibAnoVariacao";
import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";
import { useState } from "react";

const PibInfosCapita = ({
  data = [],
  capital,
  year,
  color = "#000000",
  title = 'PIB Acompanhamento Anual'
}: any) => {

  const [ordenation, setOrdenation] = useState([{ index: 0, name: 'ano', ordenation: 0 }, { index: 1, name: 'atual', ordenation: 0 }, { index: 2, name: 'passado', ordenation: 0 }, { index: 3, name: 'variacao', ordenation: 0 }]);

  const order = ordenation.find((item) => item.ordenation != 0)

  const aggregatedData = processPIBvariacao(data.geral.flat(), true)

  const dataSorted = order ? aggregatedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : aggregatedData

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
        ordenations={ordenation}
        onOrdenationChange={setOrdenation}
        searchIndexes={[0]}
        enablePagination={false}
        withClick
        color={color}
        headers={header}
        title={title}
        rows={getRows(dataSorted)}
      />
    </div>
  );
};

export default PibInfosCapita;
