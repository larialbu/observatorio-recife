import { useState } from "react";

import TableGeneric from "@/components/@global/tables/TableGeneric";
import { formatNormalnumber, formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { monthLongName } from "@/utils/formatters/@global/monthLongName";
import { processEmpresasMonthInfo } from "@/functions/process_data/observatorio/empresas/empresas-ativas-recife/empresasMonthInfo";

const EmpresasAtivasMes = ({
  data = [],
  color = "#000000",

}: any) => {
// -1, 0, 1
// asc, null, desc
// passar isso no componenten e o componente vai ficar alterando o objeto e quando mudar vai alterar aki tb
const [ordenation, setOrdenation] = useState([{ index: 0, name: 'mes', ordenation: 0 }, { index: 1, name: 'empresas', ordenation: 0 }, { index: 2, name: 'variacao', ordenation: 0 }]);

const order = ordenation.find((item) => item.ordenation != 0)

const chartData = processEmpresasMonthInfo(data)

const aggregatedData = chartData

const dataSorted = order ? aggregatedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : aggregatedData

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = ['Mês', 'Empresas Ativas', 'Variação']

  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        monthLongName(obj["mes"]),
        <div className="w-full flex justify-center">
          <div className="w-[150px]">
            {formatNormalnumber(obj["empresas"])}
          </div>
        </div>,
        <div className="w-full flex justify-center">
          <div className="w-[150px]">
            {obj["variacao"]}%
          </div>
        </div>,
      ] as string[]);
    });
    return rows;
  };

  return (
    <div className="w-full flex flex-col flex-1">
        <TableGeneric
          ordenations={ordenation}
          onOrdenationChange={setOrdenation}
          // enablePagination={false}
          withClick
          maxHeight={500} rowsPerPage={100} 
          color={'#ffffff'}
          // color={'#EC6625'}
          // clickedColor={'#EC6625'}
          clickedColor={color}
          headers={header}
          title={''}
          // maxHeight={800}
          rows={getRows(dataSorted)}
        />
    </div>
  );
};

export default EmpresasAtivasMes;


