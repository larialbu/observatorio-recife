import { useState } from "react";

import TableGeneric from "@/components/@global/tables/TableGeneric";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { monthLongName } from "@/utils/formatters/@global/monthLongName";
import { processItbiAvaliacoesTable } from "@/functions/process_data/observatorio/tributos/itbi-avaliacoes/itbiAvaliacoesTable";

const ItbiAvaliacoes = ({
  data = [],
  color = "#000000",

}: any) => {
// -1, 0, 1
// asc, null, desc
// passar isso no componenten e o componente vai ficar alterando o objeto e quando mudar vai alterar aki tb
const [ordenation, setOrdenation] = useState([{ index: 0, name: 'mes', ordenation: 0 }, { index: 4, name: 'avaliacao', ordenation: 0 }]);

const dataRawData = data?.['tributos'] || [];

const order = ordenation.find((item) => item.ordenation != 0)

const chartData = processItbiAvaliacoesTable(dataRawData)

const aggregatedData = chartData

const dataSorted = order ? aggregatedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : aggregatedData

  const firstAggregated: any = aggregatedData?.[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = ['Mês', 'Logradouro', 'Bairro', 'Imóvel', 'Variação']

  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        monthLongName(obj["mes"]),
        <div className="w-full flex justify-start">
          <div className="w-full text-start">
            {obj["logradouro"]}
          </div>
        </div>,
        <div className="w-full flex justify-start">
          <div className="w-full text-start">
            {obj["bairro"]}
          </div>
        </div>,
        <div className="w-full flex justify-start">
          <div className="w-full text-start">
            {obj["imovel"]}
          </div>
        </div>,
        <div className="w-full flex justify-center">
          <div className="w-[150px]">
            <span>R$</span> {formatNumber(obj["avaliacao"])}
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
          enablePagination={false}
          withClick
          color={'#ffffff'}
          clickedColor={color}
          headers={header}
          title={''}
          maxHeight={800}
          rows={getRows(dataSorted)}
        />
    </div>
  );
};

export default ItbiAvaliacoes;


