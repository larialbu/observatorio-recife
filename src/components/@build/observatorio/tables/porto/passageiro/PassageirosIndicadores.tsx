import TableGeneric from "@/components/@global/tables/TableGeneric";
import { processPassageirosAnoPorto } from "@/functions/process_data/observatorio/porto/passageiro/charts/passageirosAnoPorto";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";

const PassageirosIndicadores = ({
  data = [],
  capital,
  year,
  color = "#000000",
  title = 'Indicadores de Passageiros'
}: any) => {
 const yearCur = data.passageiros?.current[0]?.['Data'].split('-')[0]
 const yearPast = data.passageiros?.past[0]?.['Data'].split('-')[0] || 'Dado não encontrado'
  
 const aggregatedData = processPassageirosAnoPorto(data.passageiros.current || [], data.passageiros.past || []);

  const sortedData = Object.values(aggregatedData).sort(
    (a: any, b: any) => parseInt(a.MÊS, 10) - parseInt(b.MÊS, 10)
  );

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

//   const header = Object.keys(firstAggregated);
const header = ["Mês", yearCur, yearPast, "Variação"];  
console.log('HEEADER', header)


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

  getRows(aggregatedData)

  return (
    <div className="relative w-full">
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

export default PassageirosIndicadores;
